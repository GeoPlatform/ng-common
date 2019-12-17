import { Observable } from 'rxjs';
import { GPError } from './error';
export declare class ErrorService {
    private updateSubject;
    error$: Observable<GPError>;
    setError(error: Error): void;
}
