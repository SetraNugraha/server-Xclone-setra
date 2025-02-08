import { Request, Response, NextFunction } from "express"

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export interface IRouting {
  method: HttpMethod
  url: string
  middleware?: (req: Request, res: Response, next: NextFunction) => void
  controller: (req: Request, res: Response) => void | Promise<void>
}
