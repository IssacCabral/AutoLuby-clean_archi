import { ICreateUser } from "@domain/usecases/user/create-user";
import { MissingParamError } from "@errors/missing-param-error";
import { badRequest, created, serverError } from "@helpers/http-helper";
import { IController } from "@protocols/controller";
import { HttpRequest, HttpResponse } from "@protocols/http";
import { IValidation } from "@protocols/validation";

export class CreateUserController implements IController{
  constructor(
    private readonly createUser: ICreateUser,
    private readonly validation: IValidation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try{
      const requiredFields = [
        "email",
        "password",
        "name",
        "cpf",
        "biography",
        "wage"
      ];
      for(const field of requiredFields){
        if (!Object.keys(httpRequest.body).includes(field)) {
          return badRequest(new MissingParamError(field));
        }
      }
      const error = this.validation.validate(httpRequest.body);
      if (error) {return badRequest(error)}
      
      const {email, password, name, cpf, biography, wage} = httpRequest.body
      
      const createUserResult = await this.createUser.create({email, password, name, cpf, biography, wage})
      if(createUserResult instanceof Error){
        return badRequest(createUserResult)
      }
      return created(createUserResult)
    } catch(error){
      return serverError(error)
    }
  }

}