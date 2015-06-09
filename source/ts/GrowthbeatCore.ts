/// <reference path="./libs/HttpClient.ts" />

module Growthbeat {
    export class GrowthbeatCore {

        // TODO Default Domain change gbt.io
        private static DEFAULT_BASE_URL:string = "https://api.growthbeat.com/";
        private httpClient:HttpClient = new HttpClient(GrowthbeatCore.DEFAULT_BASE_URL);

        private applicationId:string = null;
        private credentialId:string = null;

        private initialized:boolean = false;
        private client:Client = null;

        private static instance = new GrowthbeatCore();

        public static getInstance():GrowthbeatCore {
            return this.instance;
        }

        constructor() {
        }

        public initialize(applicationId:string, credentialId:string):void {

            if (this.initialized)
                return;

            this.initialized = true;

            this.applicationId = applicationId;
            this.credentialId = credentialId;

            // TODO intentHandler

            // TODO How handle UUID cookie. It have to access gbt.io domain

            // TODO client.load

            // TODO if not exist Client remove preference data

            Client.create(this.applicationId, this.credentialId, (client:Client) => {
                Client.save(client);
                this.client = client;
            }, (error:Error) => {
                // TODO Logger.error
            })

        }

        // TODO How perpetuate preference data.

        public getHttpClient():HttpClient {
            return this.httpClient;
        }

    }
}