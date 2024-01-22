import { Router } from "express";
import middlewares from '../modules/middlewares/'
import PrivatePerson from "../modules/privatePerson/PrivatePerson.controller";

const privatePersonRouter = Router();

const privatePerson = new PrivatePerson();

privatePersonRouter.post('/pj', middlewares.validateToken, middlewares.validateUser, privatePerson.create)
privatePersonRouter.get('/pj', middlewares.validateToken, privatePerson.getAllPrivatePerson)
privatePersonRouter.get('/pj/:id', middlewares.validateToken, privatePerson.getPrivatePersonById)
privatePersonRouter.delete('/pj/:id', middlewares.validateToken,  privatePerson.deletePrivatePerson)
privatePersonRouter.put('/pj/:id', middlewares.validateToken, middlewares.validateUser, privatePerson.updatePrivatePerson)

export default privatePersonRouter;
