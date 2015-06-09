module Growthbeat {
  export class UrlUtils {

    public static serializeObject(obj:{}):string {
      return Object.keys(obj).map(key => {
        return key + '=' + encodeURIComponent(obj[key]);
      }).join('&');
    }

  }
}
