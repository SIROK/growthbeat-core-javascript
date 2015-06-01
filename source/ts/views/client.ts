module Growthbeat {
  export class Client implements Growthbeat.Options {
    cookieDuration = 7 * 24 * 60 * 60 * 1000;
    jsonpUtils = new Growthbeat.JsonpUtils();
    cookieUtils = new Growthbeat.CookieUtils();
    urlUtils = new Growthbeat.UrlUtils();

    constructor(options:{applicationId:string, credentialId:string}, callback:string) {
      var clientId = this.cookieUtils.get('growthbeat.clientId');
      if(clientId == '' || clientId == null) {
        var params = this.urlUtils.serializeObject(options);
        this.jsonpUtils.startLoader('/1/clients/cors?' + params +' &callback=' + callback, callback, (res:any)=> {
          this.cookieUtils.set('growthbeat.clientId', res.id, this.cookieDuration);
        });
      }
    }

  }
}
