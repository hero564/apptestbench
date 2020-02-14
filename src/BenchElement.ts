import { repeatUntil } from "./utils/request-utils";

export class BenchElements{
    protected _elementsIdList: Set<string>;

    constructor(
        protected _client: WebDriver.Client,
        elementIds: string[] = []
    ){
        this._elementsIdList = new Set<string>(elementIds);
    }

    get(elementId: string): BenchElements{
        if(this.getIDs().includes(elementId)){
            return new BenchElements(this._client, [elementId]);
        } else {
            throw new Error(`Can't find element with id {${elementId}}`);
        }
    }

    getIDs(): string[] {
        const result: string[] = [];
        this._elementsIdList.forEach(id => result.push(id));
        return result;
    }

    getID(): string{
        return this.getIDs()[0];
    }

    getElements(): BenchElements[] {
        return this.getIDs().map(id => this.get(id));
    }

    get length(): number{
        return this._elementsIdList.size;
    }

    forEach(
        callbackfn: (element: BenchElements, elementId: string, elements: BenchElements) => void,
        thisArg?: any
    ): void{
        return this.getElements().forEach(((element) => {
            callbackfn(element, element.getID(), this);
        }));
    };

    async syncForEach(
        callbackfn: (element: BenchElements, elementId: string, elements: BenchElements) => void | Promise<void>
    ): Promise<void>{
        for(const element of this.getElements()){
            await callbackfn(element, element.getID(), this);
        }
    }

    click(): Promise<void[]>{
        const clickPromises = this.getIDs().map(async (id) => {
            await repeatUntil({
                requestFunction: () => {
                    return this._client.elementClick(id);
                },
                responseHandler: (response) => {
                    return !response;
                }
            });
        })

        return Promise.all(clickPromises);
    }
    
}