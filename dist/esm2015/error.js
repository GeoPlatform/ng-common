/**
 *
 */
export class GPError extends Error {
    get label() { return this._label; }
    set label(value) { this._label = value; }
    get code() { return this._code; }
    set code(value) { this._code = value; }
    get item() { return this._item; }
    set item(value) { this._item = value; }
    constructor(message, label, code, item) {
        super(message);
        this.label = label;
        this.code = code;
        this.item = item;
    }
    static from(error) {
        if (error instanceof GPError)
            return error;
        let gpe = new GPError(error.message);
        gpe.label = "An error occurred";
        gpe.code = 500;
        return gpe;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7O0dBRUc7QUFDSCxNQUFNLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFNOUIsSUFBVyxLQUFLLEtBQUssT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxQyxJQUFXLEtBQUssQ0FBQyxLQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXhELElBQVcsSUFBSSxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEMsSUFBVyxJQUFJLENBQUMsS0FBYSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUV0RCxJQUFXLElBQUksS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLElBQVcsSUFBSSxDQUFDLEtBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFHckQsWUFDSSxPQUFlLEVBQ2YsS0FBZSxFQUNmLElBQWMsRUFDZCxJQUFZO1FBRVosS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBSSxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBSSxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBYTtRQUNyQixJQUFHLEtBQUssWUFBWSxPQUFPO1lBQ3ZCLE9BQU8sS0FBZ0IsQ0FBQztRQUU1QixJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNmLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgR1BFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIHByaXZhdGUgX2xhYmVsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY29kZTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2l0ZW0gOiBJdGVtO1xuXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHsgcmV0dXJuIHRoaXMuX2xhYmVsOyB9XG4gICAgcHVibGljIHNldCBsYWJlbCh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuX2xhYmVsID0gdmFsdWU7IH1cblxuICAgIHB1YmxpYyBnZXQgY29kZSgpIHsgcmV0dXJuIHRoaXMuX2NvZGU7IH1cbiAgICBwdWJsaWMgc2V0IGNvZGUodmFsdWU6IG51bWJlcikgeyB0aGlzLl9jb2RlID0gdmFsdWU7IH1cblxuICAgIHB1YmxpYyBnZXQgaXRlbSgpIHsgcmV0dXJuIHRoaXMuX2l0ZW07IH1cbiAgICBwdWJsaWMgc2V0IGl0ZW0odmFsdWUgOiBJdGVtKSB7IHRoaXMuX2l0ZW0gPSB2YWx1ZTsgfVxuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBsYWJlbCA/OiBzdHJpbmcsXG4gICAgICAgIGNvZGUgPzogbnVtYmVyLFxuICAgICAgICBpdGVtID86IEl0ZW1cbiAgICApIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5jb2RlICA9IGNvZGU7XG4gICAgICAgIHRoaXMuaXRlbSAgPSBpdGVtO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tKGVycm9yIDogRXJyb3IpIDogR1BFcnJvciB7XG4gICAgICAgIGlmKGVycm9yIGluc3RhbmNlb2YgR1BFcnJvcilcbiAgICAgICAgICAgIHJldHVybiBlcnJvciBhcyBHUEVycm9yO1xuXG4gICAgICAgIGxldCBncGUgPSBuZXcgR1BFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgZ3BlLmxhYmVsID0gXCJBbiBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICBncGUuY29kZSA9IDUwMDtcbiAgICAgICAgcmV0dXJuIGdwZTtcbiAgICB9XG5cbn1cbiJdfQ==