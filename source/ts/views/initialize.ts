/// <reference path="./client.ts" />
/// <reference path="./user.ts" />

module Growthbeat {
  export class Initialize {

    constructor(options:{applicationId:string, credentialId:string}) {
      new Growthbeat.Client(options, 'clientCallback');
      new Growthbeat.Uuid('uuidCallback');
    }

  }
}
