import { BunchConfig } from "./Config";

export interface ByBuilderResult{
    field?: string;
    value?: string;
    timeout?: number;
    tryCount?: number;
    cached?: boolean;
}

export class ByBuilder{
    protected _options: ByBuilderResult;

    constructor(options: ByBuilderResult = {}){
        this._options = options
    }

    fieldValue(field: string, value: string) {
        return new ByBuilder({
            ...this.options,
            field,
            value
        })
    }

    id(id: string): ByBuilder {
        return this.fieldValue(
            'id',
            id
        )
    }

    wait(timeout: number): ByBuilder {
        if(timeout <= 0){
            return this.disableTimeout();
        }

        return new ByBuilder({
            ...this.options,
            timeout
        })
    }

    disableTimeout(): ByBuilder {
        return new ByBuilder({
            ...this.options,
            timeout: 0
        })
    }

    retry(count: number) {
        if(count <= 0){
            return this.infinitiveRetry();
        }

        return new ByBuilder({
            ...this.options,
            tryCount: count
        })
    }

    noRetry(): ByBuilder {
        return new ByBuilder({
            ...this.options,
            tryCount: 1
        })
    }

    infinitiveRetry(): ByBuilder {
        return new ByBuilder({
            ...this.options,
            tryCount: 0
        })
    }

    cached(): ByBuilder {
        return new ByBuilder({
            ...this.options,
            cached: true
        })
    }
    
    noCached(): ByBuilder {
        return new ByBuilder({
            ...this.options,
            cached: false
        })
    }

    get options(): ByBuilderResult {
        return this._options;
    }
}

export const By = new ByBuilder({
    timeout: BunchConfig.default.repeatUntilTimeout,
    tryCount: BunchConfig.default.repeatUntilTryCount
});