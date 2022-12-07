import { IAuthentication } from "@domain/usecases/authentication";
import { MissingParamError } from "@errors/missing-param-error";
import { badRequest, ok, serverError, unauthorized } from "@helpers/http-helper";
import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";
import { IValidation } from "@protocols/validation";

export class LoginController implements IController{
  constructor(
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["email", "password"];
      for(const field of requiredFields){
        if (!Object.keys(httpRequest.body).includes(field)) {
          return badRequest(new MissingParamError(field));
        }
      }
      const error = this.validation.validate(httpRequest.body);
      if (error) {return badRequest(error)}
      
      const {email, password} = httpRequest.body
      
      const accessToken = await this.authentication.auth(email, password)

      if(!accessToken){
        return unauthorized()
      }

      return ok({accessToken})
    } catch (error) {
      return serverError(error);
    }
  }
}