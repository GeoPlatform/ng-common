import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Item, ItemService, TrackingService } from '@geoplatform/client';
export declare class ItemResolver implements Resolve<Item> {
    private service;
    private trackingService;
    constructor(service: ItemService, trackingService: TrackingService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any;
}
export declare class VersionResolver implements Resolve<string> {
    constructor();
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any;
}
export declare class NewItemResolver implements Resolve<Item> {
    private router;
    constructor(router: Router);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item>;
}
export declare class ErrorResolver implements Resolve<Error> {
    private router;
    constructor(router: Router);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Error>;
}
