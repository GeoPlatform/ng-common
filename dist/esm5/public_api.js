/*
    Version of the library exposed to consumers.
    Long-term this value should be auto-set to be whatever is set in package.json
 */
export var GeoPlatformCommonVersion = "1.0.0";
// import Polyfills from "./shared/polyfills";
// Polyfills();
export var DefaultSortOptions = [
    { value: "_score,desc", label: "Relevance" },
    { value: "modified,desc", label: "Most Recently Modified" },
    { value: "modified,asc", label: "Least Recently Modified" },
    { value: "label,asc", label: "Title [A-Z]" },
    { value: "label,desc", label: "Title [Z-A]" },
    { value: "reliability,asc", label: "Reliability" }
];
export * from './auth';
export * from './dialogs';
export * from './directives';
export * from './components';
export * from './logger';
export * from './error.service';
export * from './error';
export * from './event';
export * from './item-factory';
export * from './item-helper';
export * from './map-types';
export * from './pipes';
export * from './resolvers';
export * from './search';
export * from './module';
export * from './tracking.factory';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJwdWJsaWNfYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLHdCQUF3QixHQUFHLE9BQU8sQ0FBQztBQUVoRCw4Q0FBOEM7QUFDOUMsZUFBZTtBQUVmLE1BQU0sQ0FBQyxJQUFNLGtCQUFrQixHQUFHO0lBQzlCLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBTSxLQUFLLEVBQUUsV0FBVyxFQUFHO0lBQ2pELEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDOUQsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM5RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQVEsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQU8sS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUNsRCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0NBQ3JELENBQUM7QUFFRixjQUFjLFFBQVEsQ0FBQztBQUN2QixjQUFjLFdBQVcsQ0FBQztBQUMxQixjQUFjLGNBQWMsQ0FBQztBQUM3QixjQUFjLGNBQWMsQ0FBQztBQUM3QixjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsU0FBUyxDQUFDO0FBQ3hCLGNBQWMsU0FBUyxDQUFDO0FBQ3hCLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxhQUFhLENBQUM7QUFDNUIsY0FBYyxTQUFTLENBQUM7QUFDeEIsY0FBYyxhQUFhLENBQUM7QUFDNUIsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLypcbiAgICBWZXJzaW9uIG9mIHRoZSBsaWJyYXJ5IGV4cG9zZWQgdG8gY29uc3VtZXJzLlxuICAgIExvbmctdGVybSB0aGlzIHZhbHVlIHNob3VsZCBiZSBhdXRvLXNldCB0byBiZSB3aGF0ZXZlciBpcyBzZXQgaW4gcGFja2FnZS5qc29uXG4gKi9cbmV4cG9ydCBjb25zdCBHZW9QbGF0Zm9ybUNvbW1vblZlcnNpb24gPSBcIjEuMC4wXCI7XG5cbi8vIGltcG9ydCBQb2x5ZmlsbHMgZnJvbSBcIi4vc2hhcmVkL3BvbHlmaWxsc1wiO1xuLy8gUG9seWZpbGxzKCk7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0U29ydE9wdGlvbnMgPSBbXG4gICAgeyB2YWx1ZTogXCJfc2NvcmUsZGVzY1wiLCAgICAgbGFiZWw6IFwiUmVsZXZhbmNlXCIgIH0sXG4gICAgeyB2YWx1ZTogXCJtb2RpZmllZCxkZXNjXCIsICAgbGFiZWw6IFwiTW9zdCBSZWNlbnRseSBNb2RpZmllZFwiICB9LFxuICAgIHsgdmFsdWU6IFwibW9kaWZpZWQsYXNjXCIsICAgIGxhYmVsOiBcIkxlYXN0IFJlY2VudGx5IE1vZGlmaWVkXCIgfSxcbiAgICB7IHZhbHVlOiBcImxhYmVsLGFzY1wiLCAgICAgICBsYWJlbDogXCJUaXRsZSBbQS1aXVwiIH0sXG4gICAgeyB2YWx1ZTogXCJsYWJlbCxkZXNjXCIsICAgICAgbGFiZWw6IFwiVGl0bGUgW1otQV1cIiB9LFxuICAgIHsgdmFsdWU6IFwicmVsaWFiaWxpdHksYXNjXCIsIGxhYmVsOiBcIlJlbGlhYmlsaXR5XCIgfVxuXTtcblxuZXhwb3J0ICogZnJvbSAnLi9hdXRoJztcbmV4cG9ydCAqIGZyb20gJy4vZGlhbG9ncyc7XG5leHBvcnQgKiBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vbG9nZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2Vycm9yJztcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9pdGVtLWZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9pdGVtLWhlbHBlcic7XG5leHBvcnQgKiBmcm9tICcuL21hcC10eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL3BpcGVzJztcbmV4cG9ydCAqIGZyb20gJy4vcmVzb2x2ZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vc2VhcmNoJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vdHJhY2tpbmcuZmFjdG9yeSc7XG4iXX0=