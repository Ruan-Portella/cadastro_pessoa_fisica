import PrivatePersonModel from '../../../database/models/PrivatePersonModel';
import ServiceResponse from '../../interfaces/ServiceResponse';
import IPrivatePerson  from './IPrivatePersonService';
const Sequelize = require('sequelize');
import Address from '../../../database/models/AddressModel';
import Contacts from '../../../database/models/ContactsModel';
import IContactDTO from '../DTO/IContactDTO';
import IAddressDTO from '../DTO/IAdressDTO';
const config = require('../../../database/config/database');

const sequelize = new Sequelize(config);

export default class PrivatePerson implements IPrivatePerson {
    async create(data: any): Promise<ServiceResponse> {
        const { email, rg, cpf } = data;
        const errors = [];

        const userExistsEmail = await this.findByEmail(email);

        if (userExistsEmail.status === 200) {
            errors.push({ message: 'User already exists', name: 'email' });
        }

        const userExistsRg = await this.findByRg(rg);

        if (userExistsRg.status === 200) {
            errors.push({ message: 'User already exists', name: 'rg' });
        }

        const userExistsCpf = await this.findByCpf(cpf);

        if (userExistsCpf.status === 200) {
            errors.push({ message: 'User already exists', name: 'cpf' });
        }

        if (errors.length > 0) {
            return { status: 400, data: errors };
        }

        const result = await sequelize.transaction(async (t: typeof Sequelize) => {
            const user = await PrivatePersonModel.create({
                name: data.name,
                middleName: data.middleName,
                dateOfBirth: data.dateOfBirth,
                email: data.email,
                cpf: data.cpf,
                rg: data.rg,
            }, { transaction: t });
          
            const postContacts = data.contacts.map((contact: IContactDTO) => Contacts
            .create({ privatePersonId: user.id, name: contact.name, 
                      typeContact: contact.typeContact, contact: contact.contact }, 
                      { transaction: t }));

            const postAddresses = data.addresses.map((address: IAddressDTO) => Address
            .create({ privatePersonId: user.id, street: address.street, 
                    number: address.number, complement: address.complement,
                    city: address.city, state: address.state, zipCode: address.zipCode }, 
                    { transaction: t }));
          
            await Promise.all(postContacts);
            await Promise.all(postAddresses);
          
            return user;
          });

        const user = await PrivatePersonModel.findByPk(result.id, {
            include: [
              { model: Address, as: "address" },
              { model: Contacts, as: "contacts" },
            ],
        });

        return { status: 201, data: user };
    }
    
    async findByEmail(email: string): Promise<ServiceResponse> {
        const user = await PrivatePersonModel.findOne({ where: { email } });

        if (!user) {
            return { status: 404, data: { message: 'User not found' } };
        }

        return { status: 200, data: user };
    }

    async findByRg(rg: string): Promise<ServiceResponse> {
        const user = await PrivatePersonModel.findOne({ where: { rg } });

        if (!user) {
            return { status: 404, data: { message: 'User not found' } };
        }

        return { status: 200, data: user };
    }

    async findByCpf(cpf: string): Promise<ServiceResponse> {
        const user = await PrivatePersonModel.findOne({ where: { cpf } });

        if (!user) {
            return { status: 404, data: { message: 'User not found' } };
        }

        return { status: 200, data: user };
    }

    async getAllPrivatePerson(): Promise<ServiceResponse> {
        const privatePerson = await PrivatePersonModel.findAll({
            include: [
              { model: Address, as: "address" },
              { model: Contacts, as: "contacts" },
            ],
          });

        if (!privatePerson) {
            return { status: 404, data: { message: 'User not found' } };
        }

        return { status: 200, data: privatePerson };
    }

    async deletePrivatePerson(id: string): Promise<ServiceResponse> {
        const privatePerson = await PrivatePersonModel.findByPk(id);

        if (!privatePerson) {
            return { status: 404, data: { message: 'User not found' } };
        }

        await PrivatePersonModel.destroy({ where: { id } });

        return { status: 200, data: { message: 'User deleted' } };
    }

    async getPrivatePersonById(id: string): Promise<ServiceResponse> {
        const privatePerson = await PrivatePersonModel.findByPk(id, {
            include: [
              { model: Address, as: "address" },
              { model: Contacts, as: "contacts" },
            ],
          });

        if (!privatePerson) {
            return { status: 404, data: { message: 'User not found' } };
        }

        return { status: 200, data: privatePerson };
    }

    async updatePrivatePerson(id: string, data: any): Promise<ServiceResponse> {
        const privatePerson = await PrivatePersonModel.findByPk(id, {
            include: [
              { model: Address, as: "address" },
              { model: Contacts, as: "contacts" },
            ],
        }) as any;
        const errors = [];

        if (!privatePerson) {
            return { status: 404, data: { message: 'User not found' } };
        }

        if (privatePerson.dataValues.email !== data.email) {
            const userExistsEmail = await this.findByEmail(data.email);

            if (userExistsEmail.status === 200) {
                errors.push({ message: 'User already exists', name: 'email' });
            }
        }

        if (privatePerson.dataValues.cpf !== data.cpf) {
            const userExistsCpf = await this.findByCpf(data.cpf);

            if (userExistsCpf.status === 200) {
                errors.push({ message: 'User already exists', name: 'cpf' });
            }
        }

        if (privatePerson.dataValues.rg !== data.rg) {
            const userExistsRg = await this.findByRg(data.rg);

            if (userExistsRg.status === 200) {
                errors.push({ message: 'User already exists', name: 'rg' });
            }
        }

        if (errors.length > 0) {
            return { status: 400, data: errors };
        }

        const addressArray = privatePerson.dataValues.address.map((address: any) => address.dataValues);
        const contactArray = privatePerson.dataValues.contacts.map((contact: any) => contact.dataValues);

        const result = await sequelize.transaction(async (t: typeof Sequelize) => {
            const user = await PrivatePersonModel.update ({
                name: data.name,
                middleName: data.middleName,
                dateOfBirth: data.dateOfBirth,
                email: data.email,
                cpf: data.cpf,
                rg: data.rg,
            }, { where: { id }, transaction: t });

            if (contactArray.length > 0) {
                contactArray.map(async (contact: any) => {
                    await Contacts.destroy({ where: { id: contact.id } });
                });
            }

            if (addressArray.length > 0) {
                addressArray.map(async (address: any) => {
                    await Address.destroy({ where: { id: address.id } });
                });
            }
          
            const postContacts = data.contacts.map((contact: IContactDTO) => Contacts
            .create({ privatePersonId: id, name: contact.name, 
                      typeContact: contact.typeContact, contact: contact.contact }, { transaction: t }));

            const postAddresses = data.addresses.map((address: IAddressDTO) => Address
            .create({ privatePersonId: id, street: address.street, 
                    number: address.number, complement: address.complement,
                    city: address.city, state: address.state, zipCode: address.zipCode }, 
                { transaction: t }));
          
            await Promise.all(postContacts);
            await Promise.all(postAddresses);
          
            return user;
          });

        return { status: 200, data: { message: 'User updated' } };
    }
}