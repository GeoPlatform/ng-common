import { Observable } from 'rxjs';
import { GeoPlatformError } from './error';
export declare class GeoPlatformErrorService {
    private updateSubject;
    error$: Observable<GeoPlatformError>;
    setError(error: Error): void;
}
