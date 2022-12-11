import { Pagination } from "@domain/models/pagination";
import { VehicleModel } from "@domain/models/vehicle";
import { PaginateOptions } from "@domain/types/paginate-options";

export interface IFindVehicles{
  find(pagination: PaginateOptions): Promise<Pagination<VehicleModel>>
}