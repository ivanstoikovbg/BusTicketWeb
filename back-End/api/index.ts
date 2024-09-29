import { Hono } from 'hono';
import users from './controllers/usersController';
import tickets from './controllers/tickets';

const api = new Hono();

api.route('/auth', users);
api.route('/items', tickets);

export default api;
