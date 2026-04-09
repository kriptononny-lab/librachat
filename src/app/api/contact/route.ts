import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  email: z.string().email("Некорректный email"),
  company: z.string().optional(),
  message: z.string().min(10, "Сообщение слишком короткое"),
});

/**
 * POST /api/contact
 * Отправка формы обратной связи
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // TODO: Подключить реальный сервис отправки (Resend, Nodemailer и т.д.)
    // Пример с Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@librachat.ai",
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Новое сообщение от ${data.name}`,
    //   text: data.message,
    // });

    console.log("Contact form submission:", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
