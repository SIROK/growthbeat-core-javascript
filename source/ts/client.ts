module Growthbeat {
  export class Client {
    httpUtils = new Growthbeat.HttpUtils();
    cookieUtils = new Growthbeat.CookieUtils();
    constructor(options:{applicationId:string, credentialId:string}) {
      var clientId = this.cookieUtils.getValueByName('growthbeat.clientId');
      if(clientId == '' || clientId == null) {
        this.httpUtils.post("/1/clients/cors", options, (res:string)=> {
          if(res == null) return;
          var response = JSON.parse(res);
          document.cookie = 'growthbeat.clientId=' + response.id;
        });
      }
    }
  }
}
