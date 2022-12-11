import { IFindVehicles } from "@domain/usecases/vehicle/find-vehicles";
import { ok, serverError } from "@helpers/http-helper";
import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";

export class FindVehiclesController implements IController{
  constructor(
    private readonly findVehicles: IFindVehicles
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {page, perPage} = httpRequest.query
      const vehicles = await this.findVehicles.find({page: Number(page), perPage: Number(perPage)})
      return ok({vehicles})
    } catch (error) {
      return serverError(error);
    }
  }
}