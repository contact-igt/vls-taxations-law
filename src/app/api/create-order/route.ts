import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount || isNaN(Number(amount))) {
      return Response.json(
        { error: "amount is required and must be numeric" },
        { status: 400 }
      );
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const secret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET;

    if (!key_id || !secret) {
      return Response.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    const auth =
      "Basic " + Buffer.from(`${key_id}:${secret}`).toString("base64");

    const orderBody = {
      amount: Math.round(Number(amount) * 100), // convert rupees → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(data, { status: response.status });
    }

    return Response.json(data);
  } catch (err) {
    console.error("create-order error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
