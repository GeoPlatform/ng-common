import { Injectable, Inject } from '@angular/core';
import {
    Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve
} from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import {
    Item, ItemService,
    TrackingService, TrackingTypes, TrackingEventFactory
} from '@geoplatform/client';
import { ItemFactory }       from './item-factory';
import { GPError }           from './error';

@Injectable(/*{ providedIn: 'root' }*/)
export class ItemResolver implements Resolve<Item> {

    constructor(
        @Inject(ItemService) private service : ItemService,
        @Inject(TrackingService) private trackingService : TrackingService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {

        let id = route.paramMap.get('id');
        let opts : any = {};
        let version = route.paramMap.get("version");
        if(version) opts.version = version;
        return this.service.get(id, opts)
        .then( item => {
            if(this.trackingService) {
                let event = TrackingEventFactory(TrackingTypes.VIEWED, item);
                this.trackingService.logEvent(event);
            }
            return item;
        })
        .catch( (e : Error) => of( e ) );
    }
}


@Injectable(/*{ providedIn: 'root' }*/)
export class VersionResolver implements Resolve<string> {

    constructor() { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        let version = route.paramMap.get("version");
        return Promise.resolve(version||null);
    }
}



@Injectable()
export class NewItemResolver implements Resolve<Item> {

    constructor(
        private router: Router,
        // private errorService: ErrorService
    ) {

    }

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Item> {
        let type = route.params.type;
        let item = ItemFactory.create(type);
        if(!item) {
            let gpe = new GPError(`Type ${type} is unsupported`, "Unsupported Type", 400);
            // this.errorService.setError(gpe);
            this.router.navigateByUrl('error', {skipLocationChange:false});
            return empty();
        } else {
            return of(item);
        }
    }
}



@Injectable()
export class ErrorResolver implements Resolve<Error> {
    constructor(private router: Router) {}
    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Error> {
        let type = route.params.type;
        let msg = "An error has occurred";
        if("unsupported" === type)
            msg = `Type ${type} is not supported`;
        else if("404" === type)
            msg = "Item not found";
        let error = new Error(msg);
        // error.error = "Unsupported Type";
        return of(error);
    }
}
