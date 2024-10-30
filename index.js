const express = require('express');
const bodyParser = require('body-parser');
const SibApiV3Sdk = require('sib-api-v3-sdk');

const app = express();
const port = 3000;

// Configurar Body-Parser
app.use(bodyParser.json());

// Configura la API Key de Brevo
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
apiKey.apiKey = '';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Ruta para enviar un correo utilizando una plantilla
app.post('/welcome', (req, res) => {
    const { toEmail, toName, templateId, params } = req.body;

    const sendSmtpEmail = {
        sender: { name: 'Conectavet', email: 'app@conectavet.cl' },
        to: [{ email: toEmail, name: toName }],
        templateId: templateId,
        params: params
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then((data) => {
        console.log('Correo enviado exitosamente', data);
        res.status(200).send('Email sent successfully!');
    }).catch((error) => {
        console.error('Error al enviar el correo:', error.response.body);
        res.status(500).send('Error sending email');
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
