var Growthbeat;(function(global, exports){exports.ajax = function (params, callback) {
  if (typeof params == 'string') params = {url: params}
  var headers = params.headers || {}
    , body = params.body
    , method = params.method || (body ? 'POST' : 'GET')
    , withCredentials = params.withCredentials || false

  var req = getRequest()

  // has no effect in IE
  // has no effect for same-origin requests
  // has no effect in CORS if user has disabled 3rd party cookies

  req.onreadystatechange = function () {
    if (req.readyState == 4)
      callback(req.status, req.responseText, req)
  }

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')
    setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
  }

  req.open(method, params.url, true)
  req.withCredentials = withCredentials

  for (var field in headers)
    req.setRequestHeader(field, headers[field])

  req.send(body)
}

function getRequest() {
  if (global.XMLHttpRequest)
    return new global.XMLHttpRequest;
  else
    try { return new global.ActiveXObject("MSXML2.XMLHTTP.3.0"); } catch(e) {}
  throw new Error('no xmlhttp request able to be created')
}

function setDefault(obj, key, value) {
  obj[key] = obj[key] || value
}
Growthbeat.nanoajax=exports;}(window, Growthbeat || (Growthbeat = {})));
var Growthbeat;
(function (Growthbeat) {
    var GrowthbeatCore = (function () {
        function GrowthbeatCore() {
            this.httpClient = new Growthbeat.HttpClient(GrowthbeatCore.DEFAULT_BASE_URL);
            // TODO this HttpClient only use UUID cookie
            //private static GBT_IO_BASE_URL:string = "https://gbt.io/growthbeat/";
            //private gbtIOHttpClient:HttpClient = new HttpClient(GrowthbeatCore.GBT_IO_BASE_URL);
            this.applicationId = null;
            this.credentialId = null;
            this.initialized = false;
            this.client = null;
        }
        GrowthbeatCore.getInstance = function () {
            return this.instance;
        };
        GrowthbeatCore.prototype.initialize = function (applicationId, credentialId) {
            var _this = this;
            if (!this.initialized)
                return;
            this.initialized = true;
            this.applicationId = applicationId;
            this.credentialId = credentialId;
            // TODO intentHandler
            // TODO How handle UUID cookie. It have to access gbt.io domain
            // TODO client.load
            // TODO if not exist Client remove preference data
            Growthbeat.Client.create(this.applicationId, this.credentialId, function (client) {
                Growthbeat.Client.save(client);
                _this.client = client;
            }, function (error) {
                // TODO Logger.error
            });
        };
        // TODO How perpetuate preference data.
        GrowthbeatCore.prototype.getHttpClient = function () {
            return this.httpClient;
        };
        GrowthbeatCore.DEFAULT_BASE_URL = "http://api.growthbeat.local:8081/";
        GrowthbeatCore.instance = new GrowthbeatCore();
        return GrowthbeatCore;
    })();
    Growthbeat.GrowthbeatCore = GrowthbeatCore;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var HttpClient = (function () {
        function HttpClient(baseUrl) {
            this.baseUrl = baseUrl;
        }
        HttpClient.prototype.get = function (requestType, path, params, success, failure) {
            switch (requestType) {
                case Growthbeat.HttpRequestType.normal:
                    this.requestOwnDomain(path, 'GET', params, success, failure);
                    break;
                case Growthbeat.HttpRequestType.cors:
                    this.requestByCors(path, 'GET', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }
        };
        HttpClient.prototype.post = function (requestType, path, params, success, failure) {
            switch (requestType) {
                case Growthbeat.HttpRequestType.normal:
                    this.requestOwnDomain(path, 'POST', params, success, failure);
                    break;
                case Growthbeat.HttpRequestType.cors:
                    this.requestByCors(path, 'POST', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }
        };
        HttpClient.prototype.put = function (requestType, path, params, success, failure) {
            switch (requestType) {
                case Growthbeat.HttpRequestType.normal:
                    this.requestOwnDomain(path, 'PUT', params, success, failure);
                    break;
                case Growthbeat.HttpRequestType.cors:
                    this.requestByCors(path, 'PUT', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }
        };
        HttpClient.prototype.delete = function (requestType, path, params, success, failure) {
            switch (requestType) {
                case Growthbeat.HttpRequestType.normal:
                    this.requestOwnDomain(path, 'DELETE', params, success, failure);
                    break;
                case Growthbeat.HttpRequestType.cors:
                    this.requestByCors(path, 'DELETE', params, success, failure);
                    break;
                default:
                    // TODO error
                    break;
            }
        };
        HttpClient.prototype.jsonPRequest = function (callback, path, params, success, failure) {
            var script = document.createElement('script');
            params.callback = HttpClient.JSONP_CALLBACK_PREFIX + callback;
            script.src = this.baseUrl + path + Growthbeat.HttpUtils.serializeObjectForURI(params);
            document.head.appendChild(script);
            window[HttpClient.JSONP_CALLBACK_PREFIX + callback] = function (responseText) {
                success(responseText);
            };
        };
        HttpClient.prototype.requestOwnDomain = function (path, method, params, success, failure) {
            var headers = {
                Accept: HttpClient.APPLICATION_JSON,
                'Content-Type': HttpClient.APPLICATION_FORM_URLENCODED
            };
            this.request(path, method, headers, params, false, success, failure);
        };
        HttpClient.prototype.requestByCors = function (path, method, params, success, failure) {
            var headers = {};
            this.request(path, method, headers, params, true, success, failure);
        };
        HttpClient.prototype.request = function (path, method, headers, params, withCredentials, success, failure) {
            var body = '';
            if (method == 'GET')
                path = path + Growthbeat.HttpUtils.serializeObjectForURI(params);
            else
                body = body + Growthbeat.HttpUtils.serializeObjectForBody(params);
            Growthbeat.nanoajax.ajax({
                url: this.baseUrl + path,
                method: method,
                headers: Growthbeat.HttpUtils.serializeObjectForHeader(headers),
                body: body,
                withCredentials: true
            }, function (code, responseText) {
                if (code != 200)
                    failure(new Growthbeat.Error(responseText));
                success(responseText);
            });
        };
        HttpClient.JSONP_CALLBACK_PREFIX = 'Growthbeat.HttpClient.JsonPResponse.';
        HttpClient.APPLICATION_JSON = 'application/json';
        HttpClient.APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';
        return HttpClient;
    })();
    Growthbeat.HttpClient = HttpClient;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var Client = (function () {
        //private application:Application;
        function Client(data) {
            if (data == undefined)
                return;
            this.id = data.id;
            this.created = data.created;
        }
        Client.save = function (client) {
            // TODO perpetuate client data.
        };
        Client.load = function () {
            // TODO perpetuate client data.
        };
        Client.create = function (applicationId, credentialId, success, failure) {
            Growthbeat.GrowthbeatCore.getInstance().getHttpClient().jsonPRequest('createClient', '/1/client/create', {
                applicationId: applicationId,
                credentialId: credentialId
            }, function (responseText) {
                success(new Client(responseText));
            }, function (error) {
                failure(error);
            });
        };
        return Client;
    })();
    Growthbeat.Client = Client;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var Error = (function () {
        function Error(data) {
            if (data == undefined)
                return;
            data = JSON.parse(data);
            this.setCode(data.code);
            this.setMessage(data.message);
        }
        Error.prototype.getMessage = function () {
            return this.message;
        };
        Error.prototype.setMessage = function (message) {
            return this.message = message;
        };
        Error.prototype.getCode = function () {
            return this.code;
        };
        Error.prototype.setCode = function (code) {
            return this.code = code;
        };
        return Error;
    })();
    Growthbeat.Error = Error;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    (function (HttpRequestType) {
        HttpRequestType[HttpRequestType["normal"] = 0] = "normal";
        HttpRequestType[HttpRequestType["cors"] = 1] = "cors";
        HttpRequestType[HttpRequestType["jsonp"] = 2] = "jsonp";
    })(Growthbeat.HttpRequestType || (Growthbeat.HttpRequestType = {}));
    var HttpRequestType = Growthbeat.HttpRequestType;
    var HttpRequestTypeUtils = (function () {
        function HttpRequestTypeUtils() {
        }
        HttpRequestTypeUtils.valueOf = function (value) {
            switch (value) {
                case 'normal':
                    return HttpRequestType.normal;
                case 'cors':
                    return HttpRequestType.cors;
                default:
                    return undefined;
            }
        };
        HttpRequestTypeUtils.toString = function (value) {
            switch (value) {
                case HttpRequestType.normal:
                    return 'normal';
                case HttpRequestType.cors:
                    return 'cors';
                default:
                    return undefined;
            }
        };
        return HttpRequestTypeUtils;
    })();
    Growthbeat.HttpRequestTypeUtils = HttpRequestTypeUtils;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var Uuid = (function () {
        function Uuid() {
        }
        return Uuid;
    })();
    Growthbeat.Uuid = Uuid;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var CookieUtils = (function () {
        function CookieUtils() {
        }
        CookieUtils.prototype.get = function (name) {
            if (!document.cookie)
                return null;
            var cookies = document.cookie.split(';');
            for (var i in cookies) {
                var nameValuePair = cookies[i].split('=');
                if (nameValuePair[0].trim() !== name)
                    continue;
                return decodeURIComponent(nameValuePair[1]);
            }
        };
        CookieUtils.prototype.set = function (name, value, expiry) {
            var cookie = name + '=' + encodeURIComponent(value);
            cookie += '; path=/';
            cookie += '; expires=' + new Date(new Date().getTime() + expiry).toUTCString();
            document.cookie = cookie;
        };
        CookieUtils.prototype.delete = function (name) {
            document.cookie = name + '=; path=/; expires=' + new Date(0).toUTCString();
        };
        return CookieUtils;
    })();
    Growthbeat.CookieUtils = CookieUtils;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var DateUtils = (function () {
        function DateUtils() {
        }
        DateUtils.prototype.formatDate = function (date, format) {
            if (!format)
                format = 'YYYY-MM-DD hh:mm:ss.SSS';
            format = format.replace(/YYYY/g, date.getFullYear().toString());
            format = format.replace(/YY/g, (date.getFullYear() % 100).toString());
            format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
            format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
            format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
            format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
            format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
            if (format.match(/S/g)) {
                var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
                var length = format.match(/S/g).length;
                for (var i = 0; i < length; i++)
                    format = format.replace(/S/, milliSeconds.substring(i, i + 1));
            }
            return format;
        };
        return DateUtils;
    })();
    Growthbeat.DateUtils = DateUtils;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var DeviceUtils = (function () {
        function DeviceUtils() {
        }
        DeviceUtils.prototype.getUserAgent = function () {
            var userAgent = window.navigator.userAgent.toLowerCase();
            return userAgent;
        };
        return DeviceUtils;
    })();
    Growthbeat.DeviceUtils = DeviceUtils;
})(Growthbeat || (Growthbeat = {}));
var Growthbeat;
(function (Growthbeat) {
    var HttpUtils = (function () {
        function HttpUtils() {
        }
        HttpUtils.serializeObjectForURI = function (obj) {
            return '?' + Object.keys(obj).map(function (key) {
                return key + '=' + encodeURIComponent(obj[key]);
            }).join('&');
        };
        HttpUtils.serializeObjectForBody = function (obj) {
            return Object.keys(obj).map(function (key) {
                return key + '=' + encodeURIComponent(obj[key]);
            }).join('&');
        };
        HttpUtils.serializeObjectForHeader = function (obj) {
            return Object.keys(obj).map(function (key) {
                return key + ': ' + encodeURIComponent(obj[key]);
            }).join('\n');
        };
        return HttpUtils;
    })();
    Growthbeat.HttpUtils = HttpUtils;
})(Growthbeat || (Growthbeat = {}));
