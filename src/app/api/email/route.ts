import { NextResponse } from "next/server";
import { WelcomeEmail } from "@/emails/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, email } = await request.json();

  await resend.emails.send({
    from: "Test <noreply@volshauz.com>",
    to: email,
    subject: "Sample",
    react: WelcomeEmail({
      firstname: firstName,
    }),
    // from: "Test <noreply@volshauz.com>",
    // to: "edwinliby30@gmail.com",
    // subject: "Sample",
    // react: WelcomeEmail({
    //   firstname: "alan",
    // }),
  });

  return NextResponse.json({
    message: "Email sent",
  });
}
