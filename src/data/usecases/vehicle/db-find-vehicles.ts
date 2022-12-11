import { IFindVehiclesRepository } from "@data/protocols/vehicle/find-vehicles-repository";
import { Pagination } from "@domain/models/pagination";
import { VehicleModel } from "@domain/models/vehicle";
import { PaginateOptions } from "@domain/types/paginate-options";
import { IFindVehicles } from "@domain/usecases/vehicle/find-vehicles";

export class DbFindVehicles implements IFindVehicles{
  constructor(
    private readonly findVehiclesRepository: IFindVehiclesRepository
  ) {}

  async find(pagination: PaginateOptions): Promise<Pagination<VehicleModel>> {
    const vehicles = await this.findVehiclesRepository.findVehicles(pagination)
    return vehicles
  }
}