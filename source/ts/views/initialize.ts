/// <reference path="./client.ts" />
/// <reference path="./user.ts" />

module Growthbeat {
  export class Initialize {

    constructor(options:{applicationId:string, credentialId:string}, callback:string) {
      new Growthbeat.Client(options, callback);
      new Growthbeat.Uuid(callback);
    }

  }
}
