module Growthbeat {
    export class HttpClient {

        private static APPLICATION_JSON:string = 'application/json';
        private static APPLICATION_FORM_URLENCODED:string = 'application/x-www-form-urlencoded';

        private baseUrl:string;

        constructor(baseUrl:string) {
            this.baseUrl = baseUrl;
        }

        public get(path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {
            this.request(path, 'GET', params, success, error);
        }

        public post(path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {
            this.request(path, 'POST', params, success, error);
        }

        public put(path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {
            this.request(path, 'PUT', params, success, error);
        }

        public delete(path:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void) {
            this.request(path, 'DELETE', params, success, error);
        }

        private request(path:string, method:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void):void {

            var body:string = '';
            if (method == 'GET')
                path = path + '?' + UrlUtils.serializeObject(params);
            else
                body = body + UrlUtils.serializeObject(params);

            var headers:{} = {
                Accept: HttpClient.APPLICATION_JSON,
                'Content-Type': HttpClient.APPLICATION_FORM_URLENCODED,
            };
            var headerText:string = Object.keys(headers).map(key => {
                return key + ': ' + encodeURIComponent(headers[key]);
            }).join('\n');

            nanoajax.ajax({
                url: this.baseUrl + path,
                method: method,
                headers: headerText,
                body: body,
                withCredentials: false,
            }, (code:number, responseText:string) => {
                if (code != 200)
                    error(new Growthbeat.ErrorModel(responseText));
                success(responseText);
            });

        }

        private requestByCors(path:string, method:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void):void {
            // TODO implements
        }

        private requestByJsonP(path:string, method:string, params:{}, success:(responseText:string) => void, error:(errorModel:ErrorModel) => void):void {
            // TODO implements
        }

    }
}