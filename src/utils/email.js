export const sendEmailNotification = async (type, data) => {
  // EmailJS Configuration
  const SERVICE_ID = 'service_cbwqxz8';
  const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Placeholder
  const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Placeholder

  if (TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
    console.warn('EmailJS not configured. Skipping email notification.', { type, data });
    return;
  }

  // Get Admin Notification Email from Settings, fallback to a default
  const settings = JSON.parse(localStorage.getItem('system_settings') || '{}');
  const adminEmail = settings.notificationEmail || 'admin@policyperfect.co.in';

  let message = '';
  let subject = '';

  if (type === 'LEAD') {
    subject = `New Lead: ${data.productType}`;
    message = `
      Name: ${data.name}
      Mobile: ${data.mobile}
      Email: ${data.email}
      Product: ${data.productType}
      Details: ${JSON.stringify(data, null, 2)}
    `;
  } else if (type === 'CLAIM') {
    subject = `New Claim Intimation: ${data.policyNo}`;
    message = `
      Policy: ${data.policyNo}
      Customer: ${data.name}
      Mobile: ${data.mobile}
      Description: ${data.incidentDesc}
    `;
  }

  const templateParams = {
    to_email: adminEmail,
    subject: subject,
    message: message,
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: templateParams
      })
    });

    if (response.ok) {
      console.log('Email notification sent successfully!');
    } else {
      console.error('Failed to send email notification:', await response.text());
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};
