/// <reference path="../vender/nanoajax.d.ts" />

module Growthbeat {
  export class HttpUtils {
    urlUtils = new Growthbeat.UrlUtils();

    get(url:string, isCredential?:boolean,
      success?:(res:any)=>void, error?:(errorModel:Growthbeat.ErrorModel)=>void) {
      Growthbeat.nanoajax.ajax({
        url: 'http://api.growthbeat.local:8085' + url,
        withCredentials: isCredential || false,
        method: 'GET'
      }, (code:number, response:any)=>{
        if( code !== 200 ){
          if (code === 0) {
              return null;
          }
          error(new Growthbeat.ErrorModel(response));
        }
        success(response);
      });
    }

    post(url:string, params?:{}, isCredential?:boolean,
      success?:(res:any)=>void, error?:(errorModel:Growthbeat.ErrorModel)=>void) {
      Growthbeat.nanoajax.ajax({
        url: 'http://api.growthbeat.local:8085' + url + '?' + this.urlUtils.serializeObject(params),
        data: JSON.stringify(params),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        withCredentials: isCredential || false,
        method: 'POST'
      }, (code:number, response:any)=>{
        if( code !== 200 ){
          if (code === 0) {
              return null;
          }
          error(new Growthbeat.ErrorModel(response));
        }
        success(response);
      });
    }

  }
}
