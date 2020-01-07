import { Config } from '@geoplatform/client';
const LEVELS = [
    "error",
    "warn",
    "info",
    "debug"
];
class Logger {
    constructor() {
        this.level = 'error';
        this.setLevel(Config.logLevel || Config.LOG_LEVEL);
    }
    setLevel(level) {
        if (level && LEVELS.indexOf(level) >= 0) {
            this.level = level;
        }
        this.info("Log Level : " + this.level);
    }
    isVisible(level) {
        return LEVELS.indexOf(this.level) >= LEVELS.indexOf(level);
    }
    log(arg, ...addl) {
        let msg = this.toStr(arg);
        msg += addl.map(a => this.toStr(a)).join('');
        console.log(msg);
    }
    debug(arg, ...addl) {
        if (!this.isVisible('debug'))
            return;
        let msg = "[DEBUG] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    info(arg, ...addl) {
        if (!this.isVisible('info'))
            return;
        let msg = "[INFO] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    warn(arg, ...addl) {
        if (!this.isVisible('warn'))
            return;
        let msg = "[WARN] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    error(arg, ...addl) {
        let msg = "[ERROR] " + this.toStr(arg);
        this.log(msg, ...addl);
    }
    toStr(arg) {
        if (null === arg || typeof (arg) === 'undefined')
            return '';
        if (typeof (arg) === 'string')
            return arg;
        return JSON.stringify(arg);
    }
}
const logger = new Logger();
export { logger as default, logger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0MsTUFBTSxNQUFNLEdBQUc7SUFDWCxPQUFPO0lBQ1AsTUFBTTtJQUNOLE1BQU07SUFDTixPQUFPO0NBQ1YsQ0FBQztBQUVGLE1BQU0sTUFBTTtJQUlSO1FBRlEsVUFBSyxHQUFZLE9BQU8sQ0FBQztRQUc3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYztRQUNuQixJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRztZQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWM7UUFDcEIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSTtRQUNaLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJO1FBQ2QsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQUUsT0FBTztRQUNwQyxJQUFJLEdBQUcsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSTtRQUNiLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUFFLE9BQU87UUFDbkMsSUFBSSxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUk7UUFDYixJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQ25DLElBQUksR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJO1FBQ2QsSUFBSSxHQUFHLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDTCxJQUFHLElBQUksS0FBSyxHQUFHLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFdBQVc7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUMxRCxJQUFHLE9BQU0sQ0FBQyxHQUFHLENBQUMsS0FBTSxRQUFRO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQUVELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsT0FBTyxFQUNILE1BQU0sSUFBSSxPQUFPLEVBQ2pCLE1BQU0sRUFDVCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuY29uc3QgTEVWRUxTID0gW1xuICAgIFwiZXJyb3JcIixcbiAgICBcIndhcm5cIixcbiAgICBcImluZm9cIixcbiAgICBcImRlYnVnXCJcbl07XG5cbmNsYXNzIExvZ2dlciB7XG5cbiAgICBwcml2YXRlIGxldmVsIDogc3RyaW5nID0gJ2Vycm9yJztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNldExldmVsKENvbmZpZy5sb2dMZXZlbCB8fCBDb25maWcuTE9HX0xFVkVMKTtcbiAgICB9XG5cbiAgICBzZXRMZXZlbChsZXZlbCA6IHN0cmluZykge1xuICAgICAgICBpZiggbGV2ZWwgJiYgTEVWRUxTLmluZGV4T2YobGV2ZWwpID49IDAgKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmZvKFwiTG9nIExldmVsIDogXCIgKyB0aGlzLmxldmVsKTtcbiAgICB9XG5cbiAgICBpc1Zpc2libGUobGV2ZWwgOiBzdHJpbmcpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBMRVZFTFMuaW5kZXhPZih0aGlzLmxldmVsKSA+PSBMRVZFTFMuaW5kZXhPZihsZXZlbCk7XG4gICAgfVxuXG4gICAgbG9nKGFyZywgLi4uYWRkbCkge1xuICAgICAgICBsZXQgbXNnID0gdGhpcy50b1N0cihhcmcpO1xuICAgICAgICBtc2cgKz0gYWRkbC5tYXAoIGEgPT4gdGhpcy50b1N0cihhKSApLmpvaW4oJycpO1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cblxuICAgIGRlYnVnKGFyZywgLi4uYWRkbCkge1xuICAgICAgICBpZighdGhpcy5pc1Zpc2libGUoJ2RlYnVnJykpIHJldHVybjtcbiAgICAgICAgbGV0IG1zZyA9IFwiW0RFQlVHXSBcIiArIHRoaXMudG9TdHIoYXJnKTtcbiAgICAgICAgdGhpcy5sb2cobXNnLCAuLi5hZGRsKTtcbiAgICB9XG5cbiAgICBpbmZvKGFyZywgLi4uYWRkbCkge1xuICAgICAgICBpZighdGhpcy5pc1Zpc2libGUoJ2luZm8nKSkgcmV0dXJuO1xuICAgICAgICBsZXQgbXNnID0gXCJbSU5GT10gXCIgKyB0aGlzLnRvU3RyKGFyZyk7XG4gICAgICAgIHRoaXMubG9nKG1zZywgLi4uYWRkbCk7XG4gICAgfVxuXG4gICAgd2FybihhcmcsIC4uLmFkZGwpIHtcbiAgICAgICAgaWYoIXRoaXMuaXNWaXNpYmxlKCd3YXJuJykpIHJldHVybjtcbiAgICAgICAgbGV0IG1zZyA9IFwiW1dBUk5dIFwiICsgdGhpcy50b1N0cihhcmcpO1xuICAgICAgICB0aGlzLmxvZyhtc2csIC4uLmFkZGwpO1xuICAgIH1cblxuICAgIGVycm9yKGFyZywgLi4uYWRkbCkge1xuICAgICAgICBsZXQgbXNnID0gXCJbRVJST1JdIFwiICsgdGhpcy50b1N0cihhcmcpO1xuICAgICAgICB0aGlzLmxvZyhtc2csIC4uLmFkZGwpO1xuICAgIH1cblxuICAgIHRvU3RyKGFyZykge1xuICAgICAgICBpZihudWxsID09PSBhcmcgfHwgdHlwZW9mKGFyZykgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJyc7XG4gICAgICAgIGlmKHR5cGVvZihhcmcpID09PSAgJ3N0cmluZycpIHJldHVybiBhcmc7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmcpO1xuICAgIH1cbn1cblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG5leHBvcnQge1xuICAgIGxvZ2dlciBhcyBkZWZhdWx0LFxuICAgIGxvZ2dlclxufTtcbiJdfQ==