import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { sendEmail } from "../mail/nodemailer";



export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const recipient = [{ email }]; // key & value same
  // console.log("try to send veification mail");
  try {
    // const res = await client.send({
    //     from: sender,
        // to: recipient,
        // subject: 'Verify your email',
        // html: htmlContent.replace("{verificationToken}", verificationToken),
        // category: 'Email Verification'
    // });

      const res = await sendEmail({
            to: recipient,
            subject: `Verify your email`,
            body: htmlContent.replace("{verificationToken}", verificationToken),
        });

      // console.log("Verification Email sent:", res);
      return res;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};


export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);

  try {

    // const res = await client.send({
    //   from: sender,
    //   to: recipient,
    //   subject: "Welcome to ForkSquare",
    //   html: htmlContent,
      // template_variables: {
      //   company_info_name: "ForkSquare",
      //   name: name,
      // },
    // });

    const compiledHtml = htmlContent
      .replace("{{company_info_name}}", "ForkSquare")
      .replace("{{name}}", name);

    const res = await sendEmail({
      to: recipient,
      subject: "Welcome to ForkSquare",
      body: compiledHtml,
    });

    // console.log("Welcome Email sent:", res);
    return res;


  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};


export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  // console.log("try to send pass reset mail");
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);

  try {

    // const res = await client.send({
    //   from: sender,
    //   to: recipient,
    //   subject: "Reset your password",
    //   html: htmlContent,
    //   category: "Reset Password",
    // });

      const res = await sendEmail({
      to: recipient,
      subject: "Reset your password",
      body: htmlContent,
    });

    // console.log("Password Reset Email sent:", res);
    return res;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password");
  }
};


export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();

  try {

    // const res = await client.send({
    //   from: sender,
    //   to: recipient,
    //   subject: "Password Reset Successfully",
    //   html: htmlContent,
    //   category: "Password Reset",
    // });

      const res = await sendEmail({
      to: recipient,
      subject: "Password Reset Successfully",
      body: htmlContent,
    });

    // console.log("Reset Success Email sent:", res);
    return res;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
