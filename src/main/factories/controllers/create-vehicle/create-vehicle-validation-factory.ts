import { CreateVehicleValidator } from "@validators/create-vehicle-validation"

export const makeCreateVehicleValidation = (): CreateVehicleValidator => {
  return new CreateVehicleValidator()
}