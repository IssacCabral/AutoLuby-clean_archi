import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";
import { badRequest, serverError } from "@helpers/http-helper";
import { MissingParamError } from "@errors/missing-param-error";
import { ICreateVehicle } from "@domain/usecases/create-vehicle";

export class CreateVehicleController implements IController {
  constructor(private readonly createVehicle: ICreateVehicle) {}

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

      // for(let i = 0; i < requiredFields.length; i++){
      //   if (httpRequest.body[requiredFields[i]] == undefined) {
      //     return badRequest(new MissingParamError(requiredFields[i]));
      //   }
      // }

      for(const field of requiredFields){
        if (httpRequest.body[field] == undefined) {
          console.log(field)
          return badRequest(new MissingParamError(field));
        }
      }
      return null
    } catch (error) {
      return serverError(error);
    }
  }
}
