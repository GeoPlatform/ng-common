(function(angular) {
    
    'use strict';


    /* *********************************************
     * Requires socket.io be in the global namespace
     * tested with version 2.x
     * ********************************************* */



     /*
        Usage:

        let service = ...

        let svcId = service.getId();

        //listen to events from the server
        service.on('testing', (event) => { 
            if(event.clientId === svcId) return; //ignore our own events
            ... do something ...
        });
        
        //sends out a message to others
        service.emit( service.events.CREATED, 'test');

        //sends out a message to others
        service.begin(service.events.EDITING, 'test');

        //sends out a message to others
        service.end(service.events.EDITING, 'test');

        //stop listening and close the socket
        service.close();

      */




    /**
     *
     */
    class SocketService {

        constructor (url, options) {
            'ngInject';

            angular.copy(options||{}, this);

            this.socket = null;

            //list of ids of things being tracked, such as 
            // items edited, in order to send messages
            // about the things lifecycle
            this.tracking = {};

            //events supported.
            // Note that lifecycles can be added by using the 
            // begin() and end() methods on the service,
            // which appends '_start' and '_end' respectively
            this.events = {
                CREATED: 'created',
                UPDATED: 'updated',
                DELETED: 'deleted',
                EDITING: 'editing',
                STATUS: 'status'
            };

            if(typeof(io) === 'undefined') {
                console.log("Socket.IO not found in global namespace");
                return;
            }

            if(!url) {   //TODO validate URL with regex?
                console.log("No web socket URL configured for this app to communicate with");
                return;
            }

            //make connection
            this.socket = io.connect(url);

            //listen for the init event indicating connection has been made
            // and to get the socket's id from the server
            this.socket.on("init", (evt) => { 
                console.log("Socket has id " + evt.id);
                this.socketId = evt.id; 
            });

            //if unable to connect
            this.socket.on('error', () => {
                console.log("Unable to connect to " + url + " with websockets");
            });

        }

        /**
         *
         */
        getId () { return this.socketId; }
            
        /**
         * @param {string} eventName
         * @param {Function} callback
         * @return {Function} to remove the listener
         */
        on (eventName, callback) {
            if(!this.socket) return function() { };
            //add the listener to the socket
            this.socket.on(eventName, callback);
            //return an 'off' function to remove the listener
            return () => { this.socket.off(eventName, callback); };
        }

        /**
         *
         */
        emit ( eventName, data, callback ) {
            if(!this.socket) return;
            this.socket.emit(eventName, data, callback);
        }

        /**
         * Closes this service's socket
         */
        close () { 

            //if this app was tracking an obj, 
            // notify listeners that it is no longer
            for(var event in this.tracking) {
                if(this.tracking.hasOwnProperty(event)) {
                    let tracks = this.tracking[event];
                    if(tracks && tracks.length) {
                        /* jshint ignore:start */
                        angular.forEach(tracks, (id) => { 
                            this.end(event, id); 
                        });
                        /* jshint ignore:end */
                    }        
                }
            }

            if(this.socket) {
                this.socket.close(); 
                this.socket = null;
            }

            return null;
        }

        /**
         * @param {string} event - name of the event being started
         * @param {string} objId - identifier of the item being tracked
         */
        begin (event, objId) {

            this.tracking[event] = this.tracking[event] || [];
            this.tracking[event].push(objId);

            let room = objId + "_" + event.toLowerCase();

            this.join(room, () => {
                this.socket.emit(event, room, this.socketId, true);
            });

        }

        /**
         * @param {string} event - name of the event being ended
         * @param {string} objId - identifier of the item being tracked
         */
        end (event, objId) {

            this.tracking[event] = this.tracking[event] || [];
            if(!this.tracking[event].length) return;    //empty, ignore request

            let idx = this.tracking[event].indexOf(objId);
            if(idx < 0) //not found, ignore request
                
            //remove tracker
            this.tracking[event].splice(idx, 1);

            //send event to server about client stopping it's tracking
            let room = objId + "_" + event.toLowerCase();
            this.socket.emit(event, room, this.socketId, false, () => {
                this.leave(room);
            });

        }

        /**
         *
         */
        join (objId, callback) {
            console.log("Joining " + objId);
            this.emit('join', objId, callback);
        }

        /**
         *
         */
        leave (objId, callback) {
            console.log("Leaving " + objId);
            this.emit('leave', objId, callback);
        }

    }




    /** 
     * Factory to get a Service used to listen for WebSocket messages from a server
     *
     * Usage: 
     *
     * let wsUrl = ...
     * let service = SocketServiceFactory(wsUrl);
     *
     */
     angular.module('gp-common').factory('SocketServiceFactory', function ($rootScope, $window, UUID) {

        var cache = {};

        //disconnect whenever the app is closed
        var onClose = (e) => { 
            for(var key in cache) {
                if(cache.hasOwnProperty(key)) {
                    cache[key].close();
                    cache[key] = null;
                }
            }
            cache = null;
            return null;
        };
        
        //needed for reload/backbtn
        if($window.onbeforeunload === 'function') {
            let existing = $window.onbeforeunload;
            $window.onbeforeunload = function(e) {
                onClose(e);
                return existing(e);
            };
        } else {
            $window.onbeforeunload = onClose;      
        }

        $rootScope.$on('$destroy', onClose);
        //-------------------


        return function(url) {

            // if(!url) return null;
            // if(cache[url]) return cache[url];

            let cacheRef = UUID();
            let service = new SocketService(url, $rootScope, {cacheRef: cacheRef});
            let closeDelegate = service.close;
            service.close = function() {
                let id = service.cacheRef;
                closeDelegate.call(service); //have service disconnect and clean up itself
                //then clean up cache reference
                delete cache[id];
            };

            let onDelegate = service.on;
            service.on = function(event, callback) {

                if(typeof(callback) === 'function') {
                    //have to use old-school refs instead of arrow functions
                    // or else the arguments get scrambled
                    let handle = function() {
                        var args = arguments;
                        $rootScope.$apply(function() { 
                            callback.apply(service.socket, args); 
                        });
                    };
                    return onDelegate.call(service, event, handle);

                } else {
                    return onDelegate.call(service, event);
                }
            };

            let emitDelegate = service.emit;
            service.emit = function(event, data, callback) {
                
                if(typeof(callback) === 'function') {
                    //have to use old-school refs instead of arrow functions
                    // or else the arguments get scrambled
                    let handle = function() {
                        var args = arguments;
                        $rootScope.$apply(function() { 
                            callback.apply(service.socket, args); 
                        });
                    };
                    emitDelegate.call(service, event, data, handle);

                } else {
                    emitDelegate.call(service, event, data);
                }
            };

            // cache[url] = service;
            cache[cacheRef] = service;
            return service;

        };

    });

}) (angular);