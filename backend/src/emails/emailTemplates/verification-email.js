import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "RenNest",
    link: "runnest.com",
  },
});

const emailVerificationMailgenContent = (username, verifyUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to our SocialNet! We're very excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verifyUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const generateVerificationEmail = (username, verifyUrl) => {
  const emailContent = emailVerificationMailgenContent(username, verifyUrl);
  const html = mailGenerator.generate(emailContent);
  const text = mailGenerator.generatePlaintext(emailContent);
  return { html, text };
};

export { generateVerificationEmail, emailBodyHtml, emailBodyText };
