export class VehicleAlreadySoldError extends Error{
  constructor(){
    super('VehicleAlreadySold')
    this.name = 'VehicleAlreadySoldError'
  }
}