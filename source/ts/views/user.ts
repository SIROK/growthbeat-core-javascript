module Growthbeat {

  export class Uuid implements Growthbeat.Options {
    cookieDuration = 7 * 24 * 60 * 60 * 1000;
    httpUtils = new Growthbeat.HttpUtils();
    jsonpUtils = new Growthbeat.JsonpUtils();
    cookieUtils = new Growthbeat.CookieUtils();

    constructor(callback:string) {
      var uuid = this.cookieUtils.get('growthbeat.uuid');
      if(uuid == '' || uuid == null) {
        // jsonp
        this.jsonpUtils.startLoader('/1/users/uuid?callback=' + callback);

      }
    }

  }
}
