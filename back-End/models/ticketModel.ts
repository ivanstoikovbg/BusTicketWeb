import { Schema, model, Document, Types } from "mongoose";

interface ITicket extends Document {
    name: string;
    lastName: string;
    type: "student" | "regular" | "retiree" | "student2";
    price: number;
    qrCode: string;
    // Add other properties as needed
}

const ticketSchema = new Schema<ITicket>({
    name: { type: String, required: true },
    lastName: { type: String, required: true }, // Explicitly cast Types.ObjectId
    type: { type: String, required: true },
    price: {
        type: Number,
        required: true,
    },
    qrCode: { type: String, required: true },
    // Add other properties as needed
});

const Ticket = model<ITicket>('Ticket', ticketSchema);
export default Ticket;
