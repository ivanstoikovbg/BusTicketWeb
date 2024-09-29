import * as api from './api';

export const endpoints = {
    ticket: '/items/ticket',
    profits: '/items/allProfits',
};

interface Ticket {
    [key: string]: any;
    name: string;
    lastName: string;
    ticketType: string | 'student' | 'regular' | 'retiree' | 'student2';
}

export const buyTicket = async ({ name, lastName, ticketType }: Ticket) => {
    return api.post(endpoints.ticket, { name, lastName, ticketType });
};

export const getAllProfits = async () => {
    return api.get(endpoints.profits);
}

export const loginUser = async (firstName: string, password: string) => {
    return api.post('/auth/login', { firstName, password });
}

export const registerUser = async (firstName: string, lastName: string, password: string) => {
    return api.post('/auth/register', { firstName, lastName, password });
}