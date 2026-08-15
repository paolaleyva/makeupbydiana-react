import emailjs from "@emailjs/browser";

const SUBJECTS = {
  service_booking: {
    client: (p) => `You're booked! ${p.service_name || "Your appointment"} is confirmed`,
    owner: (p) => `New booking: ${p.client_name} — ${p.service_name || ""}`,
  },
  event_inquiry: {
    client: () => "We received your event inquiry",
    owner: (p) => `New event inquiry: ${p.client_name}`,
  },
  general_contact: {
    client: () => "We received your message",
    owner: (p) => `New contact message: ${p.client_name}`,
  },
};

/**
 * Sends one confirmation email to the client and one notification/record
 * copy to Diana, using the same EmailJS template for both. Which inbox
 * each lands in is controlled by the `to_email` param passed at send time.
 *
 * Also computes boolean flags (is_client / is_owner / is_service_booking / etc.)
 * and an `email_subject` string, so the EmailJS template can branch its wording
 * per flow and per recipient without any logic needing to live in the template itself.
 *
 * @param {object} params - shared template variables (client_name, event_date, etc.)
 * @param {string} params.client_email - required, used as the client's `to_email`
 * @param {string} params.client_name - required, used as the client's `to_name`
 * @param {string} requestType - "service_booking" | "event_inquiry" | "general_contact"
 */
export async function sendConfirmationEmails(params, requestType) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const dianaEmail = import.meta.env.VITE_BUSINESS_EMAIL;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS env vars not set - skipping email send.");
    return;
  }

  function buildParams(role) {
    return {
      ...params,
      to_email: role === "client" ? params.client_email : dianaEmail,
      to_name: role === "client" ? params.client_name : "Diana",
      recipient_role: role,
      request_type: requestType,
      email_subject: SUBJECTS[requestType][role](params),
      reply_to: role === "owner" ? params.client_email : dianaEmail,
      is_client: role === "client",
      is_owner: role === "owner",
      is_service_booking: requestType === "service_booking",
      is_event_inquiry: requestType === "event_inquiry",
      is_general_contact: requestType === "general_contact",
    };
  }

  // Confirmation to the client
  await emailjs.send(serviceId, templateId, buildParams("client"), { publicKey });

  // Notification/record copy to Diana
  if (dianaEmail) {
    await emailjs.send(serviceId, templateId, buildParams("owner"), { publicKey });
  }
}