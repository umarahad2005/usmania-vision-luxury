import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { sendEmail, contactEmailTemplate } from '@/integrations/brevo/client.server';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export const sendContactFn = createServerFn({ method: 'POST' })
  .validator(schema)
  .handler(async ({ data }) => {
    const template = contactEmailTemplate(data);
    const result = await sendEmail(template);
    if (!result.success) {
      throw new Error('Failed to send message. Please try WhatsApp instead.');
    }
    return { success: true };
  });
