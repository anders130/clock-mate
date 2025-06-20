import { INTERNAL_ERROR_MSGS } from '../constants';
import Result from './employeeData_Result';

export default class EmployeeData_Data {
    public constructor(public results: Result[]) {}

    public static fromObject(obj: object): EmployeeData_Data {
        if (!('results' in obj) || !Array.isArray(obj.results)) {
            throw new Error(INTERNAL_ERROR_MSGS.UNABLE_TO_PARSE_OBJ);
        }
        return new EmployeeData_Data(
            obj.results.map((result: object) => Result.fromObject(result)),
        );
    }

    public toObject() {
        return {
            results: this.results.map((result) => result.toObject()),
        };
    }
}
