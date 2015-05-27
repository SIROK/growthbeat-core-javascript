module Growthbeat {

  export class Uuid implements Growthbeat.Options {
    cookieDuration = 7 * 24 * 60 * 60 * 1000;
    httpUtils = new Growthbeat.HttpUtils();
    cookieUtils = new Growthbeat.CookieUtils();

    constructor() {
      var uuid = this.cookieUtils.get('growthbeat.uuid');
      if(uuid == '' || uuid == null) {
        this.httpUtils.get('/1/users/uuid', true, (res:string)=> {
          if(res == null) return;
          this.cookieUtils.set('growthbeat.uuid', res, this.cookieDuration);
        }, (errorModel:Growthbeat.ErrorModel)=>{
          console.log(errorModel.getMessage);
        });
      }
    }

  }
}
