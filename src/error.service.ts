import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { GeoPlatformError } from './error';

@Injectable()
export class GeoPlatformErrorService {

    private updateSubject: BehaviorSubject<GeoPlatformError> = new BehaviorSubject<GeoPlatformError>(null);

    error$: Observable<GeoPlatformError> = this.updateSubject.asObservable();

    setError(error: Error) {
        let gpe = GeoPlatformError.from(error);
        this.updateSubject.next(gpe);
    }
}
