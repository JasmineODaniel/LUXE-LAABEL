import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res
      .status(500)
      .json({ error: "Missing RESEND_API_KEY on the server" });
  }

  const { email, items, total } = req.body || {};

  if (
    !email ||
    !Array.isArray(items) ||
    typeof total !== "number" ||
    items.length === 0
  ) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  const html = renderReceiptHtml({ items, total });

  try {
    await resend.emails.send({
      from: `Luxe Label <${from}>`,
      to: email,
      subject: "Your Luxe Label order confirmation",
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Resend error", err);
    return res.status(500).json({ error: "Email failed" });
  }
}

function renderReceiptHtml({
  items,
  total,
}: {
  items: CartItem[];
  total: number;
}) {
  const rows = items
    .map(
      (it) => `
      <tr>
        <td style="padding:8px 0; color:#0f172a;">${escapeHtml(it.name)}</td>
        <td style="padding:8px 0; color:#6b7280; text-align:right;">x${
          it.quantity
        }</td>
        <td style="padding:8px 0; color:#0f172a; text-align:right;">$${(
          it.price * it.quantity
        ).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif; background:#ffffff; color:#0f172a; padding:24px;">
    <tr><td style="font-size:22px; font-weight:700; color:#db4444;">Luxe Label</td></tr>
    <tr><td style="padding:12px 0 20px; font-size:16px; color:#0f172a;">Thanks for your order! Here’s your receipt.</td></tr>
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; padding:12px 0;">
        ${rows}
        <tr>
          <td style="padding-top:12px; font-weight:700; color:#db4444;">Total</td>
          <td></td>
          <td style="padding-top:12px; font-weight:700; color:#db4444; text-align:right;">$${total.toFixed(
            2
          )}</td>
        </tr>
      </table>
    </td></tr>
    <tr><td style="padding-top:16px; font-size:13px; color:#6b7280;">If you didn’t make this purchase, contact support.</td></tr>
  </table>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
