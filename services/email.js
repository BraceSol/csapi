require('dotenv').config();
const mailjet = require('node-mailjet').connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
)
const senderMail = process.env.mail;
const senderName = process.env.senderName;

exports.sendPinMail = async(mailData) => {
    try {
        let isSend = await sendPin(mailData);
    } catch (error) {
        console.log("============ pin email send error ================", error);
    }
}
exports.sendWelcomeMail = async(mailData) => {
    try {
        let isSend = await sendWelcome(mailData);
    } catch (error) {
        console.log("============ welcome email send error ================", error);
    }
}
const sendWelcome = async(mailData) => {
    try {
        const mail = mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [{
                    From: {
                        Email: senderMail,
                        Name: senderName,
                    },
                    To: [{
                        Email: mailData.email,
                        Name: mailData.name,
                    }, ],
                    Subject: mailData.subject,
                    HTMLPart: `<!doctype html>
                  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                  
                  <head>
                      <title>Confirmation code</title>
                      <!--[if !mso]><!-- -->
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <!--<![endif]-->
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                      <meta name="viewport" content="width=device-width,initial-scale=1">
                      <style type="text/css">
                          #outlook a {
                              padding: 0;
                          }
                          
                          body {
                              margin: 0;
                              padding: 0;
                              -webkit-text-size-adjust: 100%;
                              -ms-text-size-adjust: 100%;
                          }
                          
                          table,
                          td {
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                          }
                          
                          img {
                              border: 0;
                              height: auto;
                              line-height: 100%;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                          }
                          
                          p {
                              display: block;
                              margin: 13px 0;
                          }
                      </style>
                      <!--[if mso]>
                          <xml>
                          <o:OfficeDocumentSettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                          </o:OfficeDocumentSettings>
                          </xml>
                          <![endif]-->
                      <!--[if lte mso 11]>
                          <style type="text/css">
                            .mj-outlook-group-fix { width:100% !important; }
                          </style>
                          <![endif]-->
                      <style type="text/css">
                          @media only screen and (min-width:480px) {
                              .mj-column-per-100 {
                                  width: 100% !important;
                                  max-width: 100%;
                              }
                          }
                      </style>
                      <style type="text/css">
                          [owa] .mj-column-per-100 {
                              width: 100% !important;
                              max-width: 100%;
                          }
                      </style>
                      <style type="text/css">
                          @media only screen and (max-width:480px) {
                              table.mj-full-width-mobile {
                                  width: 100% !important;
                              }
                              td.mj-full-width-mobile {
                                  width: auto !important;
                              }
                          }
                      </style>
                  </head>
                  
                  <body style="background-color:#F4F4F4;">
                      <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Aqib Javed</div>
                      <div style="background-color:#F4F4F4;">
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td style="width:310px;"><img alt="" height="auto" src="https://xk3i1.mjt.lu/tplimg/xk3i1/b/0h8jn/xo5gt.png" style="border:none;border-radius:px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                                  width="310"></td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <h1 class="text-build-content" data-testid="Fpjl-wxTpQT" style="margin-top: 10px; margin-bottom: 10px; font-weight: normal;">Welcome ${mailData.name}</h1>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" data-testid="WFGU1G4kWYk" style="margin: 10px 0; margin-top: 10px;">Welcome to CS. Please enjoy the service.</p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td style="width:310px;"><img alt="" height="auto" src="https://xk3i1.mjt.lu/tplimg/xk3i1/b/0h8jn/xo5gt.png" style="border:none;border-radius:px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                                  width="310"></td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" data-testid="r0CHTsB4bUy" style="margin: 10px 0; margin-top: 10px; margin-bottom: 10px;">This email is generated by server please do not reply to this mail.</p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" style="text-align: center; margin: 10px 0; margin-top: 10px; margin-bottom: 10px;" data-testid="IfyVmqqBXxN"><span style="color:#55575d;font-family:Arial;font-size:13px;line-height:22px;">This e-mail has been sent to [[EMAIL_TO]]</span></p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" style="text-align: center; margin: 10px 0; margin-top: 10px; margin-bottom: 10px;" data-testid="FzsHPDluQbB">CS</p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td style="vertical-align:top;padding:0;">
                                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                      <tr>
                                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                                              <div style="font-family:Arial, sans-serif;font-size:11px;letter-spacing:normal;line-height:22px;text-align:center;color:#000000;">
                                                                                  <p style="margin: 10px 0;">This e-mail has been sent to ${mailData.email}.</p>
                                                                              </div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                                              <div style="font-family:Arial, sans-serif;font-size:11px;letter-spacing:normal;line-height:22px;text-align:center;color:#000000;">
                                                                                  <p style="margin: 10px 0;"> </p>
                                                                              </div>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                      </div>
                  </body>
                  
                  </html>`,
                }, ],
            })
            .then(result => {
                console.log(result.body)
                if (result) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(err => {
                console.log("============ send welcome mail error catch =============", err);
                console.log(err.statusCode);
                return false;
            })
    } catch (error) {
        console.log("============ send welcome mail error =============", error);
        return false;
    }
}
const sendPin = async(mailData) => {
    try {
        const mail = mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [{
                    From: {
                        Email: senderMail,
                        Name: senderName,
                    },
                    To: [{
                        Email: mailData.email,
                        Name: mailData.name,
                    }, ],
                    Subject: mailData.subject,
                    HTMLPart: `<!doctype html>
                  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                  
                  <head>
                      <title>Confirmation code</title>
                      <!--[if !mso]><!-- -->
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <!--<![endif]-->
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                      <meta name="viewport" content="width=device-width,initial-scale=1">
                      <style type="text/css">
                          #outlook a {
                              padding: 0;
                          }
                          
                          body {
                              margin: 0;
                              padding: 0;
                              -webkit-text-size-adjust: 100%;
                              -ms-text-size-adjust: 100%;
                          }
                          
                          table,
                          td {
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                          }
                          
                          img {
                              border: 0;
                              height: auto;
                              line-height: 100%;
                              outline: none;
                              text-decoration: none;
                              -ms-interpolation-mode: bicubic;
                          }
                          
                          p {
                              display: block;
                              margin: 13px 0;
                          }
                      </style>
                      <!--[if mso]>
                          <xml>
                          <o:OfficeDocumentSettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                          </o:OfficeDocumentSettings>
                          </xml>
                          <![endif]-->
                      <!--[if lte mso 11]>
                          <style type="text/css">
                            .mj-outlook-group-fix { width:100% !important; }
                          </style>
                          <![endif]-->
                      <style type="text/css">
                          @media only screen and (min-width:480px) {
                              .mj-column-per-100 {
                                  width: 100% !important;
                                  max-width: 100%;
                              }
                          }
                      </style>
                      <style type="text/css">
                          [owa] .mj-column-per-100 {
                              width: 100% !important;
                              max-width: 100%;
                          }
                      </style>
                      <style type="text/css">
                          @media only screen and (max-width:480px) {
                              table.mj-full-width-mobile {
                                  width: 100% !important;
                              }
                              td.mj-full-width-mobile {
                                  width: auto !important;
                              }
                          }
                      </style>
                  </head>
                  
                  <body style="background-color:#F4F4F4;">
                      <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Aqib Javed</div>
                      <div style="background-color:#F4F4F4;">
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td style="width:310px;"><img alt="" height="auto" src="https://xk3i1.mjt.lu/tplimg/xk3i1/b/0h8jn/xo5gt.png" style="border:none;border-radius:px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                                  width="310"></td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <h1 class="text-build-content" data-testid="Fpjl-wxTpQT" style="margin-top: 10px; margin-bottom: 10px; font-weight: normal;">Welcome ${mailData.name}</h1>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" data-testid="WFGU1G4kWYk" style="margin: 10px 0; margin-top: 10px;">To complete the procedure please enter the following 6 digit pin code.</p>
                                                                  <p class="text-build-content" style="text-align: center; margin: 10px 0; margin-bottom: 10px;" data-testid="WFGU1G4kWYk">${mailData.pinCode}</p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td style="width:310px;"><img alt="" height="auto" src="https://xk3i1.mjt.lu/tplimg/xk3i1/b/0h8jn/xo5gt.png" style="border:none;border-radius:px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                                  width="310"></td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" data-testid="r0CHTsB4bUy" style="margin: 10px 0; margin-top: 10px; margin-bottom: 10px;">This email is generated by server please do not reply to this mail.</p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" style="text-align: center; margin: 10px 0; margin-top: 10px; margin-bottom: 10px;" data-testid="IfyVmqqBXxN"><span style="color:#55575d;font-family:Arial;font-size:13px;line-height:22px;">This e-mail has been sent to [[EMAIL_TO]]</span></p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td align="left" style="font-size:0px;padding:0px 20px 0px 20px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                              <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                  <p class="text-build-content" style="text-align: center; margin: 10px 0; margin-top: 10px; margin-bottom: 10px;" data-testid="FzsHPDluQbB">CS</p>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                  <tbody>
                                      <tr>
                                          <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td style="vertical-align:top;padding:0;">
                                                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                      <tr>
                                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                                              <div style="font-family:Arial, sans-serif;font-size:11px;letter-spacing:normal;line-height:22px;text-align:center;color:#000000;">
                                                                                  <p style="margin: 10px 0;">This e-mail has been sent to ${mailData.email}.</p>
                                                                              </div>
                                                                          </td>
                                                                      </tr>
                                                                      <tr>
                                                                          <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                                              <div style="font-family:Arial, sans-serif;font-size:11px;letter-spacing:normal;line-height:22px;text-align:center;color:#000000;">
                                                                                  <p style="margin: 10px 0;"> </p>
                                                                              </div>
                                                                          </td>
                                                                      </tr>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </div>
                                              <!--[if mso | IE]></td></tr></table><![endif]-->
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                      </div>
                  </body>
                  
                  </html>`,
                }, ],
            })
            .then(result => {
                console.log(result.body)
                if (result) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(err => {
                console.log("============ send pin mail error catch =============", err);
                console.log(err.statusCode);
                return false;
            })
    } catch (error) {
        console.log("============ send pin mail error =============", error);
        return false;
    }
}