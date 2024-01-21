import IPrivatePersonDTO from "../DTO/IPrivatePersonDTO";
import ServiceResponse from "../../interfaces/ServiceResponse";

export default interface IPrivatePersonService {
    create(data: IPrivatePersonDTO): Promise<ServiceResponse>;
    findByEmail(email: string): Promise<ServiceResponse>;
};