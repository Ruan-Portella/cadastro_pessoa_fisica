import { Request, Response, NextFunction } from 'express';

export default class ValidateTelephone {
    async validate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { telephone } = request.body;

        if (!telephone) {
            return response.status(400).json({ message: 'Telephone is required', name: "telephone" });
        }

        next();
    }
}