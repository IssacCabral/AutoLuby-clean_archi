import { IFindVehiclesRepository } from "@data/protocols/vehicle/find-vehicles-repository";
import { Pagination } from "@domain/models/pagination";
import { VehicleModel } from "@domain/models/vehicle";
import { PaginateOptions } from "@domain/types/paginate-options";
import { prisma } from "@infra/prisma/prisma-client";

export class FindVehiclesPrismaRepository implements IFindVehiclesRepository{
  async findVehicles(pagination: PaginateOptions): Promise<Pagination<VehicleModel>> {
    const vehicles = await prisma.vehicle.findMany({
      take: pagination.perPage || 4,
      skip: (pagination.page - 1) * pagination.perPage || 0, // skip --> serve para ignorar alguns registros
    })
    return {
      page: pagination.page,
      perPage: pagination.perPage,
      data: vehicles
    }
  }
}