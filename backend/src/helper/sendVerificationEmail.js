import { Resend } from 'resend';

const resend = new Resend('re_d6kuHWin_3VExaRt1pEs4CbqjsRbAyUgs');

export async function sendEmail(email, username, verifyCode) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verification Code',
      html: `
        <h1>Hello, ${username}</h1>
        <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
        <h2>${verifyCode}</h2>
        <p>If you did not request this code, please ignore this email.</p>
      `
    });

    return { success: true, message: "Verification email sent" };
  } catch (error) {
    throw new Error(error.message);
  }
}
