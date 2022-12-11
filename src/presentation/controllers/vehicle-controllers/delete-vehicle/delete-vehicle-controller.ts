import { IDeleteVehicle } from "@domain/usecases/vehicle/delete-vehicle";
import { NotFoundError } from "@errors/not-found-error";
import { badRequest, notFound, ok, serverError } from "@helpers/http-helper";
import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";

export class DeleteVehicleController implements IController{
  constructor(
    private readonly deleteVehicle: IDeleteVehicle
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {chassis} = httpRequest.params

      const deleteVehicleResult = await this.deleteVehicle.delete(chassis)
      if(deleteVehicleResult instanceof NotFoundError){
        return notFound(deleteVehicleResult)
      }
      return ok(deleteVehicleResult)
    } catch (error) {
      return serverError(error);
    }
  }
}