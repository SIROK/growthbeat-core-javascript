module Growthbeat {

  export class Uuid implements Growthbeat.Options {
    cookieDuration = 7 * 24 * 60 * 60 * 1000;
    jsonpUtils = new Growthbeat.JsonpUtils();
    cookieUtils = new Growthbeat.CookieUtils();

    constructor(callback:string) {
      var uuid = this.cookieUtils.get('growthbeat.uuid');
      if(uuid === 'undefined' || uuid == null) {
        this.jsonpUtils.startLoader('/1/users/uuid?jsonpCallback=' + callback, callback, (res:any)=> {
          this.cookieUtils.set('growthbeat.uuid', res.uuid, this.cookieDuration);
        });

      }
    }

  }
}
