import { AuthenticationContext } from 'react-adal';
const adalConfig = {
 tenant: "saketanxt.onmicrosoft.com",
 clientId: "bbc4460d-1f59-4460-a033-75a201f05371",
 endpoints: {
   api: "https://saketanxt.onmicrosoft.com/bbc4460d-1f59-4460-a033-75a201f05371"
 },
 postLogoutRedirectUri: window.location.origin,
 redirectUri: "http://localhost:3000",
 cacheLocation: "string"
};

export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => {
 return authContext.getCachedToken(authContext.config.clientId);
};

export const logoutFromApp=()=>
{
  return authContext.logOut()
}
