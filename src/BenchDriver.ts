import Webdriver from 'webdriver';
import { ByBuilderResult, ByBuilder } from './By';
import { repeatUntil } from './utils/request-utils';
import { SyncElement } from './SyncElement';

export interface FindElementSuccessResponse{
    ELEMENT: string;
    [key: string]: string;
}

export class BenchDriver{
    protected _client!: WebDriver.Client;

    constructor(protected _options: WebDriver.Options){
        
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
        const elementIdsPromise: Promise<string[]> = repeatUntil<FindElementSuccessResponse[]>({
            requestFunction: () => {
                console.warn('PING!')
                return this._client.findElements(
                    by.options.field,
                    by.options.value
                )
            },
            responseHandler: ((response: FindElementSuccessResponse[]) => {
                    return response.length > 0
                        && !response.map(elem => Boolean(elem.ELEMENT))
                        .includes(false)
                }
            ),
            timeout: by.options.timeout,
            tryCount: by.options.tryCount
        }).then(result => {
            return result.map(element => element.ELEMENT);
        }).catch(err => {
            throw new Error(`Can't find any element with using "${by.options.field}" with value "${by.options.value}"!`);
        });

        const result = new SyncElement(this.client, await elementIdsPromise);

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