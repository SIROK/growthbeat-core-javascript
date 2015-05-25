/// <reference path="vender/nanoajax.d.ts" />

module Growthbeat {
  export class HttpUtils {
    post(url:string, params?:{}, success?:(res:any)=>void) {
      var param = JSON.parse(JSON.stringify(params));
      Growthbeat.nanoajax.ajax({
        url: 'http://api.growthbeat.local:8085' + url
         + '?applicationId=' + param.applicationId
         + '&credentialId=' + param.credentialId,
        withCredentials: true,
        method: 'POST'
      }, (code:number, response:any)=>{
        if( code !== 200 ){
          return;
        }
        success(response);
      });
    }

    get(url:string, success?:(res:any)=>void) {
      Growthbeat.nanoajax.ajax({
        url: 'http://api.growthbeat.local:8085' + url,
        withCredentials: true,
        method: 'GET'
      }, (code:number, response:any)=>{
        if( code !== 200 ){
          return;
        }
        success(response);
      });
    }

  }
}
