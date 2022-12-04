import { MissingParamError } from "@errors/missing-param-error";
import { IValidation } from "@protocols/validation";

export class CreateVehicleValidator implements IValidation{
  validate(input: any): Error | null{
    const requiredFields = [
      "color",
      "model",
      "brand",
      "status",
      "year",
      "km",
      "chassis",
      "sale_price",
      "cost_price",
    ];
    for(const field of requiredFields){
      if (!Object.keys(input.body).includes(field)) {
        return new MissingParamError(field)
      }
    }
  }

}