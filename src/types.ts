/* Import all gloabl angular refs here */
/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular/jqlite.d.ts" />
/// <reference path="../node_modules/@types/angular-resource/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-bootstrap/index.d.ts" />
/// <reference path="../node_modules/@types/angular-route/index.d.ts" />


type GeoPlatform = {
  // General
  env?: string
  ENV?: string
  NODE_ENV?: string

  // Links
  portalUrl: string
  ualUrl?: string

  // Auth Settings
  AUTH_TYPE?: 'grant' | 'token'
  IDP_BASE_URL?: string
  APP_ID?: boolean
  ALLOWIFRAMELOGIN?: boolean
  FORCE_LOGIN?: boolean
  CALLBACK?: string
  LOGIN_URL?: string
  LOGOUT_URL?: string
  ALLOW_DEV_EDITS?: boolean
}

// Declare assumed globals
declare const GeoPlatform: GeoPlatform;
declare const jQuery: JQLite

type orgGroupArray = [{_id: string, name: string}]

type JWT = {
  sub: string
  name: string
  email: string
  username: string
  roles: string
  groups: orgGroupArray
  orgs: orgGroupArray
  scope: [string]
  iss: string
  aud: string
  nonce: string
  iat: number
  exp: number
  implicit?: boolean
}


// ============== AngularJS augments ==========

interface IInjectorService {
  get<T>(name: string, caller?: string): T;
}
