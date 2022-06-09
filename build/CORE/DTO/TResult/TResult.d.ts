export declare class TResult<T> {
    Messages?: string[];
    Result?: T;
    Success?: Boolean;
    CreateTResult<T>(data: T, errors: string[]): TResult<T>;
}
