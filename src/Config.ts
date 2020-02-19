export interface Config{
    repeatUntilTimeout?: number;
    repeatUntilTryCount?: number;
    useElementsIdCaching?: true;
}

export class BunchConfig{
    static default: Config = {
        repeatUntilTimeout: 60000,
        repeatUntilTryCount: 0,
        useElementsIdCaching: true
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