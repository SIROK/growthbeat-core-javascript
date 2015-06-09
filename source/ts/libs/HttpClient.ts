module Growthbeat {
    export class HttpClient {

        private static APPLICATION_JSON:string = 'application/json';
        private static APPLICATION_FORM_URLENCODED:string = 'application/x-www-form-urlencoded';

        private baseUrl:string;

        constructor(baseUrl:string) {
            this.baseUrl = baseUrl;
        }

        public get(requestType:HttpRequestType, path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'GET', params, success, error);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'GET', params, success, error);
                    break;
                case HttpRequestType.jsonp:
                    this.requestByJsonP(path, params, success, error);
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        public post(requestType:HttpRequestType, path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'POST', params, success, error);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'POST', params, success, error);
                    break;
                case HttpRequestType.jsonp:
                    // TODO error
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        public put(requestType:HttpRequestType, path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'PUT', params, success, error);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'PUT', params, success, error);
                    break;
                case HttpRequestType.jsonp:
                    // TODO error
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        public delete(requestType:HttpRequestType, path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {

            switch (requestType) {
                case HttpRequestType.normal:
                    this.requestOwnDomain(path, 'DELETE', params, success, error);
                    break;
                case HttpRequestType.cors:
                    this.requestByCors(path, 'DELETE', params, success, error);
                    break;
                case HttpRequestType.jsonp:
                    // TODO error
                    break;
                default:
                    // TODO error
                    break;
            }

        }

        private requestOwnDomain(path:string, method:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void):void {

            var headers:{} = {
                Accept: HttpClient.APPLICATION_JSON,
                'Content-Type': HttpClient.APPLICATION_FORM_URLENCODED,
            };

            this.request(path, method, headers, params, false, success, error);

        }

        private requestByCors(path:string, method:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void):void {

            var headers:{} = {
            };

            this.request(path, method, headers, params, true, success, error);

        }

        private requestByJsonP(path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void):void {

            var script = document.createElement('script');

            // FIXME callback fixation
            script.src = this.baseUrl + path + HttpUtils.serializeObjectForURI(params);
            document.head.appendChild(script);

            window['Growthbeat.HttpClient.JsonPResponse'] = (responseText:string) => {
                success(responseText);
            };

        }

        private request(path:string, method:string, headers:{}, params:{}, withCredentials:boolean, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void):void {

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
                    error(new Growthbeat.ErrorModel(responseText));
                success(responseText);
            });

        }

    }
}