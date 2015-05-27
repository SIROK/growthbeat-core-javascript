module Growthbeat {
  declare function escape(arg?:any):any;
  declare function unescape(arg?:any):any;

  export class CookieUtils {

    get(name:string) {
      if (!document.cookie)
        return null;
      var cookies:Array<string> = document.cookie.split(';');
      for (var i in cookies) {
        var nameValuePair:Array<string> = cookies[i].split('=');
        if (nameValuePair[0] !== name)
          continue;
        return decodeURIComponent(nameValuePair[1]);
      }
    }

    set(name:string, value:string, expiry:number):void {
      var cookie:string = name + '=' + encodeURIComponent(value);
      cookie += '; path=/'
      cookie += '; expires=' + new Date(new Date().getTime() + expiry).toUTCString();
      document.cookie = cookie;
    }

    delete(name:string):void {
      document.cookie = name + '=; path=/; expires=' + new Date(0).toUTCString();
    }

  }
}
