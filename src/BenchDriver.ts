import Webdriver from 'webdriver';
import { ByBuilderResult, ByBuilder } from './By';
import { repeatUntil } from './utils/request-utils';
import { SyncElement } from './SyncElement';
import { ActionsStack } from './ActionStack';

export interface FindElementSuccessResponse{
    ELEMENT: string;
    [key: string]: string;
}

export class BenchDriver{
    protected _client!: WebDriver.Client;
    protected _actionsStack: ActionsStack;

    constructor(protected _options: WebDriver.Options){
        this._actionsStack = new ActionsStack();
    }

    get actions(): ActionsStack{
        return this._actionsStack;
    }
    
    async get(by: ByBuilder): Promise<SyncElement>{
        if(!by.options.field){
            throw new Error(
                `Invalid field property: ${by.options.field}!`
            );
        }
        if(!by.options.value){
            throw new Error(
                `Invalid value property: ${by.options.value}!`
            );
        }
        
        let elementId: FindElementSuccessResponse;
        try{
            const elementIdPromise = await repeatUntil<FindElementSuccessResponse>({
                requestFunction: () => {
                    return this._client.findElement(
                        by.options.field,
                        by.options.value
                    )
                },
                responseHandler: (response: FindElementSuccessResponse) => Boolean(response.ELEMENT),
                timeout: by.options.timeout,
                tryCount: by.options.tryCount
            });

            this.actions.addAction(async () => {
                await elementIdPromise
            });
            elementId = await elementIdPromise;
        } catch (err) {
            throw new Error(`Can't find any element with using "${by.options.field}" with value "${by.options.value}"!`);
        }

        const result = new SyncElement(this.client, this.actions, elementId.ELEMENT);

        return result;
    };

    async newSession(): Promise<void>{
        this._client = await Webdriver.newSession(this.options);
    }

    async deleteSession(): Promise<void>{
        await this._client.deleteSession();
    }

    get options(): WebDriver.Options{
        return this._options;
    }

    get client(): WebDriver.Client{
        return this._client;
    }
}