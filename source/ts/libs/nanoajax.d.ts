declare module Growthbeat.nanoajax {
    export function ajax(params:AjaxParams, complete:(code:number, responseText:string) => void)

    export interface AjaxParams {
        url:string,
        method:string,
        body?:string,
        headers?:string,
        withCredentials?:boolean;
    }

}
