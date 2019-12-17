import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { GPError } from './error';

@Injectable()
export class ErrorService {

    private updateSubject: BehaviorSubject<GPError> = new BehaviorSubject<GPError>(null);

    error$: Observable<GPError> = this.updateSubject.asObservable();

    setError(error: Error) {
        let gpe = GPError.from(error);
        this.updateSubject.next(gpe);
    }
}
