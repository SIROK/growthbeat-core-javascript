module Growthbeat {
    export class Client {

        private id:string;
        private created:Date;
        //private application:Application;

        constructor(data?:any) {

            if (data == undefined)
                return;

            this.id = data.id;
            this.created = data.created;

        }

        public static save(client:Client) {
            // TODO perpetuate client data.
        }

        public static load() {
            // TODO perpetuate client data.
        }

        public static create(applicationId:string, credentialId:string, success:(client:Client) => void, error:(errorModel:ErrorModel) => void) {
            GrowthbeatCore.getInstance().getHttpClient().jsonPRequest('createClient', '/1/client/create', {
                applicationId: applicationId,
                credentialId: credentialId
            }, (responseText:string) => {
                success(new Client(responseText));
            }, (errorModel:ErrorModel) => {
                error(errorModel);
            })
        }

    }

}
