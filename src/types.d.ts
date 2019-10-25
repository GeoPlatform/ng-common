// Common types:
type StringObj = {[x: string]: string}

// Types Created by and used in ng-common
declare module ngcommon {

  /**
   * Common configuration object used by ng-common.
   *
   * Its expected that this object will exist in the global scope where
   * ng-common is loaded and run.
   *
   * @type GeoPlatform
   */
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

    // RPM Settings
    loadRPM?: boolean,
    RPMVersion?: string
  }

  /**
   * JWT object returned from gpoauth server.
   *
   * @type JWT
   */
  type JWT = {
    sub: string
    name: string
    email: string
    username: string
    roles: string
    groups: [{_id: string, name: string}]
    orgs: [{_id: string, name: string}]
    scope: [string]
    iss: string
    aud: string
    nonce: string
    iat: number
    exp: number
    implicit?: boolean
  }

  type IDPRole = 'admin'
               | 'staff'
               | 'user'

  /**
   * @type userProfile
   */
  type UserProfile = {
    _id: string
    modificationDate: string
    creationDate: string
    username: string
    title: string
    firstName: string
    lastName: string
    middleName: string
    email: string
    appRole: IDPRole
    __v: number
    lastLogin: string
    resetHash: null
    resetExp: null
    appSettings: [object]
    auditLog: [undefined]
    lockoutCount: number
    lockedOut: Boolean
  }

  /**
   * Internal User object used by ng-common.
   * @type User
   */
  class User {
    id: string
    username: string
    name: string
    email: string
    org: string
    roles: string
    groups: [{_id: string, name: string}]
    exp: number
    toJSON(): Object
    clone(): User;
    compare(arg: User | Object): boolean
    isAuthorized(role: string): boolean
  }


  interface AuthService {
    // Authentication Actions
    /**
     * Redirects or displays login window the page to the login site
     */
    login(): void
    /**
     * Performs background logout and requests jwt revokation
     */
    logout(): void
    /**
     * Optional force redirect for non-public services
     */
    forceLogin(): void
    /**
     * Check function being used by some front end apps already.
     * (wrapper for getUser)
     *
     * @method check
     * @returns {User} - ng-common user object or null
     */
    check(): ng.IPromise<User>
    /**
     * Makes a call to a service hosting node-gpoauth to allow for a
     * token refresh on an expired token, or a token that has been
     * invalidated to be revoked.
     *
     * Note: Client as in hosting application:
     *    https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
     *
     * @method checkWithClient
     * @param {jwt} - encoded accessToken/JWT
     *
     * @return {Promise<jwt>} - promise resolving with a JWT
     */
    checkWithClient(originalJWT: string): ng.IPromise<string>

    // JWT and User methods
    /**
     * Get protected user profile
     */
    getOauthProfile(): ng.IPromise<UserProfile>
    /**
     * Get User object from the JWT.
     *
     * If no JWT is provided it will be looked for at the normal JWT
     * locations (cookie or URL queryString).
     *
     * @param {JWT} [jwt] - the JWT to extract user from.
     */
    getUserFromJWT(jwt: string): User
    /**
     * If the callback parameter is specified, this method
     * will return undefined. Otherwise, it returns the user (or null).
     *
     * Side Effects:
     *  - Will redirect users if no valid JWT was found
     *
     * @param callback optional function to invoke with the user
     * @return object representing current user
     */
    getUser(callback?: (user: User) => any): User | undefined
    /**
     * Promise version of get user.
     *
     * Below is a table of how this function handels this method with
     * differnt configurations.
     *  - FORCE_LOGIN : Horizontal
     *  - ALLOWIFRAMELOGIN : Vertical
     *
     *
     * getUserQ | T | F (FORCE_LOGIN)
     * -----------------------------
     * T        | 1 | 2
     * F        | 3 | 4
     * (ALLOWIFRAMELOGIN)
     *
     * Cases:
     * 1. Delay resolve function till user is logged in
     * 2. Return null (if user not authorized)
     * 3. Force the redirect
     * 4. Return null (if user not authorized)
     *
     * NOTE:
     * Case 1 above will cause this method's promise to be a long stall
     * until the user completes the login process. This should allow the
     * app to forgo a reload is it should have waited till the entire
     * time till the user was successfully logged in.
     *
     * @method getUserQ
     *
     * @returns {Promise<User>} User - the authenticated user
     */
    getUserQ(): ng.IPromise<ngcommon.User | null>
    /**
     * Makes a call to a service hosting node-gpoauth to allow for a
     * token refresh on an expired token, or a token that has been
     * invalidated to be revoked.
     *
     * Note: Client as in hosting application:
     *    https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
     *
     * @method checkWithClient
     * @param {jwt} - encoded accessToken/JWT
     *
     * @return {Promise<jwt>} - promise resolving with a JWT
     */
    checkWithClient(originalJWT: string): ng.IPromise<string>
    /**
     * Extract token from current URL
     *
     * @method getJWTFromUrl
     *
     * @return {String | undefined} - JWT Token (raw string)
     */
    getJWTFromUrl(): string
    /**
     * Load the JWT stored in cookie.
     *
     * @method getJWTfromCookie
     *
     * @return {JWT | undefined} An object wih the following format:
     */
    getJWTfromLocalStorage(): string
    /**
     * Attempt and pull JWT from the following locations (in order):
     *  - URL query parameter 'access_token' (returned from IDP)
     *  - Browser cookie (saved from previous request)
     *
     * @method getJWT
     *
     * @return {sting | undefined}
     */
    getJWT(): string
    /**
     * Is a token expired.
     *
     * @method isExpired
     * @param {JWT} jwt - A JWT
     *
     * @return {boolean}
     */
    isExpired(jwt: string): boolean
    /**
     * Is the JWT an implicit JWT?
     * @param jwt
     * @returns {boolean}
     */
    isImplicitJWT(jwt: string): boolean
    /**
     * Unsafe (signature not checked) unpacking of JWT.
     *
     * @param {string} token - Access Token (JWT)
     *
     * @return {Object} the parsed payload in the JWT
     */
    parseJwt(token: string): ngcommon.JWT
    /**
     * Simple front end validion to verify JWT is complete and not
     * expired.
     *
     * Note:
     *  Signature validation is the only truly save method. This is done
     *  automatically in the node-gpoauth module.
     */
    validateJwt(token: string): boolean

    getFromCookie(key: string): string
  }
}


// Declare globals created by (present due to) ng-common
declare const GeoPlatform: ngcommon.GeoPlatform;