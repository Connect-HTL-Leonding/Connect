import { AuthConfig } from 'angular-oauth2-oidc';
import { api } from 'src/app/app.component';


//thx to https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards
export const authConfig: AuthConfig = {
  issuer: api.ip + '/auth/realms/connect',
  redirectUri: window.location.origin + '/login',
  clientId: 'connect-client',
  //responseType: 'code',
  scope: 'roles profile web-origins',
  showDebugInformation: true,
  requireHttps: false,
  //responseType: 'code',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  //silentRefreshTimeout: 5000, // For faster testing
  //timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  nonceStateSeparator : 'semicolon' // Real semicolon gets mangled by IdentityServer's URI encoding
};
