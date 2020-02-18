import { repeatUntil } from "./utils/request-utils";
import { AppiumElement, Vector2d } from "./AppiumElement";
import { ByBuilder } from "./By";
import { ActionsStack } from "./ActionStack";

export class SyncElement extends AppiumElement{
    
    protected actionsStack: ActionsStack;

    constructor(client: WebDriver.Client, actionStack: ActionsStack, IDs: string[] = []){
        super(client, IDs);
    }

    get(locator: ByBuilder): AppiumElement {
        throw new Error("Method not implemented.");
    }    
    getElements(): AppiumElement[] {
        return this.IDs.map(id => new SyncElement(this.client, this.actionsStack, [id]))
    }
    click(): AppiumElement {
        throw new Error("Method not implemented.");
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