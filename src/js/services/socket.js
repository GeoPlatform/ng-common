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




    class SocketService {

        constructor (id, url) {

            this.socket = null;
            this.socketId = id;

            //list of ids of things being tracked, such as 
            // items edited, in order to send messages
            // about the things lifecycle
            this.tracking = [];

            //events supported.
            // Note that lifecycles can be added by using the 
            // begin() and end() methods on the service,
            // which appends '_start' and '_end' respectively
            this.events = {
                CREATED: 'created',
                UPDATED: 'updated',
                DELETED: 'deleted',
                EDITING: 'editing'
            };

            if(typeof(io) === 'undefined') {
                console.log("Socket.IO not found in global namespace");
                return;
            }

            if(!url) {   //TODO validate URL with regex?
                console.log("No web socket URL configured for this app to communicate with");
                return;
            }

            this.socket = io.connect(url);

        }

        getId () { return this.socketId; }
            
        /**
         * @param {string} eventName
         * @param {Function} callback
         * @return {Function} to remove the listener
         */
        on (eventName, callback) {
            if(!this.socket) return;
            
            // let handle =  () => {  
            //     var args = arguments;
            //     $rootScope.$apply( () => {
            //         callback.apply(this.socket, args);
            //     });
            // };

            this.socket.on(eventName, callback);

            return () => { this.socket.off(eventName, callback); };
        }

        /**
         *
         */
        emit (eventName, data /*, callback*/) {
            if(!this.socket) return;

            this.socket.emit(eventName, data, () => {
                /*
                var args = arguments;
                $rootScope.$apply(() => {
                    if (callback) {
                        callback.apply(this.socket, args);
                    }
                });
                */
            });  
        }

        /**
         * Closes this service's socket
         */
        close () { 

            //if this app was editing an obj, notify listeners that it is no longer
            if(this.tracking && this.tracking.length) {
                angular.forEach(this.tracking, (id) => { this.end(id); });
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
            this.tracking.push(objId);
            this.emit('client', {
                event: event + '_start',
                clientId: this.socketId,
                data: { id: objId }
            });
        }

        /**
         * @param {string} event - name of the event being ended
         * @param {string} objId - identifier of the item being tracked
         */
        end (event, objId) {
            let idx = this.tracking.indexOf(objId);
            if(idx >= 0) {
                this.tracking.splice(idx, 1);

                this.emit('client', {
                    event: event + '_end',
                    clientId: this.socketId,
                    data: { id: objId }
                });
            }
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
            for(var url in cache) {
                if(cache.hasOwnProperty(url)) {
                    cache[url].close();
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

            if(!url) return null;
            if(cache[url]) return cache[url];

            let service = new SocketService(UUID(), url);
            cache[url] = service;
            return service;

        };

    });

}) (angular);