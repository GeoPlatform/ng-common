import * as tslib_1 from "tslib";
import { Config } from '@geoplatform/client';
var LEVELS = [
    "error",
    "warn",
    "info",
    "debug"
];
var Logger = /** @class */ (function () {
    function Logger() {
        this.level = 'error';
        this.setLevel(Config.logLevel || Config.LOG_LEVEL);
    }
    Logger.prototype.setLevel = function (level) {
        if (level && LEVELS.indexOf(level) >= 0) {
            this.level = level;
        }
        this.info("Log Level : " + this.level);
    };
    Logger.prototype.isVisible = function (level) {
        return LEVELS.indexOf(this.level) >= LEVELS.indexOf(level);
    };
    Logger.prototype.log = function (arg) {
        var _this = this;
        var addl = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            addl[_i - 1] = arguments[_i];
        }
        var msg = this.toStr(arg);
        msg += addl.map(function (a) { return _this.toStr(a); }).join('');
        console.log(msg);
    };
    Logger.prototype.debug = function (arg) {
        var addl = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            addl[_i - 1] = arguments[_i];
        }
        if (!this.isVisible('debug'))
            return;
        var msg = "[DEBUG] " + this.toStr(arg);
        this.log.apply(this, tslib_1.__spread([msg], addl));
    };
    Logger.prototype.info = function (arg) {
        var addl = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            addl[_i - 1] = arguments[_i];
        }
        if (!this.isVisible('info'))
            return;
        var msg = "[INFO] " + this.toStr(arg);
        this.log.apply(this, tslib_1.__spread([msg], addl));
    };
    Logger.prototype.warn = function (arg) {
        var addl = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            addl[_i - 1] = arguments[_i];
        }
        if (!this.isVisible('warn'))
            return;
        var msg = "[WARN] " + this.toStr(arg);
        this.log.apply(this, tslib_1.__spread([msg], addl));
    };
    Logger.prototype.error = function (arg) {
        var addl = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            addl[_i - 1] = arguments[_i];
        }
        var msg = "[ERROR] " + this.toStr(arg);
        this.log.apply(this, tslib_1.__spread([msg], addl));
    };
    Logger.prototype.toStr = function (arg) {
        if (null === arg || typeof (arg) === 'undefined')
            return '';
        if (typeof (arg) === 'string')
            return arg;
        return JSON.stringify(arg);
    };
    return Logger;
}());
var logger = new Logger();
export { logger as default, logger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLElBQU0sTUFBTSxHQUFHO0lBQ1gsT0FBTztJQUNQLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztDQUNWLENBQUM7QUFFRjtJQUlJO1FBRlEsVUFBSyxHQUFZLE9BQU8sQ0FBQztRQUc3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCx5QkFBUSxHQUFSLFVBQVMsS0FBYztRQUNuQixJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsMEJBQVMsR0FBVCxVQUFVLEtBQWM7UUFDcEIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxvQkFBRyxHQUFILFVBQUksR0FBRztRQUFQLGlCQUlDO1FBSlEsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7UUFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBYixDQUFhLENBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsc0JBQUssR0FBTCxVQUFNLEdBQUc7UUFBRSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLDZCQUFPOztRQUNkLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU87UUFDcEMsSUFBSSxHQUFHLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLG9CQUFLLEdBQUcsR0FBSyxJQUFJLEdBQUU7SUFDM0IsQ0FBQztJQUVELHFCQUFJLEdBQUosVUFBSyxHQUFHO1FBQUUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7UUFDYixJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQ25DLElBQUksR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxvQkFBSyxHQUFHLEdBQUssSUFBSSxHQUFFO0lBQzNCLENBQUM7SUFFRCxxQkFBSSxHQUFKLFVBQUssR0FBRztRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBQ2IsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQUUsT0FBTztRQUNuQyxJQUFJLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksb0JBQUssR0FBRyxHQUFLLElBQUksR0FBRTtJQUMzQixDQUFDO0lBRUQsc0JBQUssR0FBTCxVQUFNLEdBQUc7UUFBRSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLDZCQUFPOztRQUNkLElBQUksR0FBRyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxvQkFBSyxHQUFHLEdBQUssSUFBSSxHQUFFO0lBQzNCLENBQUM7SUFFRCxzQkFBSyxHQUFMLFVBQU0sR0FBRztRQUNMLElBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzFELElBQUcsT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFNLFFBQVE7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBRUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUU1QixPQUFPLEVBQ0gsTUFBTSxJQUFJLE9BQU8sRUFDakIsTUFBTSxFQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5jb25zdCBMRVZFTFMgPSBbXG4gICAgXCJlcnJvclwiLFxuICAgIFwid2FyblwiLFxuICAgIFwiaW5mb1wiLFxuICAgIFwiZGVidWdcIlxuXTtcblxuY2xhc3MgTG9nZ2VyIHtcblxuICAgIHByaXZhdGUgbGV2ZWwgOiBzdHJpbmcgPSAnZXJyb3InO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2V0TGV2ZWwoQ29uZmlnLmxvZ0xldmVsIHx8IENvbmZpZy5MT0dfTEVWRUwpO1xuICAgIH1cblxuICAgIHNldExldmVsKGxldmVsIDogc3RyaW5nKSB7XG4gICAgICAgIGlmKCBsZXZlbCAmJiBMRVZFTFMuaW5kZXhPZihsZXZlbCkgPj0gMCApIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZm8oXCJMb2cgTGV2ZWwgOiBcIiArIHRoaXMubGV2ZWwpO1xuICAgIH1cblxuICAgIGlzVmlzaWJsZShsZXZlbCA6IHN0cmluZykgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIExFVkVMUy5pbmRleE9mKHRoaXMubGV2ZWwpID49IExFVkVMUy5pbmRleE9mKGxldmVsKTtcbiAgICB9XG5cbiAgICBsb2coYXJnLCAuLi5hZGRsKSB7XG4gICAgICAgIGxldCBtc2cgPSB0aGlzLnRvU3RyKGFyZyk7XG4gICAgICAgIG1zZyArPSBhZGRsLm1hcCggYSA9PiB0aGlzLnRvU3RyKGEpICkuam9pbignJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG4gICAgZGVidWcoYXJnLCAuLi5hZGRsKSB7XG4gICAgICAgIGlmKCF0aGlzLmlzVmlzaWJsZSgnZGVidWcnKSkgcmV0dXJuO1xuICAgICAgICBsZXQgbXNnID0gXCJbREVCVUddIFwiICsgdGhpcy50b1N0cihhcmcpO1xuICAgICAgICB0aGlzLmxvZyhtc2csIC4uLmFkZGwpO1xuICAgIH1cblxuICAgIGluZm8oYXJnLCAuLi5hZGRsKSB7XG4gICAgICAgIGlmKCF0aGlzLmlzVmlzaWJsZSgnaW5mbycpKSByZXR1cm47XG4gICAgICAgIGxldCBtc2cgPSBcIltJTkZPXSBcIiArIHRoaXMudG9TdHIoYXJnKTtcbiAgICAgICAgdGhpcy5sb2cobXNnLCAuLi5hZGRsKTtcbiAgICB9XG5cbiAgICB3YXJuKGFyZywgLi4uYWRkbCkge1xuICAgICAgICBpZighdGhpcy5pc1Zpc2libGUoJ3dhcm4nKSkgcmV0dXJuO1xuICAgICAgICBsZXQgbXNnID0gXCJbV0FSTl0gXCIgKyB0aGlzLnRvU3RyKGFyZyk7XG4gICAgICAgIHRoaXMubG9nKG1zZywgLi4uYWRkbCk7XG4gICAgfVxuXG4gICAgZXJyb3IoYXJnLCAuLi5hZGRsKSB7XG4gICAgICAgIGxldCBtc2cgPSBcIltFUlJPUl0gXCIgKyB0aGlzLnRvU3RyKGFyZyk7XG4gICAgICAgIHRoaXMubG9nKG1zZywgLi4uYWRkbCk7XG4gICAgfVxuXG4gICAgdG9TdHIoYXJnKSB7XG4gICAgICAgIGlmKG51bGwgPT09IGFyZyB8fCB0eXBlb2YoYXJnKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcbiAgICAgICAgaWYodHlwZW9mKGFyZykgPT09ICAnc3RyaW5nJykgcmV0dXJuIGFyZztcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZyk7XG4gICAgfVxufVxuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmV4cG9ydCB7XG4gICAgbG9nZ2VyIGFzIGRlZmF1bHQsXG4gICAgbG9nZ2VyXG59O1xuIl19