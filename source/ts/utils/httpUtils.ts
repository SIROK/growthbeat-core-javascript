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

    put(url:string, params?:{}, isCredential?:boolean,
      success?:(res:any)=>void, error?:(errorModel:Growthbeat.ErrorModel)=>void) {
      Growthbeat.nanoajax.ajax({
        url: 'http://api.growthbeat.local:8085' + url + '?' + this.urlUtils.serializeObject(params),
        withCredentials: isCredential || false,
        method: 'PUT'
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

    delete(url:string, params?:{}, isCredential?:boolean,
      success?:(res:any)=>void, error?:(errorModel:Growthbeat.ErrorModel)=>void) {
      Growthbeat.nanoajax.ajax({
        url: 'http://api.growthbeat.local:8085' + url + '?' + this.urlUtils.serializeObject(params),
        withCredentials: isCredential || false,
        method: 'DELETE'
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
