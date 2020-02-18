import { repeatUntil } from "./utils/request-utils";
import { AppiumElement, Vector2d } from "./AppiumElement";
import { ByBuilder } from "./By";
import { ActionsStack } from "./ActionStack";

export class SyncElement extends AppiumElement{
    
    protected actionsStack: ActionsStack;

    constructor(client: WebDriver.Client, actionStack: ActionsStack, ID: string){
        super(client, ID);
    }

    get(locator: ByBuilder): AppiumElement {
        throw new Error("Method not implemented.");
    }    

    click(): AppiumElement {
        this.actionsStack.addAction(() => {
            return repeatUntil({
                requestFunction: () => this.client.elementClick(this.ID),
                responseHandler: response => !response.error
            })
        });
        return this;
    }
    sendKeys(): AppiumElement {
        throw new Error("Method not implemented.");
    }
    clear(): AppiumElement {
        throw new Error("Method not implemented.");
    }
    submit(): AppiumElement {
        throw new Error("Method not implemented.");
    }
    getText(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getName(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getAttribute(attribute: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    isSelected(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    isEnabled(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    isDisplayed(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    isSame(element: AppiumElement): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getLocation(): Promise<Vector2d> {
        throw new Error("Method not implemented.");
    }
    getSize(): Promise<Vector2d> {
        throw new Error("Method not implemented.");
    }
    getRect(): Promise<{ position: Vector2d; size: Vector2d; }> {
        throw new Error("Method not implemented.");
    }
    getCSSProperty(propertyName: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getActiveElement(): AppiumElement {
        throw new Error("Method not implemented.");
    }
    getLocationInView(): Promise<Vector2d> {
        throw new Error("Method not implemented.");
    }
}