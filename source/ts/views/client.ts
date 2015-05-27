module Growthbeat {
  export class Client implements Growthbeat.Options {
    cookieDuration = 7 * 24 * 60 * 60 * 1000;
    httpUtils = new Growthbeat.HttpUtils();
    cookieUtils = new Growthbeat.CookieUtils();

    constructor(options:{applicationId:string, credentialId:string}) {
      var clientId = this.cookieUtils.get('growthbeat.clientId');
      if(clientId == '' || clientId == null) {
        this.httpUtils.post("/1/clients/cors", options, true, (res:string)=> {
          if(res == null) return;
          var response = JSON.parse(res);
          this.cookieUtils.set('growthbeat.clientId', response.id, this.cookieDuration);
        }, (errorModel:Growthbeat.ErrorModel)=>{
          console.log(errorModel.getMessage());
        });
      }
    }

  }
}
