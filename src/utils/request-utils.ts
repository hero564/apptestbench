import { BunchConfig } from "../Config";

export async function repeatUntil<ReturnDataType>({
    requestFunction,
    responseHandler,
    timeout = BunchConfig.current.findElementTimeout,
    tryCount = BunchConfig.current.findElementTryCount
}: {
    requestFunction: () => any | Promise<ReturnDataType>,
    responseHandler: (response: any | Promise<ReturnDataType>) => boolean | PromiseLike<boolean>,
    timeout?: number,
    tryCount?: number
}): Promise<ReturnDataType>{
    return new Promise(async (resolve, reject) => {
        if(timeout <= 0 && tryCount <= 0){
            reject(`At least of "timeout" or "tryCount" arguments should be > 0`)
        }

        if(timeout){
            setTimeout(() => reject(`Rejected by ${timeout}ms timeout!`), timeout);
        }

        if(tryCount <= 0){
            tryCount = -1;
        }

        let response: any | ReturnDataType = null;

        for(let i = 0; i !== tryCount; i++){
            try{
                response = await requestFunction();
                if(await responseHandler(response)){
                    resolve(response);
                    return;
                }
            } catch (err) {
                reject(err);
            }
        }
        
        reject(response);
    })
   
}