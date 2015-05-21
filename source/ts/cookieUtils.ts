module Growthbeat {
  declare function escape(arg?:any):any;
  declare function unescape(arg?:any):any;

  export class CookieUtils {

    getValueByName(name:string) {

      var allCookie = document.cookie;
      if (allCookie == '') return '';
      var cookies = allCookie.split(';');
      for (var cookie in cookies) {
        if (cookies[cookie].match(name)) {
          var tests = cookies[cookie].split('=');
          return tests[1];
        }
        return;
      }
    }

  }
}
