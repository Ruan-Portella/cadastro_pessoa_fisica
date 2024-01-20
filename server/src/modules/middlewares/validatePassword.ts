import { Response, Request, NextFunction } from 'express';

export default class ValidatePassword {
    async validate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { password } = request.body;

        if (!password) {
            return response.status(400).json({ message: 'Password is required', name: "password" });
        }

        if (password.length < 8) {
            return response.status(400).json({ message: 'Password must be at least 8 characters long', name: "password" });
        }

        next();
    }
}