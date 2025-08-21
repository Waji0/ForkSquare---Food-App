import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();
const TOKEN = process.env.MAILTRAP_API_TOKEN as string;

 export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: process.env.MAILTRAP_SENDER_EMAIL || "wajiali744@gmail.com",
  name: process.env.MAILTRAP_SENDER_NAME || "ForkSquare pvt ltd"
};


