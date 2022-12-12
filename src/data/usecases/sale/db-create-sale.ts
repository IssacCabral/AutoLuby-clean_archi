import { ICreateSaleRepository } from "@data/protocols/sale/create-sale-repository";
import { IFindUserByIdRepository } from "@data/protocols/user/find-user-by-id-repository";
import { IFindVehicleByIdRepository } from "@data/protocols/vehicle/find-vehicle-by-id-repository";
import { SaleModel } from "@domain/models/sale";
import { CreateSaleParams } from "@domain/types/create-sale-params";
import { ICreateSale } from "@domain/usecases/sale/create-sale";
import { NotFoundError } from "@errors/not-found-error";
import { VehicleAlreadySoldError } from "@errors/vehicle-already-sold-error";

export class DbCreateSale implements ICreateSale{
  constructor(
    private createSaleRepository: ICreateSaleRepository,
    private findUserByIdRepository: IFindUserByIdRepository,
    private findVehicleByIdRepository: IFindVehicleByIdRepository
  ) {}

  async create(params: CreateSaleParams): Promise<SaleModel | Error> {
    const user = await this.findUserByIdRepository.findById(params.userId)
    if(!user){
      return new NotFoundError('User')
    }

    const vehicle = await this.findVehicleByIdRepository.findById(params.vehicleId)
    
    if(!vehicle){
      return new NotFoundError('Vehicle')
    }
    if(vehicle.status == "sold"){
      return new VehicleAlreadySoldError()
    }

    const sale = await this.createSaleRepository.create(params)
    return sale
  }

}