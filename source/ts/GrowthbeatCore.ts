module Growthbeat {
    export class GrowthbeatCore {

        public static DEFAULT_BASE_URL:string = "https://api.growthbeat.com/";

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

            if (!this.initialized)
                return;

            this.initialized = true;

            this.applicationId = applicationId;
            this.credentialId = credentialId;

            // TODO intentHandler

            // TODO client.load

        }

    }
}