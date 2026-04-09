import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook от Strapi для инвалидации ISR-кэша
 * POST /api/revalidate?tag=articles&secret=xxx
 */
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");

  // Проверяем секрет
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ error: "Tag is required" }, { status: 400 });
  }

  revalidateTag(tag);

  return NextResponse.json({
    revalidated: true,
    tag,
    now: Date.now(),
  });
}
