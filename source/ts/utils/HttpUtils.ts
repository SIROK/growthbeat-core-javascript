module Growthbeat {
    export class HttpUtils {

        public static serializeObjectForURI(obj:{}):string {
            return '?' + Object.keys(obj).map(key => {
                return key + '=' + encodeURIComponent(obj[key]);
            }).join('&');
        }

        public static serializeObjectForBody(obj:{}):string {
            return Object.keys(obj).map(key => {
                return key + '=' + encodeURIComponent(obj[key]);
            }).join('&');
        }

        public static serializeObjectForHeader(obj:{}):string {
            return Object.keys(obj).map(key => {
                return key + ': ' + encodeURIComponent(obj[key]);
            }).join('\n');
        }

    }
}
