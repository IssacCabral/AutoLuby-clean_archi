import { IValidation } from "@protocols/validation";

export class CreateVehicleValidator implements IValidation{
  validate(input: any): Error {
    const {color, brand, model, sale_price, cost_price, status, year, km} = input
    
    throw new Error("Method not implemented.");
  }

}