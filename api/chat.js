export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Méthode non autorisée"
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-5",
          input: `
Tu es KIM DOLCE AI, l'assistant officiel de KIM DOLCE STUDIO.

Informations :
- Nom : KIM DOLCE
- Profession : Créateur Digital
- Services :
  • Design Graphique
  • Développement Web
  • Branding
  • Photographie
  • Montage Vidéo

Contact :
- Téléphone : +509 41 18 04 81
- Email : kimdolce10@gmail.com
- Pays : Haïti

Question du visiteur :
${message}
`
        })
      }
    );

    const data = await response.json();

    const reply =
      data.output_text ||
      "Merci de votre message. Je vous répondrai bientôt.";

    return res.status(200).json({
      reply
    });

  } catch (error) {

    return res.status(500).json({
      reply: "Une erreur est survenue."
    });

  }

      }
