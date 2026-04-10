import { createClient } from "npm:@supabase/supabase-js@2";
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, recipient_email, recipient_phone, message, user_id, order_number, amount } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let status = "pending";
    let notificationMessage = message;

    if (type === "email" && recipient_email) {
      // In production, integrate with SMTP/email service
      notificationMessage = notificationMessage || `Hello,\n\nYour Nirva Jewellery order has been confirmed.\n\nOrder ID: ${order_number}\nAmount: ₹${amount?.toLocaleString('en-IN')}\n\nThank you for shopping with us!`;
      status = "sent";
      console.log(`Email notification sent to ${recipient_email}: ${notificationMessage}`);
    } else if (type === "whatsapp" && recipient_phone) {
      // In production, integrate with WhatsApp Business API
      notificationMessage = notificationMessage || `Hello,\n\nYour Nirva Jewellery order has been confirmed.\n\nOrder ID: ${order_number}\nAmount: ₹${amount?.toLocaleString('en-IN')}\n\nThank you for shopping with us!`;
      status = "sent";
      console.log(`WhatsApp notification sent to ${recipient_phone}: ${notificationMessage}`);
    }

    // Log notification
    await supabase.from("notifications").insert({
      user_id: user_id || null,
      recipient_email: recipient_email || null,
      recipient_phone: recipient_phone || null,
      message: notificationMessage,
      type,
      status,
    });

    return new Response(
      JSON.stringify({ success: true, status }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
