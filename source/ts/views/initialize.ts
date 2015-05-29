/// <reference path="./client.ts" />
/// <reference path="./user.ts" />

module Growthbeat {
  export class Initialize {

    constructor(options:{applicationId:string, credentialId:string}) {
      // new Growthbeat.Client(options);
      // new Growthbeat.Uuid((response)=> {
      //   console.log(response);
      // });
      new Growthbeat.Uuid('callback');
    }

  }
}
