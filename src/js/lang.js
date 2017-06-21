(function() {

    "use strict";

    if(typeof(Array.prototype.find) === 'undefined') {
        Array.prototype.find = function(callback) {
            for(var i=0; i<this.length; ++i) {
                if(callback(this[i], i, this))
                    return this[i];
            }
            return null;
        };
    }
    if(typeof(Array.prototype.filter) === 'undefined') {
        Array.prototype.filter = function(callback) {
            var results = [];
            for(var i=0; i<this.length; ++i) {
                if(callback(this[i], i, this))
                    results.push(this[i]);
            }
            return results;
        };
    }
    if(typeof(Array.prototype.each) === 'undefined') {
        Array.prototype.each = function(callback) {
            for(var i=0; i<this.length; ++i) {
                callback(this[i], i, this);
            }
        };
    }
    if(typeof(Array.prototype.indexOfObj) === 'undefined') {
        Array.prototype.indexOfObj = function(obj, comparatorFn) {
            
            let arr = this, len = arr.length;
            
            if(typeof(comparatorFn) !== 'function')
                comparatorFn = (a,b) => { return a===b; };

            for(let i=0; i<len; ++i) {
                if(comparatorFn(obj, arr[i]))
                    return i;
            }
            return -1;
        };
    }
    if(typeof(String.prototype.startsWith) === 'undefined') {
        String.prototype.startsWith = function(value) {
            var str = this;
            if(!str.length)     return false;
            if(!value.length)   return false;
            if(str.length < value.length) return false;
            return str.indexOf(value) === 0;
        };
    }
    if(typeof(String.prototype.endsWith) === 'undefined') {
        String.prototype.endsWith = function(value) {
            var str = this;
            if(!str.length)     return false;
            if(!value.length)   return false;
            if(str.length < value.length) return false;
            var substr = str.substring(
                str.length - value.length,
                str.length
            );
            return substr == value;
        };
    }




    if(typeof(Date.prototype.plus) === 'undefined') {
        Date.prototype.plus = function(offset) {
            
            var type = typeof(offset);
            if(type === 'undefined') return this;

            var offsetMS = 0;
            if(type === 'string') {
                switch(offset) {
                    case 'hour':    offsetMS = 1000*60*60; break;
                    case 'day':     offsetMS = 1000*60*60*24; break;
                    case 'week':    offsetMS = 1000*60*60*24*7; break;
                    case 'month':   offsetMS = 1000*60*60*24*31; break;
                    case 'year':    offsetMS = 1000*60*60*24*365; break;
                }
            } else if(type === 'number') {
                offsetMS = offset;
            } else return this;

            var d = this;
            return new Date(d.getTime() + offsetMS);
        };
    }

    if(typeof(Date.prototype.random) === 'undefined') {
        Date.prototype.random = function(threshold) {

            var type = typeof(threshold);
            if(type === 'undefined') return this;

            var offsetMS = 0;
            if(type === 'string') {
                switch(threshold) {
                    case 'hour':    offsetMS = 1000*60*60; break;
                    case 'day':     offsetMS = 1000*60*60*24; break;
                    case 'week':    offsetMS = 1000*60*60*24*7; break;
                    case 'month':   offsetMS = 1000*60*60*24*31; break;
                    case 'year':    offsetMS = 1000*60*60*24*365; break;
                }
            } else if(type === 'number') {
                offsetMS = threshold;
            } else return this;

            var d = this;
            return new Date(d.getTime() + Math.floor(Math.random()*offsetMS));
        };
    }

})();