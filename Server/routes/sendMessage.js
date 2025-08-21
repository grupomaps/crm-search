const express = require("express");
const axios = require("axios");

const router = express.Router();

// Token da API do Whatscale
const WHATSCALE_TOKEN = "1743086114844-e3a4efbe047336e81f4ed53542891ac1";

// Rota para enviar mensagens via Whatscale
router.post("/enviar-texto", async (req, res) => {
    try {
        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({ success: false, message: "phone e message são obrigatórios" });
        }
        // URL correta da API com o token na rota
        const url = `https://api-whatsapp.wascript.com.br/api/enviar-texto/${WHATSCALE_TOKEN}`;

        // Fazendo requisição para a API do Whatscale
        const response = await axios.post(url, { phone, message }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Mensagem enviada com sucesso",
            data: response.data
        });

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Erro ao enviar mensagem", error: error.response?.data });
    }
});

module.exports = router;
