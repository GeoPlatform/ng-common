/* Import all gloabl angular refs here */
/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular/jqlite.d.ts" />
/// <reference path="../node_modules/@types/angular-resource/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-bootstrap/index.d.ts" />
/// <reference path="../node_modules/@types/angular-route/index.d.ts" />

declare const jQuery: JQLite

// ============== AngularJS augments ==========

interface IInjectorService {
    get<T>(name: string, caller?: string): T;
  }
