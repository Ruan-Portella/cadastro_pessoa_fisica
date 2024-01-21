import { Request, Response, NextFunction } from 'express';

export default class ValidateProfileImage {
    async validate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { profileImage } = request.body;

        if (!profileImage) {
            return response.status(400).json({ message: 'ProfileImage is required', name: "profileImage" });
        }

        next();
    }
}