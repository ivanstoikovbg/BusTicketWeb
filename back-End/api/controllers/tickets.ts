import { Context, Hono } from 'hono';
import { buyTicket, getAllProfits } from '../services/tickets';
import { getValidQRCode } from './QRlogic';

const ticketsController = new Hono();

interface TicketType {
    [key: string]: any;
    name: string;
    lastName: string;
    ticketType: "student" | "regular" | "retiree" | "student2";
}

ticketsController.post('/ticket', async (c: Context) => {
    const reqBody = await c.req.json<TicketType>();
    if (!reqBody.name || !reqBody.lastName || !reqBody.ticketType) {
        return c.json({ error: 'Missing required fields' }, 400);
    }
    const name = reqBody['name'];
    const lastName = reqBody['lastName'];
    const type = reqBody['ticketType'];
    const qrCode = await getValidQRCode();
    
    let price = 0;
    if(type === "student" || type === "student2") {
        price = 1;
    } else if(type === "regular") {
        price = 2;
    }
    else if(type === "retiree") {
        price = 0.5;
    }
    const result = await buyTicket(type, name, lastName, price, qrCode);
    return c.json(result, 201);
});

ticketsController.get('/allProfits', async (c: Context) => {
    const result = await getAllProfits();
    return c.json(result, 200);
});




export default ticketsController;