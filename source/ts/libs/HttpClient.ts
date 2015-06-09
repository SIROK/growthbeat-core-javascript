module Growthbeat {

    export class HttpClient {

        private static APPLICATION_JSON:string = 'application/json';
        private static APPLICATION_FORM_URLENCODED:string = 'application/x-www-form-urlencoded';

        private baseUrl:string;

        constructor(baseUrl:string) {
            this.baseUrl = baseUrl;
        }

        public get(requestType:HttpRequestType, path:string, params:any, success:(responseText:string) => void, failure:(error:Error) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'GET', params, success, failure);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'GET', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        public post(requestType:HttpRequestType, path:string, params:any, success:(responseText:string) => void, failure:(error:Error) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'POST', params, success, failure);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'POST', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        public put(requestType:HttpRequestType, path:string, params:any, success:(responseText:string) => void, failure:(error:Error) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'PUT', params, success, failure);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'PUT', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        public delete(requestType:HttpRequestType, path:string, params:any, success:(responseText:string) => void, failure:(error:Error) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'DELETE', params, success, failure);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'DELETE', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        public jsonPRequest(callback:string, path:string, params:any, success:(responseText:string) => void, failure:(error:Error) => void):void {

            var script = document.createElement('script');
            params.callback = callback;

            script.src = this.baseUrl + path + HttpUtils.serializeObjectForURI(params);
            document.head.appendChild(script);

            window[callback] = (responseText:string) => {
                success(responseText);
            };

        }

        private requestOwnDomain(path:string, method:string, params:any, success:(responseText:string) => void, failure:(error:Error) => void):void {

            var headers = {
                Accept: HttpClient.APPLICATION_JSON,
                'Content-Type': HttpClient.APPLICATION_FORM_URLENCODED,
            };

            this.request(path, method, headers, params, false, success, failure);

        }

        private requestByCors(path:string, method:string, params:any, success:(responseText:string) => void, failure:(error:Error) => void):void {

            var headers = {
            };

            this.request(path, method, headers, params, true, success, failure);

        }

        private request(path:string, method:string, headers:any, params:any, withCredentials:boolean, success:(responseText:string) => void, failure:(error:Error) => void):void {

            var body:string = '';
            if (method == 'GET')
                path = path + HttpUtils.serializeObjectForURI(params);
            else
                body = body + HttpUtils.serializeObjectForBody(params);

            nanoajax.ajax({
                url: this.baseUrl + path,
                method: method,
                headers: HttpUtils.serializeObjectForHeader(headers),
                body: body,
                withCredentials: true,
            }, (code:number, responseText:string) => {
                if (code != 200)
                    failure(new Error(responseText));
                success(responseText);
            });

        }

    }
}