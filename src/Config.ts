export interface Config{
    findElementTimeout?: number;
    findElementTryCount?: number;
}

export class BunchConfig{
    static default: Config = {
        findElementTimeout: 60000,
        findElementTryCount: 0
    }

    static current: Config = BunchConfig.default;

    static set(config: Config): void{
        BunchConfig.current = {
            ...BunchConfig.current,
            ...config
        }
    }

    static reset(): void{
        BunchConfig.current = BunchConfig.default;
    }
}