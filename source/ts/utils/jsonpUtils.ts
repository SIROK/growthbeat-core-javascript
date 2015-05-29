module Growthbeat {
  export class JsonpUtils {

    startLoader(req:any, success?:(data:Function)=>void) {
      var script = document.createElement('script');
      script.src = 'http://api.growthbeat.local:8085' + req;
      document.head.appendChild(script);

    }

  }
}
