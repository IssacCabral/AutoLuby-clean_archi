import { UpdateVehicleValidator } from "@validators/update-vehicle-validation"

export const makeUpdateVehicleValidation = (): UpdateVehicleValidator => {
  return new UpdateVehicleValidator()
}