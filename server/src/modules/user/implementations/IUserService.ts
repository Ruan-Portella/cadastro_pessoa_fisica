import IUserDTO from "../DTO/IUserDTO";
import ServiceResponse from "../../interfaces/ServiceResponse";

export default interface IUserService {
    create(data: IUserDTO): Promise<ServiceResponse>;
    login(data: IUserDTO): Promise<ServiceResponse>;
    findByEmail(email: string): Promise<ServiceResponse>;
    validateLogin(email: string, password: string): Promise<ServiceResponse>;
};