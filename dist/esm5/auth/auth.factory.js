import { ngGpoauthFactory } from '@geoplatform/oauth-ng/angular';
import { logger } from "../logger";
;
var AUTH_KEYS = [
    'AUTH_TYPE', 'IDP_BASE_URL', 'APP_BASE_URL', 'ALLOW_SSO_LOGIN',
    'APP_ID', 'ALLOW_IFRAME_LOGIN', 'FORCE_LOGIN', 'CALLBACK',
    'LOGIN_URL', 'LOGOUT_URL', 'ALLOW_DEV_EDITS'
];
var authService = null;
export function authServiceFactory(environment) {
    //once service has been built, keep using it
    if (authService)
        return authService;
    //
    //but the first time it's requested, it has to be built using env settings
    var authSettings = {};
    var gpGlobal = window.GeoPlatform;
    if (gpGlobal && gpGlobal.config && gpGlobal.config.auth) {
        //auth library settings made available through WP via 'GeoPlatform' global
        //https://geoplatform.atlassian.net/browse/DT-2307
        authSettings = gpGlobal.config.auth;
    }
    else {
        authSettings.APP_BASE_URL = environment.wpUrl || '';
        AUTH_KEYS.forEach(function (key) {
            var v = environment[key];
            if (typeof (v) !== 'undefined') {
                if (~key.indexOf('ALLOW') || ~key.indexOf('FORCE')) {
                    v = (v === true || v === 'true');
                }
                authSettings[key] = v;
            }
        });
    }
    logger.info("Configuring OAuth using: ");
    logger.info(authSettings);
    authService = ngGpoauthFactory(authSettings);
    return authService;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbImF1dGgvYXV0aC5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFnQmxDLENBQUM7QUFDRixJQUFNLFNBQVMsR0FBRztJQUNkLFdBQVcsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGlCQUFpQjtJQUM5RCxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLFVBQVU7SUFDekQsV0FBVyxFQUFFLFlBQVksRUFBRSxpQkFBaUI7Q0FDL0MsQ0FBQztBQUtGLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUM7QUFHckMsTUFBTSxVQUFVLGtCQUFrQixDQUFFLFdBQWlCO0lBRWpELDRDQUE0QztJQUM1QyxJQUFHLFdBQVc7UUFBRSxPQUFPLFdBQVcsQ0FBQztJQUVuQyxFQUFFO0lBQ0YsMEVBQTBFO0lBQzFFLElBQUksWUFBWSxHQUFnQixFQUFFLENBQUM7SUFFbkMsSUFBSSxRQUFRLEdBQVMsTUFBTyxDQUFDLFdBQVcsQ0FBQztJQUN6QyxJQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ3BELDBFQUEwRTtRQUMxRSxrREFBa0Q7UUFDbEQsWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ3ZDO1NBQU07UUFDSCxZQUFZLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BELFNBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQSxHQUFHO1lBQ2xCLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFHLE9BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQzFCLElBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDL0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUM7aUJBQ3BDO2dCQUNELFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFMUIsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdDLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmdHcG9hdXRoRmFjdG9yeSwgQXV0aFNlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vb2F1dGgtbmcvYW5ndWxhcic7XG5cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuLi9sb2dnZXJcIjtcblxuXG4vL3Nob3VsZCBiZSBleHBvcnRlZCBieSBncC1uZ29hdXRoIGJ1dCBpc24ndCBzbyB3ZSBhcmUgZGVjbGFyaW5nIGl0IGhlcmUuLi5cbmludGVyZmFjZSBBdXRoQ29uZmlnIHtcbiAgICBBVVRIX1RZUEU/OiAnZ3JhbnQnIHwgJ3Rva2VuJ1xuICAgIElEUF9CQVNFX1VSTD86IHN0cmluZ1xuICAgIEFQUF9CQVNFX1VSTD86IHN0cmluZ1xuICAgIEFMTE9XX1NTT19MT0dJTj86IGJvb2xlYW5cbiAgICBBUFBfSUQ/OiBib29sZWFuXG4gICAgQUxMT1dfSUZSQU1FX0xPR0lOPzogYm9vbGVhblxuICAgIEZPUkNFX0xPR0lOPzogYm9vbGVhblxuICAgIENBTExCQUNLPzogc3RyaW5nXG4gICAgTE9HSU5fVVJMPzogc3RyaW5nXG4gICAgTE9HT1VUX1VSTD86IHN0cmluZ1xuICAgIEFMTE9XX0RFVl9FRElUUz86IGJvb2xlYW5cbn07XG5jb25zdCBBVVRIX0tFWVMgPSBbXG4gICAgJ0FVVEhfVFlQRScsICdJRFBfQkFTRV9VUkwnLCAnQVBQX0JBU0VfVVJMJywgJ0FMTE9XX1NTT19MT0dJTicsXG4gICAgJ0FQUF9JRCcsICdBTExPV19JRlJBTUVfTE9HSU4nLCAnRk9SQ0VfTE9HSU4nLCAnQ0FMTEJBQ0snLFxuICAgICdMT0dJTl9VUkwnLCAnTE9HT1VUX1VSTCcsICdBTExPV19ERVZfRURJVFMnXG5dO1xuXG5cblxuXG52YXIgYXV0aFNlcnZpY2UgOiBBdXRoU2VydmljZSA9IG51bGw7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhTZXJ2aWNlRmFjdG9yeSggZW52aXJvbm1lbnQgOiBhbnkgKSB7XG5cbiAgICAvL29uY2Ugc2VydmljZSBoYXMgYmVlbiBidWlsdCwga2VlcCB1c2luZyBpdFxuICAgIGlmKGF1dGhTZXJ2aWNlKSByZXR1cm4gYXV0aFNlcnZpY2U7XG5cbiAgICAvL1xuICAgIC8vYnV0IHRoZSBmaXJzdCB0aW1lIGl0J3MgcmVxdWVzdGVkLCBpdCBoYXMgdG8gYmUgYnVpbHQgdXNpbmcgZW52IHNldHRpbmdzXG4gICAgbGV0IGF1dGhTZXR0aW5ncyA6IEF1dGhDb25maWcgPSB7fTtcblxuICAgIGxldCBncEdsb2JhbCA9ICg8YW55PndpbmRvdykuR2VvUGxhdGZvcm07XG4gICAgaWYoZ3BHbG9iYWwgJiYgZ3BHbG9iYWwuY29uZmlnICYmIGdwR2xvYmFsLmNvbmZpZy5hdXRoKSB7XG4gICAgICAgIC8vYXV0aCBsaWJyYXJ5IHNldHRpbmdzIG1hZGUgYXZhaWxhYmxlIHRocm91Z2ggV1AgdmlhICdHZW9QbGF0Zm9ybScgZ2xvYmFsXG4gICAgICAgIC8vaHR0cHM6Ly9nZW9wbGF0Zm9ybS5hdGxhc3NpYW4ubmV0L2Jyb3dzZS9EVC0yMzA3XG4gICAgICAgIGF1dGhTZXR0aW5ncyA9IGdwR2xvYmFsLmNvbmZpZy5hdXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF1dGhTZXR0aW5ncy5BUFBfQkFTRV9VUkwgPSBlbnZpcm9ubWVudC53cFVybCB8fCAnJztcbiAgICAgICAgQVVUSF9LRVlTLmZvckVhY2goIGtleSA9PiB7XG4gICAgICAgICAgICBsZXQgdiA9IGVudmlyb25tZW50W2tleV07XG4gICAgICAgICAgICBpZih0eXBlb2YodikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYofmtleS5pbmRleE9mKCdBTExPVycpIHx8IH5rZXkuaW5kZXhPZignRk9SQ0UnKSkge1xuICAgICAgICAgICAgICAgICAgICB2ID0gKHYgPT09IHRydWUgfHwgdiA9PT0gJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXV0aFNldHRpbmdzW2tleV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2dnZXIuaW5mbyhcIkNvbmZpZ3VyaW5nIE9BdXRoIHVzaW5nOiBcIik7XG4gICAgbG9nZ2VyLmluZm8oYXV0aFNldHRpbmdzKTtcblxuICAgIGF1dGhTZXJ2aWNlID0gbmdHcG9hdXRoRmFjdG9yeShhdXRoU2V0dGluZ3MpO1xuICAgIHJldHVybiBhdXRoU2VydmljZTtcbn07XG4iXX0=