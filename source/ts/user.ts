module Growthbeat {
  export class Uuid {
    httpUtils = new Growthbeat.HttpUtils();
    cookieUtils = new Growthbeat.CookieUtils();
    constructor() {
      var uuid = this.cookieUtils.getValueByName('growthbeat.uuid');
      if(uuid == '' || uuid == null) {
        this.httpUtils.get('/1/users/uuid', (res:string)=> {
          if(res == null) return;
          document.cookie = 'growthbeat.uuid=' + res;
        });
      }
    }
  }
}
