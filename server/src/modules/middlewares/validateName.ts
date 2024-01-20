import { NextFunction, Request, Response } from 'express';

export default class ValidateName {
    async validate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({ message: 'Name is required', name: "name" });
        }

        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

        if (!nameRegex.test(name)) {
            return response.status(400).json({ message: 'Invalid name', name: "name" });
        }

        if (name.length < 3) {
            return response.status(400).json({ message: 'Name must be at least 3 characters long', name: "name" });
        }

        next();
    }
}