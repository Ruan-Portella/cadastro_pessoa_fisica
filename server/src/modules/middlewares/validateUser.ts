import { Request, Response, NextFunction } from 'express';
import IAddressDTO from '../privatePerson/DTO/IAdressDTO';
import IContactDTO from '../privatePerson/DTO/IContactDTO';

export default class validateUser {
    async validate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { name, middleName, dateOfBirth, email, cpf, rg, addresses, contacts } = request.body;
        const error = []

        if (!name) {
          error.push({ message: 'Name is required', name: "name" });
        }

        if (name.length < 3) {
          error.push({ message: 'Name must be at least 3 characters', name: "name" });
        }

        if (!middleName) {
          error.push({ message: 'Middle name is required', name: "middleName" });
        }

        if (middleName.length < 3) {
          error.push({ message: 'Middle name must be at least 3 characters', name: "middleName" });
        }

        if (!dateOfBirth) {
          error.push({ message: 'Date of birth is required', name: "dateOfBirth" });
        }

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateOfBirth)) {
          error.push({ message: 'Date of birth must be in the format DD/MM/YYYY', name: "dateOfBirth" });
        }

        if (!email) {
          error.push({ message: 'Email is required', name: "email" });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
          error.push({ message: 'Email must be in the format correct', name: "email" });
        }
        
        if (!cpf) {
          error.push({ message: 'CPF is required', name: "cpf" });
        }

        if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) {
          error.push({ message: 'CPF must be in the format 000.000.000-00', name: "cpf" });
        }
        
        if (!rg) {
          error.push({ message: 'RG is required', name: "rg" });
        }

        if (!/^\d{2}\.\d{3}\.\d{3}\-\d{1}$/.test(rg)) {
          error.push({ message: 'RG must be in the format 00.000.000-0', name: "rg" });
        }
        
        addresses.forEach((address: IAddressDTO) => {
          if (!address.street) {
            error.push({ message: 'Street is required', name: "street" });
          }
          
          if (!address.number) {
            error.push({ message: 'Number is required', name: "number" });
          }

          if (!address.complement) {
            error.push({ message: 'Complement is required', name: "complement" });
          }

          if (!address.city) {
            error.push({ message: 'City is required', name: "city" });
          }

          if (!address.state) {
            error.push({ message: 'State is required', name: "state" });
          }

          if (!address.zipCode) {
            error.push({ message: 'Zip code is required', name: "zipCode" });
          }

          if (!/^\d{5}\-\d{3}$/.test(address.zipCode)) {
            error.push({ message: 'Zip code must be in the format 00000-000', name: "zipCode" });
          }
        });
        
        contacts.forEach((contact: IContactDTO) => {
          if (!contact.name) {
            error.push({ message: 'Name is required', name: "nameContact" });
          }

          if (!contact.typeContact) {
            error.push({ message: 'Type contact is required', name: "typeContact" });
          }
          
          if (!contact.contact) {
            error.push({ message: 'Contact is required', name: "contact" });
          }
        });

        if (error.length > 1) {
          return response.status(400).json(error);
        }
        
        next();
      }
}