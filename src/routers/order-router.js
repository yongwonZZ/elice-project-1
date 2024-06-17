import { Router } from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import { orderService } from '../services';
import { adminRequired } from '../middlewares/admin-required';

const orderRouter = Router();

orderRouter.post;

export { orderRouter };
