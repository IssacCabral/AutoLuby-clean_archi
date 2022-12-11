export interface IDeleteVehicleRepository{
  deleteVehicle(chassis: string): Promise<boolean>
}