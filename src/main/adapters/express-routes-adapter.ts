import { IController } from "@protocols/controller";
import { Request, Response } from "express";
import { HttpRequest, HttpResponse } from "@protocols/http";
import env from "@infra/config/env";

export class ExpressAdapter{
  static adapt(controller: IController){
    return async function(request: Request, response: Response){
      const httpRequest: HttpRequest = {
        body: request.body,
        params: request.params,
        query: request.query
      }

      const httpResponse: HttpResponse = await controller.handle(httpRequest)
      if(httpResponse.statusCode >= 200 && httpResponse.statusCode <300){
        return response.status(httpResponse.statusCode).json(httpResponse.body)
      }else{
        if(env.NODE_ENV !== "test"){
          console.log(httpResponse)
        }
        return response.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    }
  }
}