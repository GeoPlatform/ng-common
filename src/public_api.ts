
/*
    Version of the library exposed to consumers.
    Long-term this value should be auto-set to be whatever is set in package.json
 */
export const GeoPlatformCommonVersion = "1.0.0";

// import Polyfills from "./shared/polyfills";
// Polyfills();

export const DefaultSortOptions = [
    { value: "_score,desc",     label: "Relevance"  },
    { value: "modified,desc",   label: "Most Recently Modified"  },
    { value: "modified,asc",    label: "Least Recently Modified" },
    { value: "label,asc",       label: "Title [A-Z]" },
    { value: "label,desc",      label: "Title [Z-A]" },
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
export * from './module';
export * from './tracking.factory';
