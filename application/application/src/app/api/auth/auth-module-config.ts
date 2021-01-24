import { OAuthModuleConfig } from 'angular-oauth2-oidc';
import { api } from 'src/app/app.component';

//thx to https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards
export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: [api.short],
    sendAccessToken: true,
  }
};
