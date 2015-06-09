module Growthbeat {
    export class Error {

        private message:string;
        private code:number;

        constructor(data:any) {
            if (data == undefined)
                return;
            data = JSON.parse(data);
            this.setCode(data.code);
            this.setMessage(data.message);
        }

        public getMessage():string {
            return this.message;
        }

        public setMessage(message:string) {
            return this.message = message;
        }

        public getCode():number {
            return this.code;
        }

        public setCode(code:number) {
            return this.code = code;
        }

    }
}
