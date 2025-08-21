import nodemailer from 'nodemailer';


interface EmailOptions {
  to: { email: string }[];
  subject: string;
  body: string; // HTML string
}


const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587, // add host and port from brevo
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export const sendEmail = async ({to, subject, body}: EmailOptions) => {
    const formattedRecipients = to.map(r => r.email);
    const response = await transport.sendMail({
        from: process.env.SENDER_EMAIL,
        // to,
        to: formattedRecipients,
        subject,
        html: body,
    });

    return response;
};


