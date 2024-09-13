import dbConnect from "../../utils/dbConnect";
import CA from "../../utils/models/caSchema";
import Contributors from "../../utils/models/contributorsSchema";
import Mentor from "../../utils/models/mentorSchema";
import ProjectAdmin from "../../utils/models/projectAdminSchema";
import nodemailer from "nodemailer";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const handler = async (req, res) => {
  const { method } = req;

  console.log(`Received ${method} request`);

  await dbConnect();

  if (method === "POST") {
    try {
      const { role, ...formData } = req.body;
      const email = formData.email;
      const name = formData.name;
      let savedData;
      let subject;
      let body;

      switch (role) {
        case "CA":
          savedData = await CA.create(formData);
          subject =
            "Thank You for Applying as a Campus Ambassador for GSSoC '24 Extended! 🌟";
          body = `
          <body style="padding: 0; margin: 0; background-color: #f1f1f1; width: 100%; height: 100%;">
  <div style="width: 90%; max-width: 600px; height: auto; background-color: #ffffff; margin: auto; position: relative; overflow: hidden;">
    <table cellspacing="0" cellpadding="0" width="100%" align="center">
      <tbody>
        <tr>
          <td valign="middle" width="33.33%" align="center" style="padding-top: 20px; padding-bottom: 20px;">
            <a target="_blank" style="background-color:white;">
              <img src="https://github.com/user-attachments/assets/62aa7d8e-5eb1-44b2-aaba-5d0c436a2ce7" alt="" width="100%">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div>
      <img style="width: 100%; height: auto; object-fit: cover;" src="https://github.com/user-attachments/assets/e8a0dfd6-e243-4594-a209-cde2f48d1505" alt="">
    </div>

    <div style="height: auto; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 10px;">
      <h1 style="font-size: 1.8em; color: #515151;">
        Thank you for applying to be a Campus Ambassador for GSSoC '24 Extended!
      </h1>
    </div>

<div style="padding: 20px;">
  <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
    Dear ${name},
    <br/><br/>
    We are thrilled to have your support in spreading awareness about open-source and empowering more students to join this incredible journey. 🚀
    <br/><br/>
    We are reviewing all applications, and you will receive a confirmation email regarding your selection soon. Please keep an eye on your inbox for further updates!
    <br/><br/>
    In the meantime, feel free to spread the word among your friends, college community, and network so they don’t miss out on the exciting opportunities that GSSoC '24 Extended has to offer!
    <br/><br/>
    👉 Subscribe to our newsletter to stay informed about all the latest updates.<a href="https://gssoc.substack.com/subscribe">Subscribe</a><br/>
    👉 Connect with our Program Managers for additional guidance and support:
    <br/><br/>
    <ul style="padding-left: 20px;">
      <li><a href="https://www.linkedin.com/in/sanjay-k-v/" style="color: #515151; text-decoration:none; font-weight: bold;">Sanjay KV</a></li>
      <li><a href="https://www.linkedin.com/in/hemu21/" style="color: #515151; text-decoration:none; font-weight: bold;">Hemanth Kumar</a></li>
      <li><a href="https://www.linkedin.com/in/mastan-sayyad-126904223/" style="color: #515151; text-decoration:none; font-weight: bold;">Mastan Sayyad</a></li>
      <li><a href="https://www.linkedin.com/in/radhikamalpani1702/" style="color: #515151; text-decoration:none; font-weight: bold;">Radhika Malpani</a></li>
      <li><a href="https://www.linkedin.com/in/suhani-singh-paliwal/" style="color: #515151; text-decoration:none; font-weight: bold;">Suhani Singh Paliwal</a></li>
    </ul>
  </p>
</div>


    <div style="background-color: #df551a; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="font-size: 1.5em; font-weight: bolder; color: #ffffff;">
        Our Vision for GSSOC'24 Extended
      </h1>
      <p style="font-size: 1.2em;">Empowering Developers, Expanding Horizons</p>
      <p style="font-size: 1em; font-weight: 200; color: #ffffff;">
        The GSSoC'24 Extended Program offers an additional 30 days of open-source collaboration following the success of GSSoC'24. This extension allows developers to continue learning, contributing, and growing within the open-source community, fostering innovation and engagement.
      </p>
    </div>
    <div style="padding-right: 20px; padding-left:20px;padding-top:20px;padding-bottom:5px;">
      <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
      We look forward to having you as a Campus Ambassador, helping us make GSSoC '24 Extended a memorable and impactful event. Your role will be key to inspiring future contributors!<br/>
      Stay tuned, and thank you for being a part of this amazing initiative!
      </p>
      </div>
    <div style="height: auto; color: #848484; font-size: 1em; text-align: center; padding: 10px;">
      <h3>
            <br/>Best regards,<br/>
            The GSSoC '24 Extended Team
      </h3>
    </div>

    <div style="height: 0.5px; background-color: #515151; margin: 20px 0;"></div>

    <table cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td width="600" align="left">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center" style="font-size: 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://x.com/girlscriptsoc?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                              <img title="X" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/x-logo-colored.png" alt="X" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://www.instagram.com/girlscriptsummerofcode/?hl=en">
                              <img title="Instagram" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Instagram" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://github.com/girlscript">
                              <img title="GitHub" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/github-logo-colored.png" alt="GitHub" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="mailto:gssoc@girlscript.tech">
                              <img title="Gmail" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/gmail-logo-colored.png" alt="Gmail" width="32">
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p>GSSoC Extd. © 2024, All Rights Reserved.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">Visit Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/contact" style="color: #999999;">Contact Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">About</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
          `;
          break;
        case "Contributor":
          savedData = await Contributors.create(formData);
          subject = "Thank You for Applying to GSSoC '24 Extended! 🌟";
          body = `
            <body style="padding: 0; margin: 0; background-color: #f1f1f1; width: 100%; height: 100%;">
  <div style="width: 90%; max-width: 600px; height: auto; background-color: #ffffff; margin: auto; position: relative; overflow: hidden;">
    <table cellspacing="0" cellpadding="0" width="100%" align="center">
      <tbody>
        <tr>
          <td valign="middle" width="33.33%" align="center" style="padding-top: 20px; padding-bottom: 20px;">
            <a target="_blank" style="background-color:white;">
              <img src="https://github.com/user-attachments/assets/62aa7d8e-5eb1-44b2-aaba-5d0c436a2ce7" alt="" width="100%">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div>
      <img style="width: 100%; height: auto; object-fit: cover;" src="https://github.com/user-attachments/assets/e8a0dfd6-e243-4594-a209-cde2f48d1505" alt="">
    </div>

    <div style="height: auto; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 10px;">
      <h1 style="font-size: 1.8em; color: #515151;">
        Thank you for applying to be a Campus Ambassador for GSSoC '24 Extended!
      </h1>
    </div>

<div style="padding: 20px;">
  <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
    Dear ${name},
    <br/><br/>
    Thank you for applying to contribute to GSSoC '24 Extended! We are thrilled to have you express interest in joining our community. 🚀
    <br/><br/>
We are currently reviewing applications, and you will receive a selection email soon. Stay tuned for further updates and next steps!
    <br/><br/>
In the meantime, help spread the word by telling your friends, college peers, and loved ones about this amazing opportunity. Make sure they don't miss out on GSSoC '24 Extended!
    <br/><br/>
        👉 Subscribe to our newsletter to stay informed about all the latest updates.<a href="https://gssoc.substack.com/subscribe">Subscribe</a><br/>
    👉 Connect with our Program Managers for additional guidance and support:
    <br/><br/>
    <ul style="padding-left: 20px;">
      <li><a href="https://www.linkedin.com/in/sanjay-k-v/" style="color: #515151; text-decoration:none; font-weight: bold;">Sanjay KV</a></li>
      <li><a href="https://www.linkedin.com/in/hemu21/" style="color: #515151; text-decoration:none; font-weight: bold;">Hemanth Kumar</a></li>
      <li><a href="https://www.linkedin.com/in/mastan-sayyad-126904223/" style="color: #515151; text-decoration:none; font-weight: bold;">Mastan Sayyad</a></li>
      <li><a href="https://www.linkedin.com/in/radhikamalpani1702/" style="color: #515151; text-decoration:none; font-weight: bold;">Radhika Malpani</a></li>
      <li><a href="https://www.linkedin.com/in/suhani-singh-paliwal/" style="color: #515151; text-decoration:none; font-weight: bold;">Suhani Singh Paliwal</a></li>
    </ul>
  </p>
</div>


    <div style="background-color: #df551a; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="font-size: 1.5em; font-weight: bolder; color: #ffffff;">
        Our Vision for GSSOC'24 Extended
      </h1>
      <p style="font-size: 1.2em;">Empowering Developers, Expanding Horizons</p>
      <p style="font-size: 1em; font-weight: 200; color: #ffffff;">
        The GSSoC'24 Extended Program offers an additional 30 days of open-source collaboration following the success of GSSoC'24. This extension allows developers to continue learning, contributing, and growing within the open-source community, fostering innovation and engagement.
      </p>
    </div>
    <div style="padding-right: 20px; padding-left:20px;padding-top:20px;padding-bottom:5px;">
      <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
      We look forward to having you as a Campus Ambassador, helping us make GSSoC '24 Extended a memorable and impactful event. Your role will be key to inspiring future contributors!<br/>
      Stay tuned, and thank you for being a part of this amazing initiative!
      </p>
      </div>
    <div style="height: auto; color: #848484; font-size: 1em; text-align: center; padding: 10px;">
      <h3>
            <br/>Best regards,<br/>
            The GSSoC '24 Extended Team
      </h3>
    </div>

    <div style="height: 0.5px; background-color: #515151; margin: 20px 0;"></div>

    <table cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td width="600" align="left">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center" style="font-size: 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://x.com/girlscriptsoc?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                              <img title="X" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/x-logo-colored.png" alt="X" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://www.instagram.com/girlscriptsummerofcode/?hl=en">
                              <img title="Instagram" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Instagram" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://github.com/girlscript">
                              <img title="GitHub" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/github-logo-colored.png" alt="GitHub" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="mailto:gssoc@girlscript.tech">
                              <img title="Gmail" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/gmail-logo-colored.png" alt="Gmail" width="32">
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p>GSSoC Extd. © 2024, All Rights Reserved.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">Visit Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/contact" style="color: #999999;">Contact Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">About</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
          `;
          break;
        case "Mentor":
          savedData = await Mentor.create(formData);
          subject =
            "Thank You for Applying as a Mentor for GSSoC '24 Extended! 🌟";
          body = `
             <body style="padding: 0; margin: 0; background-color: #f1f1f1; width: 100%; height: 100%;">
  <div style="width: 90%; max-width: 600px; height: auto; background-color: #ffffff; margin: auto; position: relative; overflow: hidden;">
    <table cellspacing="0" cellpadding="0" width="100%" align="center">
      <tbody>
        <tr>
          <td valign="middle" width="33.33%" align="center" style="padding-top: 20px; padding-bottom: 20px;">
            <a target="_blank" style="background-color:white;">
              <img src="https://github.com/user-attachments/assets/62aa7d8e-5eb1-44b2-aaba-5d0c436a2ce7" alt="" width="100%">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div>
      <img style="width: 100%; height: auto; object-fit: cover;" src="https://github.com/user-attachments/assets/e8a0dfd6-e243-4594-a209-cde2f48d1505" alt="">
    </div>

    <div style="height: auto; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 10px;">
      <h1 style="font-size: 1.8em; color: #515151;">
        Thank you for applying to be a Campus Ambassador for GSSoC '24 Extended!
      </h1>
    </div>

<div style="padding: 20px;">
  <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
    Dear ${name},
    <br/><br/>
   Thank you for applying to be a mentor for GSSoC '24 Extended! We are excited about your interest in guiding the next generation of open-source contributors. 🎉
    <br/><br/>
We are currently reviewing mentor applications, and you will receive a confirmation email regarding your selection soon. Stay tuned for more details on the next steps!
    <br/><br/>
In the meantime, we encourage you to let your friends, colleagues, and networks know about this incredible opportunity. Let’s work together to inspire and support more contributors in GSSoC '24 Extended!
    <br/><br/>
       👉 Subscribe to our newsletter to stay informed about all the latest updates.<a href="https://gssoc.substack.com/subscribe">Subscribe</a><br/>
    👉 Connect with our Program Managers for additional guidance and support:
    <br/><br/>
    <ul style="padding-left: 20px;">
      <li><a href="https://www.linkedin.com/in/sanjay-k-v/" style="color: #515151; text-decoration:none; font-weight: bold;">Sanjay KV</a></li>
      <li><a href="https://www.linkedin.com/in/hemu21/" style="color: #515151; text-decoration:none; font-weight: bold;">Hemanth Kumar</a></li>
      <li><a href="https://www.linkedin.com/in/mastan-sayyad-126904223/" style="color: #515151; text-decoration:none; font-weight: bold;">Mastan Sayyad</a></li>
      <li><a href="https://www.linkedin.com/in/radhikamalpani1702/" style="color: #515151; text-decoration:none; font-weight: bold;">Radhika Malpani</a></li>
      <li><a href="https://www.linkedin.com/in/suhani-singh-paliwal/" style="color: #515151; text-decoration:none; font-weight: bold;">Suhani Singh Paliwal</a></li>
    </ul>
  </p>
</div>


    <div style="background-color: #df551a; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="font-size: 1.5em; font-weight: bolder; color: #ffffff;">
        Our Vision for GSSOC'24 Extended
      </h1>
      <p style="font-size: 1.2em;">Empowering Developers, Expanding Horizons</p>
      <p style="font-size: 1em; font-weight: 200; color: #ffffff;">
        The GSSoC'24 Extended Program offers an additional 30 days of open-source collaboration following the success of GSSoC'24. This extension allows developers to continue learning, contributing, and growing within the open-source community, fostering innovation and engagement.
      </p>
    </div>
    <div style="padding-right: 20px; padding-left:20px;padding-top:20px;padding-bottom:5px;">
      <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
      We look forward to having you as a Campus Ambassador, helping us make GSSoC '24 Extended a memorable and impactful event. Your role will be key to inspiring future contributors!<br/>
      Stay tuned, and thank you for being a part of this amazing initiative!
      </p>
      </div>
    <div style="height: auto; color: #848484; font-size: 1em; text-align: center; padding: 10px;">
      <h3>
            <br/>Best regards,<br/>
            The GSSoC '24 Extended Team
      </h3>
    </div>

    <div style="height: 0.5px; background-color: #515151; margin: 20px 0;"></div>

    <table cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td width="600" align="left">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center" style="font-size: 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://x.com/girlscriptsoc?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                              <img title="X" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/x-logo-colored.png" alt="X" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://www.instagram.com/girlscriptsummerofcode/?hl=en">
                              <img title="Instagram" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Instagram" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://github.com/girlscript">
                              <img title="GitHub" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/github-logo-colored.png" alt="GitHub" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="mailto:gssoc@girlscript.tech">
                              <img title="Gmail" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/gmail-logo-colored.png" alt="Gmail" width="32">
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p>GSSoC Extd. © 2024, All Rights Reserved.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">Visit Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/contact" style="color: #999999;">Contact Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">About</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
          `;
          break;
        case "ProjectAdmin":
          savedData = await ProjectAdmin.create(formData);
          subject =
            "Thank You for Applying as a Project Admin and Submitting Your Project for GSSoC '24 Extended! 🌟";
          body = `
                        <body style="padding: 0; margin: 0; background-color: #f1f1f1; width: 100%; height: 100%;">
  <div style="width: 90%; max-width: 600px; height: auto; background-color: #ffffff; margin: auto; position: relative; overflow: hidden;">
    <table cellspacing="0" cellpadding="0" width="100%" align="center">
      <tbody>
        <tr>
          <td valign="middle" width="33.33%" align="center" style="padding-top: 20px; padding-bottom: 20px;">
            <a target="_blank" style="background-color:white;">
              <img src="https://github.com/user-attachments/assets/62aa7d8e-5eb1-44b2-aaba-5d0c436a2ce7" alt="" width="100%">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div>
      <img style="width: 100%; height: auto; object-fit: cover;" src="https://github.com/user-attachments/assets/e8a0dfd6-e243-4594-a209-cde2f48d1505" alt="">
    </div>

    <div style="height: auto; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 10px;">
      <h1 style="font-size: 1.8em; color: #515151;">
        Thank you for applying to be a Campus Ambassador for GSSoC '24 Extended!
      </h1>
    </div>

<div style="padding: 20px;">
  <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
    Dear ${name},
    <br/><br/>
   Thank you for submitting your project to GSSoC '24 Extended! We truly appreciate your willingness to mentor contributors and share your project with the open-source community. 🚀
    <br/><br/>
We are currently reviewing the projects, and you will receive a confirmation email soon with further details regarding the next steps and timelines. We are excited to collaborate with you to create a valuable learning experience for our contributors!
    <br/><br/>
In the meantime, feel free to encourage your community to join GSSoC '24 Extended by sharing the opportunity with friends, colleagues, and fellow developers.
    <br/><br/>
        👉 Subscribe to our newsletter to stay informed about all the latest updates.<a href="https://gssoc.substack.com/subscribe">Subscribe</a><br/>
    👉 Connect with our Program Managers for additional guidance and support:
    <br/><br/>
    <ul style="padding-left: 20px;">
      <li><a href="https://www.linkedin.com/in/sanjay-k-v/" style="color: #515151; text-decoration:none; font-weight: bold;">Sanjay KV</a></li>
      <li><a href="https://www.linkedin.com/in/hemu21/" style="color: #515151; text-decoration:none; font-weight: bold;">Hemanth Kumar</a></li>
      <li><a href="https://www.linkedin.com/in/mastan-sayyad-126904223/" style="color: #515151; text-decoration:none; font-weight: bold;">Mastan Sayyad</a></li>
      <li><a href="https://www.linkedin.com/in/radhikamalpani1702/" style="color: #515151; text-decoration:none; font-weight: bold;">Radhika Malpani</a></li>
      <li><a href="https://www.linkedin.com/in/suhani-singh-paliwal/" style="color: #515151; text-decoration:none; font-weight: bold;">Suhani Singh Paliwal</a></li>
    </ul>
  </p>
</div>


    <div style="background-color: #df551a; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="font-size: 1.5em; font-weight: bolder; color: #ffffff;">
        Our Vision for GSSOC'24 Extended
      </h1>
      <p style="font-size: 1.2em;">Empowering Developers, Expanding Horizons</p>
      <p style="font-size: 1em; font-weight: 200; color: #ffffff;">
        The GSSoC'24 Extended Program offers an additional 30 days of open-source collaboration following the success of GSSoC'24. This extension allows developers to continue learning, contributing, and growing within the open-source community, fostering innovation and engagement.
      </p>
    </div>
    <div style="padding-right: 20px; padding-left:20px;padding-top:20px;padding-bottom:5px;">
      <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
      We look forward to having you as a Campus Ambassador, helping us make GSSoC '24 Extended a memorable and impactful event. Your role will be key to inspiring future contributors!<br/>
      Stay tuned, and thank you for being a part of this amazing initiative!
      </p>
      </div>
    <div style="height: auto; color: #848484; font-size: 1em; text-align: center; padding: 10px;">
      <h3>
            <br/>Best regards,<br/>
            The GSSoC '24 Extended Team
      </h3>
    </div>

    <div style="height: 0.5px; background-color: #515151; margin: 20px 0;"></div>

    <table cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td width="600" align="left">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center" style="font-size: 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://x.com/girlscriptsoc?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                              <img title="X" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/x-logo-colored.png" alt="X" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://www.instagram.com/girlscriptsummerofcode/?hl=en">
                              <img title="Instagram" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Instagram" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://github.com/girlscript">
                              <img title="GitHub" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/github-logo-colored.png" alt="GitHub" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="mailto:gssoc@girlscript.tech">
                              <img title="Gmail" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/gmail-logo-colored.png" alt="Gmail" width="32">
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p>GSSoC Extd. © 2024, All Rights Reserved.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">Visit Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/contact" style="color: #999999;">Contact Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">About</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
          `;
          break;
        default:
          return res
            .status(400)
            .json({ success: false, message: "Invalid role" });
      }

      await sendEmail(email, subject, body);

      return res.status(201).json({ success: true, data: savedData });
    } catch (error) {
      console.error("Error saving data:", error.message);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    console.error(`Method ${method} not allowed`);
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}

async function sendEmail(recipient, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: subject,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipient}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email sending failed");
  }
}

export default allowCors(handler);