
(function(angular, Constants) {

    "use strict";


    //fields list sent to MDR in order to have these properties for display in search results
    const FIELDS = [ 'created','modified','publishers','themes','description','extent' ];

    //facets list sent to MDR in order to get aggregation numbers
    const FACETS = [ 'types','themes','publishers', 'serviceTypes', 'schemes', 'visibility', 'createdBy' ];

    const SORT_OPTIONS = [
        { value:"label,asc",       label: "Name (A-Z)"              },
        { value:"label,desc",      label: "Name (Z-A)"              },
        { value:"type,asc",        label: "Type (A-Z)"              },
        { value:"type,desc",       label: "Type (Z-A)"              },
        { value:"modified,desc",   label: "Most recently modified"  },
        { value:"modified,asc",    label: "Least recently modified" },
        { value:"_score,desc",     label: "Relevance"               },
    ];

    //list of _options variables for mapping to parameters
    const VAR_TYPES                 = 'types';
    const VAR_THEMES                = 'themes';
    const VAR_PUBLISHERS            = 'publishers';
    const VAR_USED_BY               = 'usedBy';
    const VAR_USER                  = 'user';
    const VAR_CREATED_BY            = 'createdBy';
    const VAR_SERVICE_TYPES         = 'serviceTypes';
    const VAR_SCHEMES               = 'schemes';
    const VAR_VISIBILITY            = "visibility";
    const VAR_QUERY                 = 'query';
    const VAR_EXTENT                = 'bbox';
    const VAR_MODIFIED_BEFORE       = 'modified.max';
    const VAR_MODIFIED_AFTER        = 'modified.min';
    const VAR_RESOURCE_TYPES        = 'resourceTypes';

    //parameter names for various query constraints used in requests to MDR for results
    const PARAMETER_TYPE            = 'type';
    const PARAMETER_THEME           = 'theme.id';
    const PARAMETER_PUBLISHER       = 'publisher.id';
    const PARAMETER_USED_BY         = 'usedBy.id';
    const PARAMETER_CREATED_BY      = 'createdBy';
    const PARAMETER_CONTRIBUTED_BY  = 'contributedBy';
    const PARAMETER_CREATOR         = 'creator.id';
    const PARAMETER_SVC_TYPE        = 'serviceType.id';
    const PARAMETER_IN_SCHEME       = 'scheme.id';
    const PARAMETER_VISIBILITY      = 'visibility';
    const PARAMETER_QUERY           = 'q';
    const PARAMETER_EXTENT          = 'extent';
    const PARAMETER_MODIFIED_BEFORE = 'modified.max';
    const PARAMETER_MODIFIED_AFTER  = 'modified.min';
    const PARAMETER_RESOURCE_TYPES  = 'resourceType';
    // const PARAMETER_CONTRIBUTOR     = 'contributor.id';


    const PARAM_OPTIONS = [
        { option: VAR_TYPES,            parameter: PARAMETER_TYPE            },
        { option: VAR_THEMES,           parameter: PARAMETER_THEME           },
        { option: VAR_PUBLISHERS,       parameter: PARAMETER_PUBLISHER       },
        { option: VAR_USED_BY,          parameter: PARAMETER_USED_BY         },
        { option: VAR_USER,             parameter: PARAMETER_CREATOR         },
        { option: VAR_CREATED_BY,       parameter: PARAMETER_CREATED_BY      },
        { option: VAR_SERVICE_TYPES,    parameter: PARAMETER_SVC_TYPE        },
        { option: VAR_SCHEMES,          parameter: PARAMETER_IN_SCHEME       },
        { option: VAR_VISIBILITY,       parameter: PARAMETER_VISIBILITY      },
        { option: VAR_QUERY,            parameter: PARAMETER_QUERY           },
        { option: VAR_EXTENT,           parameter: PARAMETER_EXTENT          },
        { option: VAR_MODIFIED_BEFORE,  parameter: PARAMETER_MODIFIED_BEFORE },
        { option: VAR_MODIFIED_AFTER,   parameter: PARAMETER_MODIFIED_AFTER  },
        { option: VAR_RESOURCE_TYPES,   parameter: PARAMETER_RESOURCE_TYPES  }
    ];


    const PAGE_SIZE_BASE_10 = [ 10, 20, 50, 100 ];
    const PAGE_SIZE_BASE_12 = [ 12, 24, 48, 96 ];


    /**
     *
     *
     */
    function BrowseObjectsService($rootScope, $timeout, $resource, options) {


        /* -------- private data ----------- */

        let url = options && options.url ? options.url + "/:id" : Constants.ualUrl + '/api/items/:id';

        let eventKey = 'gp:browse:' + (options && options.key ? options.key : 'objects') + ":";

        var svc = $resource(url, {id: '@id'}, {
            query: {
                isArray: false
            }
        });

        var _pageSizeBase = PAGE_SIZE_BASE_10.slice(0);
        if(options && options.pageSizeBase && options.pageSizeBase === 12)
            _pageSizeBase = PAGE_SIZE_BASE_12.slice(0);

        var _options = {
            start: 0,
            size: _pageSizeBase[0],
            total: 0,
            sort: (options && options.sort) ? options.sort : "modified,desc",
            facets: {}
        };

        //list of field names to request in response
        var _fields = options && options.fields ? options.fields : FIELDS.slice(0);

        //list of facet names to request
        var _requestFacets = options && options.facets ? options.facets : FACETS.slice(0);


        var _facets = [];
        var _selectedFacets = [];

        var _results = [];

        var _dirtyPromise = null;

        var _isLoading = false;

        var _selected = [];

        var _onSelectFn = options && options.onSelect ? options.onSelect : null;


        /**
         *
         */
        function notify(eventName, arg) {
            // console.log("Notifying of " + eventName + " with " + arg);
            $rootScope.$broadcast(eventName, arg);
        }

        /**
         * when marked as dirty, debounce for rapid fire events like onKeyUp
         */
        function dirty(delay, resetStart) {

            var doReset = typeof(resetStart) === 'undefined' || resetStart === true;

            if(_dirtyPromise)
                $timeout.cancel(_dirtyPromise);
            _dirtyPromise = $timeout(function() {
                _dirtyPromise = null;
                _doUpdate(doReset);
            }, delay || 100);

        }

        /**
         *
         */
        function _doUpdate(resetStart) {

            if(resetStart)
                _options.start = 0;

            _isLoading = true;
            notify(eventKey + 'querying');

            let params = {};


            // -------- QUERY FILTERS --------

            //create a temporary options object
            let opts = angular.copy(_options);

            //apply options as parameters
            angular.forEach(PARAM_OPTIONS, po => {
                let name = po.parameter;
                let value = opts[po.option];

                let isSet = value !== null && typeof(value) !== 'undefined';
                let isArr = isSet && typeof(value.push) !== 'undefined';

                if(isSet && (!isArr||value.length)) {
                    params[name] = isArr ? value.join(',') : value;
                } else {
                    delete params[name];
                }
                delete opts[po.option]; //remove from temp opts
            });

            //apply remaining options to query
            // these are not keyed with specific parameters (ie, custom params)
            angular.forEach(opts, (value, name) => {
                if(value !== null && typeof(value) !== 'undefined') {
                    let isArr = typeof(value.push) !== 'undefined';
                    params[name] = isArr ? value.join(',') : value;
                } else {
                    //make sure it doesn't get sent if no value provided
                    delete params[name];
                }
            });

            // -------- QUERY FILTERS --------




            let arr = [];
            for(let k in _options.facets) {
                if(_options.facets.hasOwnProperty(k)) {
                    //encode commas in facet name since it's used to separate multiple
                    // facet values
                    arr.push(k+":"+_options.facets[k].replace(/,/g, '%2C'));
                }
            }
            _selectedFacets = arr;


            let start = _options.start;
            if(isNaN(start)) start = 0;
            else start = start*1;

            params.page = Math.floor(start/_options.size);
            params.size = _options.size;
            params.sort = _options.sort;

            if(arr.length)
                params.facets = arr.join(',');



            //prevent CORS cache bug in Chrome
            params.bust = new Date().getTime();


            //request facets
            params.includeFacet=_requestFacets.join(',');

            //request fields
            params.fields=_fields.join(',');

            svc.query(params).$promise.
            then( function(response) {

                _results = response.results;
                _facets = response.facets || [];

                //auto select objects if user has marked it as selected previously
                // this is needed to maintain selections across pagination pages
                _selected.each(function(id) {
                    var map = _results.find(function(map) {return map._id === id;});
                    if(map) map.selected = true;
                });

                //will trigger update on pagination directive
                _options.total = response.totalResults;

                _isLoading = false;
                notify(eventKey + 'results');
                notify(eventKey + 'pagination');

                if(options.trackingService) {
                    //If an instanceof APIClient.TrackingService has been provided
                    // using the constructor options, report the event of this search
                    // using the TrackingService API
                    setTimeout( //call using timeout to avoid any errors breaking search
                        (trSvc, qp, total) => { trSvc.logSearch(qp, total); },
                        50,
                        options.trackingService,
                        params,
                        response.totalResults
                    );
                }

            })
            .catch( function(response) {
                _isLoading = false;

                //fallback
                let obj = { error: "An Error Occurred", message: "No details provided" };

                //http response error
                if(response && response.data) obj = response.data;
                //normal error
                else if(response && response.message) obj = response;

                //serialized json
                if(typeof(obj) === 'string') {
                    try      { obj = JSON.parse(obj);  }
                    catch(e) { obj.message = "Bad response from server"; }
                }

                var error = {
                    label: obj.error || "An Error Occurred",
                    message: obj.message || "No details provided"
                };
                notify(eventKey + 'error', error);
            });

        }



        function setOption(name, value, fire) {
            _options[name] = value;
            if(typeof(fire) === 'undefined' || !!fire) {
                let delay = 500;
                if(value === null || value === undefined) delay = 0;
                else if(typeof(value.push) !== 'undefined' && value.length) delay = 0;  //arrays
                else if(!value.length) delay = 0;   //strings
                dirty(delay, shouldResetPageStart(name));
            }
        }


        /**
         * @param {string} key - option being set
         * @return {boolean} true if the property change should reset pagination start
         */
        function shouldResetPageStart(key) {
            return key !== 'start' && key !== 'size' && key !== 'count' &&
                key !== 'pageSize' && key !== 'sort';
        }



        /* ------------ public api ------------- */

        return {

            events: {
                LOADING:            eventKey + 'querying',
                RESULTS:            eventKey + 'results',
                PAGINATION:         eventKey + 'pagination',
                SELECTED:           eventKey + 'selected',
                ERROR:              eventKey + 'error',
                SELECTED_ADDED:     eventKey + 'selected:added',
                SELECTED_REMOVED:   eventKey + 'selected:removed',
                SIMILARITY:         eventKey + 'similarTo',
                CLEARED:            eventKey + 'cleared'
            },

            /**
             * @return {bool}
             */
            getLoadingStatus: function() {
                return _isLoading;
            },

            /**
             * NOTE: Make sure event names are prefixed with
             *  eventKey + ''
             * @param {string} eventName
             * @param {function} listener
             */
            on: function(eventName, listener) {
                // if(eventName.indexOf(eventKey + ":") !== 0)
                //     eventName = eventKey + '' + eventName;
                return $rootScope.$on(eventName, listener);
            },

            /**
             * @param {string} eventName
             * @param {*} args
             */
            trigger: function(eventName, args) { notify(eventName, args); },

            /**
             * @return {array[object]}
             */
            getResults: function() { return _results; },

            /**
             * @return {array[string]} list of facet names
             */
            getFacetNames: function() { return FACETS.slice(0); },

            /**
             * @return {object} in form of <facet>: [<values>]
             */
            getFacets: function() { return _facets; },

            /**
             * @param {string} name
             * @return {object|null}
             */
            getFacet: function(name) {
                if(_facets) {
                    return _facets.find(function(facet) {return facet.name===name;});
                }
                return null;
            },

            addFacet: function(name) {
                _requestFacets.push(name);
            },

            applyConstraints: function(obj) {

                for(var p in obj) {
                    if(obj.hasOwnProperty(p)) {
                        _options[p] = obj[p];
                    }
                }

                _doUpdate(true);
            },

            applyOption: function(key, value, fire) { 
                setOption(key, value, fire);
            },

            applyOptions: function(opts, fire) { 
                angular.forEach(opts, (value, key) => { setOption(key, value, false); });
                if(fire) _doUpdate(true);
            },

            /**
             * @param {string} name - name of query parameter
             * @return {any} value of specified query parameter
             */
            getQueryOption: function(name) { return _options[name]; },

            /**
             * @param {string} text - free text query
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setQuery: function(text, fireUpdate) { setOption(VAR_QUERY, text, fireUpdate); },
            getQuery: function() { return _options[VAR_QUERY]; },

            /**
             * @param {array[string]} types - name of class(es) to request
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setTypes: function(types, fireUpdate) { setOption(VAR_TYPES, types, fireUpdate); },
            getTypes: function() { return _options[VAR_TYPES]; },

            /**
             * @param {string} userId - identifier of user
             * @param {boolean} fireUpdate -
             */
            setUser: function(userId, fireUpdate) { setOption(VAR_USER, userId, fireUpdate); },
            getUser: function() { return _options[VAR_USER]; },

            /**
             * @param {array[string]} creators - ids of creators
             * @param {boolean} fireUpdate -
             */
            setCreatedBy: function(creators, fireUpdate) { setOption(VAR_CREATED_BY, creators, fireUpdate); },
            getCreatedBy: function() { return _options[VAR_CREATED_BY]; },

            /**
             * @param {array[string]} themes - name of class(es) to request
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setThemes: function(themes, fireUpdate) { setOption(VAR_THEMES, themes, fireUpdate); },
            getThemes: function() { return _options[VAR_THEMES]; },

            /**
             * @param {array[string]} publishers - name of class(es) to request
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setAgencies: function(publishers, fireUpdate) { setOption(VAR_PUBLISHERS, publishers, fireUpdate); },
            getAgencies: function() { return _options[VAR_PUBLISHERS]; },

            /**
             * @param {array[string]} ids - ids of agents using this item
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setUsedBy: function(ids, fireUpdate) { setOption(VAR_USED_BY, ids, fireUpdate); },
            getUsedBy: function() { return _options[VAR_USED_BY]; },

            /**
             * @param {array[string]} svcTypes - ids
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setServiceTypes: function(svcTypes, fireUpdate) { setOption(VAR_SERVICE_TYPES, svcTypes, fireUpdate);  },
            getServiceTypes: function() { return _options[VAR_SERVICE_TYPES]; },

            /**
             * @param {array[string]} resTypes - uris
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setResourceTypes: function(resTypes, fireUpdate) { setOption(VAR_RESOURCE_TYPES, resTypes, fireUpdate);  },
            getResourceTypes: function() { return _options[VAR_RESOURCE_TYPES]; },

            /**
             * @param {array[string]} schemes - ids
             * @param {bool} fireUpdate - trigger update (default is true)
             */
            setSchemes: function(schemes, fireUpdate) { setOption(VAR_SCHEMES, schemes, fireUpdate); },
            getSchemes: function() { return _options[VAR_SCHEMES]; },

            /**
             * @param {string} visibility - one of 'public' or 'private'
             * @param {boolean} fireUpdate
             */
            setVisibility: function(visibility, fireUpdate) { setOption(VAR_VISIBILITY, visibility, fireUpdate); },
            getVisibility: function() { return _options[VAR_VISIBILITY]; },

            /**
             * @param {Date} date - date to compare against
             * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after)
             * @param {boolean} fireUpdate - flag specifying whether to trigger update automatically
             */
            setModified: function(date, beforeOrAfter, fireUpdate) {

                //if no date was supplied, consider it "unset" for both properties
                if(!date) {
                    setOption(VAR_MODIFIED_BEFORE, null, false);
                    setOption(VAR_MODIFIED_AFTER, null, true);
                    return;
                }

                let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
                let prop = dir ? VAR_MODIFIED_BEFORE : VAR_MODIFIED_AFTER;       //property being set
                let oppProp = dir ? VAR_MODIFIED_AFTER : VAR_MODIFIED_BEFORE;    //unset opposite property
                let arg = (date && date.getTime) ? date.getTime() : date;

                setOption(oppProp, null, false);
                setOption(prop, arg, true);
            },
            getModified: function() {
                return this._options[VAR_MODIFIED_BEFORE] || this._options[VAR_MODIFIED_AFTER];
            },

            /**
             * @param {string} bboxStr - form of "minx,miny,maxx,maxy"
             * @param {boolean} fireUpdate
             */
            setExtent: function(bboxStr) { setOption(VAR_EXTENT, bboxStr, true); },

            /** @return {string} bbox string or null if not set */
            getExtent: function() { return _options[VAR_EXTENT]; },

            /**
             * @return {array} list of selected items from current search results
             */
            getSelected: function() { return _selected; },

            /**
             * @param {array} arr - list of items to select in current search results
             */
            setSelected: function(arr) {
                _selected = arr;
                notify(this.events.SELECTED, _selected);
            },

            /**
             * @param {string} id - identifier of item in current search results to add to selected list
             */
            select: function(id) {

                var finder = function(l){ return l.id === id; };

                var existing = _selected.find(finder);
                if(existing) {  //already selected, deselect it

                    var idx = _selected.indexOf(existing);
                    if(idx >= 0) {
                        _selected.splice(idx, 1);
                        notify(eventKey + 'selected:removed', existing);
                    }

                } else {        //not selected, select it

                    let obj = _results.find(finder);
                    if(obj) {

                        if(_onSelectFn) {
                            _onSelectFn(id, function(err, item) {
                                if(item) {
                                    _selected.unshift(item);
                                    notify(eventKey + 'selected:added', item);
                                }
                            });
                        } else {
                            _selected.unshift(obj);
                            notify(eventKey + 'selected:added', obj);
                        }
                    }

                }

                notify(this.events.SELECTED, _selected);
            },

            /**
             * @param {string} id - identifier of item to check
             * @return {boolean} true if selected, false otherwise
             */
            isSelected: function(id) {
                return _selected.find(function(obj) {return obj.id === id;});
            },

            /**
             * select all items in current page of results
             */
            selectAll: function() {
                angular.forEach(_results, (obj) => {
                    if(!this.isSelected(obj.id))
                        _selected.unshift(obj);
                });
                notify(this.events.SELECTED, _selected);
            },

            /**
             * empty list of selected items
             */
            clearSelected: function() {
                let prev = _selected.slice(0);
                notify(this.events.SELECTED_REMOVED, prev);
                _selected = [];
                notify(this.events.SELECTED, []);
            },


            /**
             *
             */
            clear: function(refresh) {

                for(var prop in _options) {
                    if(!_options.hasOwnProperty(prop)) continue;
                    if('start' === prop) _options[prop] = 0;
                    else if('size' === prop) { }
                    else if('sort' === prop) _options[prop] = 'modified,desc';
                    else if('facets' === prop) _options[prop] = {};
                    else _options[prop] = null;
                }

                notify(this.events.CLEARED);
                if(refresh || typeof(refresh) === 'undefined')
                    _doUpdate(true);
            },

            /*
             * @param {string} category - name of facet
             * @param {string} value - value of facet
             */
            setFacet: function(category, value) {

                var f = _options.facets[category];
                if(!f)  //this facet category not set yet
                    _options.facets[category] = value;
                else {  //this facet category already set
                    if(f === value) {   //this facet value already set
                        //unset it
                        delete _options.facets[category];
                    } else {    //this facet value not set
                        //set it
                        _options.facets[category] = value;
                    }
                }

                _doUpdate(true);
            },

            /**
             * @param {array[string]} fields - list of field names to request for each search result
             */
            setFields: function(fields) {
                if(fields && typeof(fields.push) !== 'undefined')
                    _fields = fields;
            },

            /**
             * @param {int} start - beginning index of results to request
             * @param {bool} andUpdate - trigger update (default is true)
             */
            start: function(start, andUpdate) {
                _options.start = start;
                if(andUpdate && andUpdate === true)
                    _doUpdate(false);
            },

            /**
             * @param {int} size - page size to request
             * @param {bool} andUpdate - trigger update (default is true)
             */
            size: function(size, andUpdate) {

                _options.size = size;

                //find out which page in the new scheme the current first-result of current page
                // will show up in, and set start so that it shows up with the new page size
                var page = Math.floor(_options.start*1 / _options.size*1);
                _options.start = page * (_options.size*1);

                if(andUpdate && andUpdate === true)
                    _doUpdate(false);

            },

            /**
             * @param {int} size - number of items to return in each page of results
             */
            pageSize: function(size) {
                this.size(size, true);
            },

            /**
             * @param {string} sort - form of <field>,<dir>
             */
            sort: function(sort) {
                _options.sort = sort;
                _doUpdate(false);
            },

            /**
             * return {object} containing start index, page size, and total results
             */
            getPagination: function() {
                return {
                    start: _options.start,
                    size:  _options.size,
                    pageSize: _options.size,
                    total: _options.total,
                    sizeOptions: _pageSizeBase
                };
            },

            /**
             * @return {array} list of key-value pairs of sort options
             */
            getSortOptions: function() { return SORT_OPTIONS.slice(0); },

            /**
             * @return {string} sorting parameter (field,order)
             */
            getSortValue: function () { return _options.sort; },

            /**
             * @return {object} clone of the current set of query options
             */
            getQueryOptions: function() { return jQuery.extend({}, _options); },

            /**
             *
             */
            hasQueryOptions: function() {
                var result = false;
                for(var k in _options) {
                    if(_options.hasOwnProperty(k)) {

                        if( 'start' === k || 'size' === k || 'total' === k ||
                            'sort' === k || 'order' === k || 'within' === k ||
                            'facets' === k) continue;

                        if(_selectedFacets.length)
                            result = true;

                        if(typeof(_options[k]) !== 'undefined' && _options[k] !== null) {
                            result = true;
                        }
                    }
                }
                return result;
            },

            /**
             * Triggers a refresh of current search results
             * @param {boolean} resetStart - reset 'start' to 0 flag
             */
            update: function(resetStart) {
                dirty(0, resetStart);
            },


            reset: function() {
                _options = {
                    start: 0,
                    size: _pageSizeBase[0],
                    total: 0,
                    sort: "modified,desc", order: "asc",
                    facets: {}
                };
                notify(this.events.CLEARED);

                _facets = [];
                _selectedFacets = [];
                _results = [];
                _isLoading = false;
                _selected = [];

                if(_dirtyPromise)
                    $timeout.cancel(_dirtyPromise);
                _dirtyPromise = null;
            },

            destroy: function() {
                if(_dirtyPromise)
                    $timeout.cancel(_dirtyPromise);
            }
        };
    }








    /**
     * Factory for creating instances of BrowseObjectsService
     */
    function BrowseServiceFactory($rootScope, $timeout, $resource) {

        return function(options) {
            let svc = BrowseObjectsService($rootScope, $timeout, $resource, options);
            if(options && options.params)
                svc.applyOptions(options.params);
            return svc;
        };
    }




    angular.module('gp-common')

    //generic browse service
    .service("BrowseObjectsService",
        ['$rootScope', '$timeout', '$resource', BrowseObjectsService])

    //factory for creating specific browse services
    .factory("BrowseServiceFactory",
        ['$rootScope', '$timeout', '$resource', 'BrowseObjectsService', BrowseServiceFactory]);

/*
    Example of how to use the factory to customize a service

    //layer-specific browse service
    .service('BrowseLayerObjService', ['BrowseServiceFactory', function(BrowseServiceFactory) {
        let service = BrowseServiceFactory({
            key: 'layers',
            url: Constants.ualUrl + '/api/layers'
        });

        //add custom methods here

        return service;
    }])
*/


})(angular, GeoPlatform);
