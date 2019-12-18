
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
export * from './tracking.factory';
