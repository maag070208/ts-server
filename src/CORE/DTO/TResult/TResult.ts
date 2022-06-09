export class TResult<T> {
    public Messages?: string[];
    public Result?: T;
    public Success?: Boolean;

    public CreateTResult<T>(data: T, errors: string[]): TResult<T>{
        const result = new TResult<T>();
        console.log(errors);
        
        const bool = errors.length == 0

        result.Messages=errors;
        result.Result=data;
        result.Success = bool;

        return result;
    }
}