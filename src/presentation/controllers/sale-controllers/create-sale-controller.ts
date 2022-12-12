import { ICreateSale } from "@domain/usecases/sale/create-sale";
import { MissingParamError } from "@errors/missing-param-error";
import { NotFoundError } from "@errors/not-found-error";
import { VehicleAlreadySoldError } from "@errors/vehicle-already-sold-error";
import { badRequest, created, notFound, serverError } from "@helpers/http-helper";
import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";

export class CreateSaleController implements IController {
  constructor(
    private readonly createSale: ICreateSale
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      const requiredFields = [
        "userId",
        "vehicleId"
      ];
      for(const field of requiredFields){
        if (!Object.keys(httpRequest.body).includes(field)) {
          return badRequest(new MissingParamError(field));
        }
      }

      const {userId, vehicleId} = httpRequest.body
      
      const sale = await this.createSale.create({userId, vehicleId})
      if(sale instanceof NotFoundError){
        return notFound(sale)
      }
      if(sale instanceof VehicleAlreadySoldError){
        return badRequest(sale)
      }
      return created(sale)
    } catch(error){
      return serverError(error)
    }
  }
}