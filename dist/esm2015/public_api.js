/*
    Version of the library exposed to consumers.
    Long-term this value should be auto-set to be whatever is set in package.json
 */
export const GeoPlatformCommonVersion = "1.0.0";
// import Polyfills from "./shared/polyfills";
// Polyfills();
export * from './auth';
export * from './dialogs';
export * from './directives';
export * from './components';
export * from './error.service';
export * from './error';
export * from './item-factory';
export * from './item-helper';
export * from './map-types';
export * from './pipes';
export * from './resolvers';
export * from './module';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJwdWJsaWNfYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLE9BQU8sQ0FBQztBQUVoRCw4Q0FBOEM7QUFDOUMsZUFBZTtBQUVmLGNBQWMsUUFBUSxDQUFDO0FBQ3ZCLGNBQWMsV0FBVyxDQUFDO0FBQzFCLGNBQWMsY0FBYyxDQUFDO0FBQzdCLGNBQWMsY0FBYyxDQUFDO0FBQzdCLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxTQUFTLENBQUM7QUFDeEIsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLGFBQWEsQ0FBQztBQUM1QixjQUFjLFNBQVMsQ0FBQztBQUN4QixjQUFjLGFBQWEsQ0FBQztBQUM1QixjQUFjLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLypcbiAgICBWZXJzaW9uIG9mIHRoZSBsaWJyYXJ5IGV4cG9zZWQgdG8gY29uc3VtZXJzLlxuICAgIExvbmctdGVybSB0aGlzIHZhbHVlIHNob3VsZCBiZSBhdXRvLXNldCB0byBiZSB3aGF0ZXZlciBpcyBzZXQgaW4gcGFja2FnZS5qc29uXG4gKi9cbmV4cG9ydCBjb25zdCBHZW9QbGF0Zm9ybUNvbW1vblZlcnNpb24gPSBcIjEuMC4wXCI7XG5cbi8vIGltcG9ydCBQb2x5ZmlsbHMgZnJvbSBcIi4vc2hhcmVkL3BvbHlmaWxsc1wiO1xuLy8gUG9seWZpbGxzKCk7XG5cbmV4cG9ydCAqIGZyb20gJy4vYXV0aCc7XG5leHBvcnQgKiBmcm9tICcuL2RpYWxvZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9kaXJlY3RpdmVzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL2Vycm9yLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9lcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL2l0ZW0tZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL2l0ZW0taGVscGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbWFwLXR5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vcGlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXNvbHZlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGUnO1xuIl19