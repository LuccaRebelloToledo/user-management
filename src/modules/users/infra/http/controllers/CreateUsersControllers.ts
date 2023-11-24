import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUsersService from "../../../services/CreateUsersService";

export default class CreateUsersControllers {

    async handle(request: Request, response: Response): Promise<Response> {
        let { email, password, name } = request.body;

        let createUsersService = container.resolve(CreateUsersService);
        let user = await createUsersService.execute({ email, password, name });

        return response.json(user);
    }

}
