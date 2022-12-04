import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";
import { badRequest, created, serverError } from "@helpers/http-helper";
import { MissingParamError } from "@errors/missing-param-error";
import { ICreateVehicle } from "@domain/usecases/create-vehicle";
import { IValidation } from "@protocols/validation";

export class CreateVehicleController implements IController {
  constructor(
    private readonly createVehicle: ICreateVehicle,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
        if (!Object.keys(httpRequest.body).includes(field)) {
          return badRequest(new MissingParamError(field));
        }
      }
      const error = this.validation.validate(httpRequest.body);
      if (error) {return badRequest(error)}
      
      const createVehicleResult = await this.createVehicle.create(httpRequest.body)
      if(createVehicleResult instanceof Error){
        return badRequest(createVehicleResult)
      }
      return created(createVehicleResult)
    } catch (error) {
      return serverError(error);
    }
  }
}
