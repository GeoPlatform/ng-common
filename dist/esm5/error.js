import * as tslib_1 from "tslib";
/**
 *
 */
var GPError = /** @class */ (function (_super) {
    tslib_1.__extends(GPError, _super);
    function GPError(message, label, code, item) {
        var _this = _super.call(this, message) || this;
        _this.label = label;
        _this.code = code;
        _this.item = item;
        return _this;
    }
    Object.defineProperty(GPError.prototype, "label", {
        get: function () { return this._label; },
        set: function (value) { this._label = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPError.prototype, "code", {
        get: function () { return this._code; },
        set: function (value) { this._code = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GPError.prototype, "item", {
        get: function () { return this._item; },
        set: function (value) { this._item = value; },
        enumerable: true,
        configurable: true
    });
    GPError.from = function (error) {
        if (error instanceof GPError)
            return error;
        var gpe = new GPError(error.message);
        gpe.label = "An error occurred";
        gpe.code = 500;
        return gpe;
    };
    return GPError;
}(Error));
export { GPError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBOztHQUVHO0FBQ0g7SUFBNkIsbUNBQUs7SUFnQjlCLGlCQUNJLE9BQWUsRUFDZixLQUFlLEVBQ2YsSUFBYyxFQUNkLElBQVk7UUFKaEIsWUFNSSxrQkFBTSxPQUFPLENBQUMsU0FJakI7UUFIRyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixLQUFJLENBQUMsSUFBSSxHQUFJLElBQUksQ0FBQztRQUNsQixLQUFJLENBQUMsSUFBSSxHQUFJLElBQUksQ0FBQzs7SUFDdEIsQ0FBQztJQXBCRCxzQkFBVywwQkFBSzthQUFoQixjQUFxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzFDLFVBQWlCLEtBQWEsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7OztPQURkO0lBRzFDLHNCQUFXLHlCQUFJO2FBQWYsY0FBb0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN4QyxVQUFnQixLQUFhLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FEZDtJQUd4QyxzQkFBVyx5QkFBSTthQUFmLGNBQW9CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDeEMsVUFBZ0IsS0FBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BRGI7SUFnQmpDLFlBQUksR0FBWCxVQUFZLEtBQWE7UUFDckIsSUFBRyxLQUFLLFlBQVksT0FBTztZQUN2QixPQUFPLEtBQWdCLENBQUM7UUFFNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7UUFDaEMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDZixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUE2QixLQUFLLEdBc0NqQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEdQRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBwcml2YXRlIF9sYWJlbDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NvZGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9pdGVtIDogSXRlbTtcblxuICAgIHB1YmxpYyBnZXQgbGFiZWwoKSB7IHJldHVybiB0aGlzLl9sYWJlbDsgfVxuICAgIHB1YmxpYyBzZXQgbGFiZWwodmFsdWU6IHN0cmluZykgeyB0aGlzLl9sYWJlbCA9IHZhbHVlOyB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvZGUoKSB7IHJldHVybiB0aGlzLl9jb2RlOyB9XG4gICAgcHVibGljIHNldCBjb2RlKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fY29kZSA9IHZhbHVlOyB9XG5cbiAgICBwdWJsaWMgZ2V0IGl0ZW0oKSB7IHJldHVybiB0aGlzLl9pdGVtOyB9XG4gICAgcHVibGljIHNldCBpdGVtKHZhbHVlIDogSXRlbSkgeyB0aGlzLl9pdGVtID0gdmFsdWU7IH1cblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbGFiZWwgPzogc3RyaW5nLFxuICAgICAgICBjb2RlID86IG51bWJlcixcbiAgICAgICAgaXRlbSA/OiBJdGVtXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMuY29kZSAgPSBjb2RlO1xuICAgICAgICB0aGlzLml0ZW0gID0gaXRlbTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbShlcnJvciA6IEVycm9yKSA6IEdQRXJyb3Ige1xuICAgICAgICBpZihlcnJvciBpbnN0YW5jZW9mIEdQRXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IgYXMgR1BFcnJvcjtcblxuICAgICAgICBsZXQgZ3BlID0gbmV3IEdQRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIGdwZS5sYWJlbCA9IFwiQW4gZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgZ3BlLmNvZGUgPSA1MDA7XG4gICAgICAgIHJldHVybiBncGU7XG4gICAgfVxuXG59XG4iXX0=