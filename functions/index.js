// const functions = require("firebase-functions");
const functions = require("firebase-functions");
const request = require('firebase-functions/lib/providers/https')

const config = functions.config();
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
const crypto = require("crypto");

// // Initialize Admin SDK for use in the server
// try {
admin.initializeApp();
// } catch (e) {}

let transporter = nodemailer.createTransport({
  secure: false,
  service: "gmail",
  auth: {
    user: config.user.email,
    pass: config.user.pass,
  },
});
let mailOptions;
// let mailOptions = {
//     from : 'biet.rajarhat@gmail.com',
//     to: 'roysantu2002@yahoo.com',
//     subject: 'Sample',
//     text: 'Hello'
// };

const validateFirebaseIdToken = async (req, res, next) => {
  const key = functions.config().app_name.key;

  const authorization = request.get('Authorization');
  const split =
    authorization ? authorization.split('Bearer ') : [];
  const bearerKey =
    split && split.length >= 2 ? split[1] : undefined;

  return key === bearerKey;
}


exports.sendMail = functions.https.onRequest((req, res) => {


  cors(req, res, () => {
    const { email } = req.query;
    const { options } = req.query;

    const key = functions.config().app_name.key;

    functions.logger.log("Key: ", key)
    const authorization = req.get('Authorization')
    const split =
      authorization ? authorization.split('Bearer ') : [];
    const bearerKey =
      split && split.length >= 2 ? split[1] : undefined;

    functions.logger.log("authorization", bearerKey)

    if (bearerKey !== key) { return }
    // console.log(`Options Param {options.Authorization}`)
    // // // Check for POST request
    // if (request.method !== "POST") {
    //   res.status(400).send("Please send a POST request");
    //   return;
    // }

    // // POST headers before sending to firebase server
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Authorization: "0d1d95a713908852bc1b98d7d382e82a80b5b115",
    //   }),
    // };

    // res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.set("Access-Control-Allow-Headers", "*");

    // firebase functions check
    // let key = functions.config().app_name.key;
    // let request_key = res.get("authorization");
    // if (key === request_key) {
    //   console.log("Awesome!!!");
    // } else {
    //   res.status(400).send("You shall not pass!!!");
    //   return;
    // }

    mailOptions = {
      from: `afterschooll`,
      to: email,
      subject: "We have received your message!",
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  >
  <head>
  <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG />
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  <![endif]-->
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    href="https://fonts.googleapis.com/css?family=Pacifico&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <title></title>
  <style type="text/css">
    p {
      margin: 0;
      padding: 0;
    }
    table {
      border-collapse: collapse;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      display: block;
      margin: 0;
      padding: 0;
    }
    img,
    a img {
      border: 0;
      height: auto;
      outline: none;
      text-decoration: none;
    }
    body,
    #bodyTable,
    #bodyCell {
      height: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
    }
    #outlook a {
      padding: 0;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    table {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    .ReadMsgBody {
      width: 100%;
    }
    .ExternalClass {
      width: 100%;
    }
    p,
    a,
    li,
    td,
    blockquote {
      mso-line-height-rule: exactly;
    }
    a[href^="tel"],
    a[href^="sms"] {
      color: inherit;
      cursor: default;
      text-decoration: none;
    }
    p,
    a,
    li,
    td,
    body,
    table,
    blockquote {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    @media only screen and (max-width: 480px) {
      .m_device_width {
        width: 100% !important;
        min-width: 100% !important;
        height: auto !important;
      }
      .m_db {
        display: block !important;
      }
      .text-center {
        text-align: center !important;
      }
      .mob_hidden {
        display: none !important;
      }
      .mob_ptb80lr20 {
        padding: 80px 25px !important;
      }
      .h_auto {
        height: auto !important;
      }
      .font11 {
        font-size: 11px !important;
      }
      .social_icon {
        width: 100% !important;
        min-width: 100% !important;
        height: auto !important;
      }
      .spacer {
        padding: 0% 5% !important;
      }
      .mob_pr12 {
        padding: 0px 12px 0px 0px !important;
      }
      .sm_icon {
        width: 14px !important;
      }
    }
  </style>
  </head>
  <body align="center" style="margin:0; padding:0; background:#e5e5e5;">
  <table
    align="center"
    width="100%"
    border="0"
    cellspacing="0"
    cellpadding="0"
    style="background:#e5e5e5"
    id="bodyTable"
  >
    <tr>
      <td align="center" id="bodyCell">
        <table
          align="center"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="background:#e5e5e5"
          class="m_device_width"
        >
          <tr>
            <td align="center">
              <table
                align="center"
                width="600"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="background:#000000"
                class="m_device_width"
              >
                <tr>
                  <td align="center">
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td align="center">
                          <a
                            href="https://afterschooll.com/"
                            target="_blank"
                          >
                            <img
                              align="center"
                              src="https://firebasestorage.googleapis.com/v0/b/react-19b73.appspot.com/o/images%2Femailheader.png?alt=media&token=60a08173-cc56-4b5f-aa65-b2918c33a6f3"
                              alt="afterschoolapps"
                              width="600"
                              height=""
                              style="width:600px; max-width:600px; display:block;"
                              class="m_device_width"
                            />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table
                align="center"
                width="600"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="background:#000000"
                class="m_device_width"
              >
                <tr>
                  <td
                    align="center"
                    background="https://i.imgur.com/OOD0bZL.jpg"
                    bgcolor="#ffffff"
                    width="600"
                    height="617"
                    valign="top"
                    style="background-repeat:no-repeat;"
                    class="h_auto m_device_width"
                  >
                    <!--[if gte mso 9]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:617px;">
                <v:fill type="tile" src="https://i.imgur.com/OOD0bZL.jpg" color="#ffffff" />
                <v:textbox inset="0,0,0,0">
                <![endif]-->
                    <div>
                      <table
                        align="center"
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tr>
                          <td
                            align="center"
                            width="85"
                            style="width:85px"
                            class="mob_hidden"
                          >
                            <img
                              align="center"
                              src="https://i.imgur.com/HR1pI0g.gif"
                              alt=""
                              width="85"
                              style="width:85px; display:block"
                            />
                          </td>
                          <td
                            align="center"
                            style="padding:160px 0px"
                            class="mob_ptb80lr20"
                          >
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              style="background:#ff3422; border-radius:10px; box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.32);"
                            >
                              <tr>
                                <td
                                  align="center"
                                  style="padding:85px 35px 110px 35px"
                                >
                                  <table
                                    align="center"
                                    width="100%"
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="font-family: 'Pacifico', 'Roboto', Tahoma, sans-serif; font-size:34.28px; font-weight:normal; line-height:35px; color:#fff; text-align:center;"
                                      >
                                        Hello
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="padding:20px 0px 0px 0px; font-family: 'Roboto', Tahoma, Segoe, sans-serif; font-size:20px; font-weight:normal; line-height:25.50px; color:#fff; text-align:center;"
                                      >
                                        Thanks for sending us a message! We’ll
                                        get back to you as soon as possible.
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            align="center"
                            width="85"
                            style="width:85px"
                            class="mob_hidden"
                          >
                            <img
                              align="center"
                              src="https://i.imgur.com/HR1pI0g.gif"
                              alt=""
                              width="85"
                              style="width:85px; display:block"
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!--[if gte mso 9]>
                </v:textbox>
                </v:rect>
                <![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table
                align="center"
                width="600"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="background:#ff3422"
                class="m_device_width"
              >
                <tr>
                  <td align="center">
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <th
                          align="left"
                          valign="middle"
                          width="64.666666%"
                          style="width: 64.666666%; background-repeat:no-repeat; background-position:top right"
                          background="https://firebasestorage.googleapis.com/v0/b/react-19b73.appspot.com/o/images%2Fadornment.png?alt=media&token=4c0cb2da-4dd7-4d79-bd79-49487e35bfc7"
                        >
                          <table
                            align="center"
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td align="center" style="padding:40px 10px">
                                <table
                                  align="center"
                                  width="100%"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      width="18"
                                      style="width:18px; padding:0px 0px 7px 0px"
                                    >
                                       <img
                                            align="left"
                                            src="https://i.imgur.com/ZtalTud.png"
                                            alt=""
                                            width="18"
                                            height="18"
                                            style="width:18px; max-width:18px; display:block"
                                            class="sm_icon"
                                          />
                                    </td>
                                    <td
                                      align="left"
                                      style="padding:0px 0px 7px 5px;font-family: 'Roboto', Tahoma, Segoe, sans-serif; font-size:13.70px; font-weight:normal; line-height:14px; color:#ffffff; text-align:left;"
                                      class="font11"
                                    >
                                      (+91) 9830-292-877
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      width="18"
                                      style="width:18px;"
                                    >
                      
                                      <img
                                        align="left"
                                        src="https://i.imgur.com/9T7w2Kv.png"
                                        alt=""
                                        width="18"
                                        height="12"
                                        style="width:18px; max-width:18px; display:block"
                                        class="sm_icon"
                                      />
                                    </td>
                                    <td
                                      align="left"
                                      style="padding:0px 0px 0px 5px;font-family: 'Roboto', Tahoma, Segoe, sans-serif; font-size:10px; font-weight:normal; line-height:14px; color:#ffffff; text-align:left;"
                                      class="font11"
                                    >
                                      <a
                                        href="mailto:info@afterschooll.com"
                                        style="color:#ffffff; text-decoration:none!important"
                                        >info@afterschooll.com</a
                                      >
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </th>
                        <th
                          align="left"
                          valign="middle"
                          bgcolor="#ff3422"
                          width="35.333333%"
                          style="width: 35.333333%;"
                        >
                          <table
                            align="center"
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                align="center"
                                style="padding:0px 44px 0px 0px"
                                class="mob_pr12"
                              >
                                <table
                                  align="right"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding:0px 14px"
                                      class="spacer"
                                    >
                                      <a
                                        href=""
                                        target="_blank"
                                      >
                                    
                                       <img
                                          align="center"
                                          src="https://i.imgur.com/auxeind.png"
                                          alt=""
                                          width="31"
                                          height="31"
                                          style="width:31px; max-width:31px; display:block"
                                          class="social_icon"
                                        />
                                      </a>
                                    </td>
                                    <td
                                      align="center"
                                      style="padding:0px 14px"
                                      class="spacer"
                                    >
                                      <a
                                        href=""
                                        target="_blank"
                                      >
                                        <img
                                          align="center"
                                          src="https://i.imgur.com/QV0qmLC.png"
                                          alt=""
                                          width="30"
                                          height="25"
                                          style="width:30px; max-width:30px; display:block"
                                          class="social_icon"
                                        />
                                      </a>
                                    </td>
                                    <td
                                      align="center"
                                      style="padding:0px 14px"
                                      class="spacer"
                                    >
                                      <a
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                      >
                                        <img
                                          align="center"
                                          src="https://i.imgur.com/wPb7ijk.png"
                                          alt=""
                                          width="17"
                                          height="31"
                                          style="width:17px; max-width:17px; display:block"
                                          class="social_icon"
                                        />
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </th>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  </body>
  </html>
        `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send("Success");
      }
    });
  });
});
