import { registerUser, loginUser, checkAuthorization } from '../services/auth';
import { Context, Hono } from 'hono';
import { RegisterPayload } from '../../interfaces/RegisterPayload';

const router = new Hono();

router.post('/register', async (c: Context) => {
    const reqBody = await c.req.json<RegisterPayload>();
    if (
        !reqBody.firstName ||
        !reqBody.password ||
        !reqBody.lastName
    ) {
        return c.json({ error: 'Missing required fields' }, 400);
    }
    const result = await registerUser(reqBody);
    return c.json(result, 201);
});

router.post('/login', async (c: Context) => {
    const reqBody = await c.req.json<RegisterPayload>();
    if ((!reqBody.firstName) || !reqBody.password) {
        return c.json({ error: 'Missing required fields' }, 400);
    }
    const result = await loginUser(reqBody);
    return c.json(result, 200);
});

export default router;
