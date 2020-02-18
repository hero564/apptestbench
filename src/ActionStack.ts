export class ActionsStack{
    protected last: Promise<any>;

    constructor(){
        this.last = new Promise(resolve => resolve())
    }

    addAction(action:() => void | Promise<void>): ActionsStack{
        const prev = this.last;

        this.last = new Promise(async res => {
            await prev;
            await action();
            res();
        })

        return this;
    }

    async resolve(): Promise<void>{
        await this.last;
    }
}