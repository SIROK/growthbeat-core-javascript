module Growthbeat {
  export class JsonpUtils {

    startLoader(req:string, callback:string, success?:(data:any)=>void) {
      var script = document.createElement('script');
      script.src = 'http://api.growthbeat.local:8085' + req;
      window[callback] = (param:any)=> {
        if (param != null) success(param);
      }
      document.head.appendChild(script);
    }

  }
}
