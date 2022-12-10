import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";
import { IFindVehicleByChassis } from "@domain/usecases/vehicle/find-vehicle-by-chassis";
import { notFound, ok, serverError } from "@helpers/http-helper";
import { NotFoundError } from "@errors/not-found-error";

export class FindVehicleByChassisController implements IController{
  constructor(
    private readonly findVehicleByChassis: IFindVehicleByChassis
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {chassis} = httpRequest.params
      const vehicle = await this.findVehicleByChassis.find(chassis)
      if(!vehicle){
        return notFound(new NotFoundError('vehicle')) 
      }
      return ok({vehicle})
    } catch (error) {
      return serverError(error);
    }
  }
}