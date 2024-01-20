import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default class ValidateToken {
  async validate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(400).json({ message: "Token is required" });
    }

    const token = authorization.split(" ")[1];

    try {
      const tokenVerified = await jwt.verify(
        token,
        process.env.JWT_SECRET as string || 'default'
      );

      request.body.user = tokenVerified;

      next();
    } catch (error) {
      return response.status(401).json({ message: "Invalid token" });
    }
  }
}
