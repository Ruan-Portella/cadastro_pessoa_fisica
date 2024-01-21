import { Request, Response } from "express";
import PrivatePersonService from "./implementations/PrivatePerson.service";

const privatePersonService = new PrivatePersonService();

export default class PrivatePersonController {

    async create(request: Request, response: Response): Promise<Response> {
        const privatePerson = await privatePersonService.create({ ...request.body });

        return response.status(privatePerson.status).json(privatePerson.data);
    }

    async getAllPrivatePerson(request: Request, response: Response): Promise<Response> {
        const privatePerson = await privatePersonService.getAllPrivatePerson();

        return response.status(privatePerson.status).json(privatePerson.data);
    }

    async deletePrivatePerson(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const privatePerson = await privatePersonService.deletePrivatePerson(id);

        return response.status(privatePerson.status).json(privatePerson.data);
    }

    async getPrivatePersonById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const privatePerson = await privatePersonService.getPrivatePersonById(id);

        return response.status(privatePerson.status).json(privatePerson.data);
    }

    async updatePrivatePerson(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const privatePerson = await privatePersonService.updatePrivatePerson(id, { ...request.body });

        return response.status(privatePerson.status).json(privatePerson.data);
    }
}