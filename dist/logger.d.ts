declare class Logger {
    private level;
    constructor();
    setLevel(level: string): void;
    isVisible(level: string): boolean;
    log(arg: any, ...addl: any[]): void;
    debug(arg: any, ...addl: any[]): void;
    info(arg: any, ...addl: any[]): void;
    warn(arg: any, ...addl: any[]): void;
    error(arg: any, ...addl: any[]): void;
    toStr(arg: any): string;
}
declare const logger: Logger;
export { logger as default, logger };
