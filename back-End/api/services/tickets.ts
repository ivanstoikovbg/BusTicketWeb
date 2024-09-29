import Ticket from "../../models/ticketModel";

export async function buyTicket(type:string, name:string, lastName:string, price: number, qrCode: string) {
    const ticket = new Ticket({
        type,
        name,
        lastName,
        price,
        qrCode
    });
    await ticket.save();
    return ticket;
}

export async function getAllProfits() {
    const profits = await Ticket.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$price" }
            }
        }
    ]);
    return profits;
}