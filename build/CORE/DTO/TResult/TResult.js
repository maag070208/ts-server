"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TResult = void 0;
class TResult {
    CreateTResult(data, errors) {
        const result = new TResult();
        console.log(errors);
        const bool = errors.length == 0;
        result.Messages = errors;
        result.Result = data;
        result.Success = bool;
        return result;
    }
}
exports.TResult = TResult;
//# sourceMappingURL=TResult.js.map