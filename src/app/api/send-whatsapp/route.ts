import { NextRequest } from "next/server";

const REQUIRED_FIELDS = [
  "phone",
  "amount",
  "programm_name",
  "schedule",
  "platform",
  "link_date",
] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    for (const field of REQUIRED_FIELDS) {
      if (!body[field]) {
        return Response.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.ASKEVA_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "AskEva API key not configured" },
        { status: 500 }
      );
    }

    const payload = {
      phone: body.phone,
      template_name: "event_remainder",
      parameters: [
        body.name || "",
        String(body.amount),
        body.programm_name,
        body.schedule,
        body.platform,
        body.link_date,
      ],
    };

    const response = await fetch(
      "https://backend.askeva.io/v1/message/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("AskEva error:", data);
      return Response.json(
        { error: "WhatsApp send failed", detail: data },
        { status: response.status }
      );
    }

    return Response.json({ ok: true, data });
  } catch (err) {
    console.error("send-whatsapp error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
