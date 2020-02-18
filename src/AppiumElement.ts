import { ByBuilder } from "./By";
import { FindElementSuccessResponse } from "./BenchDriver";
import { repeatUntil } from "./utils/request-utils";

export interface Vector2d{
    x: number;
    y: number;
}

export abstract class AppiumElement {
    
    protected _client: WebDriver.Client;

    protected _ID: string;

    constructor(client: WebDriver.Client, ID?: string){
        this._client = client;
        this._ID = ID;
    }

    protected async findElements(using: string, value: string): Promise<string[]>{
        let elementsResponse: FindElementSuccessResponse[];
        try{
            elementsResponse = await repeatUntil<FindElementSuccessResponse[]>({
                requestFunction: () => {
                    return this.client.findElements(using, value);
                },
                responseHandler: (response: FindElementSuccessResponse[]) => {
                    const ids = response.map(singleRes => singleRes.ELEMENT);
                    return !ids.includes(undefined) && ids.length > 0;
                }
            });
        } catch (err) {
            console.error(err);
            throw new Error(`Unable to locale element using "${using}" with value "${value}"`);
        }
        return elementsResponse.map(element => element.ELEMENT);
    }

    get client(): WebDriver.Client {
        return this._client;
    }

    get ID(): string{
        return this._ID;
    }

    abstract get(locator: ByBuilder): AppiumElement;

    abstract click(): AppiumElement;

    abstract sendKeys(): AppiumElement;

    abstract clear(): AppiumElement;

    abstract submit(): AppiumElement;

    abstract getText(): Promise<string>;

    abstract getName(): Promise<string>;

    abstract getAttribute(attribute: string): Promise<string>;

    abstract isSelected(): Promise<boolean>;

    abstract isEnabled(): Promise<boolean>;

    abstract isDisplayed(): Promise<boolean>;

    abstract isSame(element: AppiumElement): Promise<boolean>;

    abstract getLocation(): Promise<Vector2d>;

    abstract getSize(): Promise<Vector2d>;

    abstract getRect(): Promise<{position: Vector2d; size: Vector2d}>;

    abstract getCSSProperty(propertyName: string): Promise<string>;

    abstract getActiveElement(): AppiumElement;

    abstract getLocationInView(): Promise<Vector2d>;

}