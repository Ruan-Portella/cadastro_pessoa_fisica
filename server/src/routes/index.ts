import { Router } from 'express';
import userRouter from './user.route';
import privatePersonRouter from './privatePerson.route';

const router = Router();

router.use(userRouter);
router.use(privatePersonRouter);

export default router;
