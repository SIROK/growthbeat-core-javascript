module Growthbeat {
  const CLIENT_ID:string = 'clientId';
  export class Client {
    httpUtils = new Growthbeat.HttpUtils();
    cookieUtils = new Growthbeat.CookieUtils();
    constructor(options:{applicationId:string, credentialId:string}) {
      var clientId = this.cookieUtils.getValueByName(CLIENT_ID);
      if(clientId == '' || clientId == null) {
        this.httpUtils.load("/1/clients/cors", options, (res:string)=> {
          if(res == null) return;
          var response = JSON.parse(res);
          document.cookie = CLIENT_ID + '=' + response.id;
        });
      }
    }
  }
}
