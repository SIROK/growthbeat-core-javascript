module Growthbeat {
  export class DeviceUtils {

    getUserAgent():string {
      var userAgent = window.navigator.userAgent.toLowerCase();
      return userAgent;
    }

  }
}
