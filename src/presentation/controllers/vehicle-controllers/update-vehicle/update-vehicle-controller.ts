import { IFindVehicleByChassis } from "@domain/usecases/vehicle/find-vehicle-by-chassis";
import { IUpdateVehicle } from "@domain/usecases/vehicle/update-vehicle";
import { NotFoundError } from "@errors/not-found-error";
import { badRequest, notFound, ok, serverError } from "@helpers/http-helper";
import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";
import { IValidation } from "@protocols/validation";

export class UpdateVehicleController implements IController{
  constructor(
    private readonly findVehicleByChassis: IFindVehicleByChassis,
    private readonly updateVehicle: IUpdateVehicle,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if(error) return badRequest(error)

      const {chassis} = httpRequest.params
      const {model, brand, status, year, km, color, sale_price, cost_price } = httpRequest.body

      const vehicleByChassis = await this.findVehicleByChassis.find(chassis)
      if(!vehicleByChassis) return notFound(new NotFoundError('Vehicle'))

      const updatedVehicle = await this.updateVehicle.update(vehicleByChassis, {...httpRequest.body})
      if (updatedVehicle instanceof Error) {
        return badRequest(updatedVehicle)
      }
      return ok({updatedVehicle})
    } catch (error) {
      return serverError(error);
    }
  }
}