import { MissingParamError } from "@errors/missing-param-error";
import { IValidation } from "@protocols/validation";

export class CreateVehicleValidator implements IValidation{
  validate(input: any): Error | null{
    return null
  }

}