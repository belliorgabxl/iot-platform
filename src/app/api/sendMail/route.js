// user: "patara1929@gmail.com",
// pass: "hnoy gqhk trmx bhyn"

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, value, email } = await req.json();

    if (Number(value) > 60) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "patara1929@gmail.com",
          pass: "hnoy gqhk trmx bhyn",
        },
      });

      const mailOptions = {
        from: "patara1929@gmail.com",
        to: email,
        subject: "Temperature Alert 🚨",
        text: `Warning: ${name} has exceeded the safe temperature limit.\nCurrent Value: ${value}°C`,
      };

      await transporter.sendMail(mailOptions);
      return Response.json(
        { success: true, message: "Email sent successfully" },
        { status: 200 }
      );
    }

    return Response.json(
      { success: true, message: "Temperature is normal, no email sent" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
