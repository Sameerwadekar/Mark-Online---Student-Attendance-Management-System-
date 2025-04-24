exports.registerEmail = (username) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Welcome to Mark Online</title>
        </head>
        <body style="background-color: #f4f4f4; margin: 0; padding: 0; font-family: Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" width="600px" cellspacing="0" cellpadding="0" border="0" 
                  style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                  
                  <!-- Header -->
                  <tr>
                    <td align="center" style="background-color: #4a90e2; padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
                      Welcome to Mark Online 🎉
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 20px; color: #333; font-size: 16px;">
                      <p>Hi <strong>${username}</strong>,</p>
                      <p>
                        Thank you for signing up for <strong>Mark Online</strong>. We are excited to have you on board! 
                        You can now manage student attendance seamlessly with our platform.
                      </p>
                      <p>To get started, click the button below:</p>
                      
                      <p style="margin-top: 30px;">
                        If you have any questions, feel free to contact our support team.
                      </p>
                      <p>Happy tracking! 📊</p>
                    </td>
                  </tr>
  
                  <!-- Footer -->
                  <tr>
                    <td align="center" style="background-color: #222; color: #ffffff; padding: 15px; font-size: 14px;">
                      &copy; 2025 Mark Online. All Rights Reserved. <br />
                      <a href="https://markonline.com" style="color: #4a90e2; text-decoration: none;">Visit our website</a> |
                      <a href="mailto:support@markonline.com" style="color: #4a90e2; text-decoration: none;">Contact Support</a>
                    </td>
                  </tr>
  
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
};
