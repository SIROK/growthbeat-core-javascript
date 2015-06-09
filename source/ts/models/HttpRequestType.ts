module Growthbeat {

    export enum HttpRequestType {
        normal, cors, jsonp
    }

    export class HttpRequestTypeUtils {

        public static valueOf(value:string):HttpRequestType {

            switch (value) {
                case 'normal':
                    return HttpRequestType.normal;
                case 'cors':
                    return HttpRequestType.cors;
                case 'jsonp':
                    return HttpRequestType.jsonp;
                default:
                    return undefined;
            }

        }

        public static toString(value:HttpRequestType):string {

            switch (value) {
                case HttpRequestType.normal:
                    return 'normal';
                case HttpRequestType.cors:
                    return 'cors';
                case HttpRequestType.jsonp:
                    return 'jsonp';
                default:
                    return undefined;
            }

        }

    }

}