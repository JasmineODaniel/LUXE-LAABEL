import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const port = process.env.PORT || 4000;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-receipt", async (req, res) => {
  const { email, items, total } = req.body || {};

  if (!email || !Array.isArray(items) || typeof total !== "number") {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const html = renderReceiptHtml({ items, total });

  try {
    await resend.emails.send({
      from: "Luxe Label <no-reply@yourdomain.com>",
      to: email,
      subject: "Your Luxe Label order confirmation",
      html,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Email failed" });
  }
});

app.listen(port, () => {
  console.log(`Email service running on http://localhost:${port}`);
});

function renderReceiptHtml({ items, total }) {
  const rows = items
    .map(
      (it) => `
      <tr>
        <td style="padding:8px 0; color:#0f172a;">${it.name}</td>
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
