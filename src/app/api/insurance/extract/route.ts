import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { NextRequest, NextResponse } from "next/server";
import { buildExtractionSystemPrompt, ExtractedPolicySchema } from "@/lib/insurance/extraction";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 32 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "שירות הייבוא האוטומטי לא מוגדר בשרת (חסר ANTHROPIC_API_KEY)." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "לא התקבל קובץ" }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "יש להעלות קובץ PDF בלבד" }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "הקובץ גדול מדי (מקסימום 32MB)" }, { status: 400 });
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 4096,
      system: buildExtractionSystemPrompt(),
      output_config: {
        format: zodOutputFormat(ExtractedPolicySchema),
        effort: "low",
      },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: { type: "base64", media_type: "application/pdf", data: base64 },
            },
            { type: "text", text: "חלץ את פרטי הפוליסה ממסמך זה." },
          ],
        },
      ],
    });

    if (!response.parsed_output) {
      return NextResponse.json(
        { error: "לא הצלחנו לחלץ נתונים ברורים מהקובץ — נסה למלא ידנית" },
        { status: 422 }
      );
    }

    return NextResponse.json({ policy: response.parsed_output });
  } catch (err) {
    console.error("insurance PDF extraction failed:", err);
    return NextResponse.json({ error: "שגיאה בעת חילוץ הנתונים מהקובץ" }, { status: 502 });
  }
}
