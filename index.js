const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// ================== VARIABLES ==================
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
    console.error("❌ ERROR: BOT_TOKEN no definido");
    process.exit(1);
}

const URL = process.env.RENDER_EXTERNAL_URL;
if (!URL) {
    console.error("❌ ERROR: RENDER_EXTERNAL_URL no detectado");
    process.exit(1);
}

// ================== APP EXPRESS ==================
const app = express();
app.use(express.json());

// ================== BOT WEBHOOK ==================
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${URL}/bot${TOKEN}`);

// ================== FUNCIÓN BIENVENIDA ==================
function getWelcomeMessage() {
    return {
        media: 'https://i.postimg.cc/VvLRfKHs/img5.jpg',
        caption: `🙈 **LEIDYSITA😈**

🔥 **𝗦𝗨𝗦𝗖𝗥𝗜𝗕𝗘𝗧𝗘😉🔥**

Hola, me alegro de que finalmente me hayas encontrado 🔥🔥  
¿Quieres descubrir el contenido de mi canal VIP 🙈🔥?

Vamos al grano, ambos sabemos por qué estás aquí jeje 😏  
Y sí, la pasarás increíble en mi VIP 🫣🔥

💙 **CON UNA PROPINA DE 10 DÓLARES**  
Serás parte de mi comunidad más especial,  
Desbloqueas fotos y videos MUY exclusivos 🔥

🔥 **𝗟𝗔 𝗦𝗨𝗦𝗖𝗥𝗜𝗣𝗖𝗜𝗢𝗡 𝗗𝗨𝗥𝗔 𝗨𝗡 𝗠𝗘𝗦**  
Tipo OnlyFans 😈  
(Contenido SOLO para suscriptores VIP)

👇 Elige un método de pago para empezar`,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [{ text: "💳 Método de pago", callback_data: "metodo_pago" }]
            ]
        }
    };
}

// ================== WEBHOOK HANDLER ==================
app.post(`/bot${TOKEN}`, async (req, res) => {
    res.sendStatus(200);

    const update = req.body;

    if (update.message && update.message.chat) {
        try {
            await bot.sendMessage(update.message.chat.id, "💙💙  BIENVENIDO  💙💙");
        } catch (e) {
            console.log("Mensaje rápido falló:", e.message);
        }
    }

    bot.processUpdate(update);
});

// ================== ENDPOINT UPTIMEROBOT ==================
app.get('/', (req, res) => {
    res.send('Bot activo 🚀');
});

// ================== PUERTO ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🤖 Bot escuchando en puerto ${PORT}`);
});

// ================== /START CORRECTO ==================
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const welcome = getWelcomeMessage();

    await bot.sendPhoto(chatId, welcome.media, {
        caption: welcome.caption,
        parse_mode: welcome.parse_mode,
        reply_markup: welcome.reply_markup
    });
});

// ================== BOTONES ==================
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    try {

        // ===== MENÚ MÉTODOS =====
        if (query.data === 'metodo_pago') {
            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: 'https://i.postimg.cc/t4Vz4ZDD/img6.jpg',
                    caption: `𝗛𝗢𝗟𝗜 💕🔥
TODOS MIS MÉTODOS DE PAGO 🥰

📌 **BOLIVIA 🇧🇴**
📌 **EXTRANJERO 🌍**`,
                    parse_mode: "Markdown"
                },
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🇧🇴 QR Bolivia', callback_data: 'qr_bolivia' }],
                            [{ text: '💳 PayPal', callback_data: 'paypal' }],
                            [{ text: '💳 Pago con tarjeta', callback_data: 'tarjeta' }],
                            [{ text: '⬅️ Volver', callback_data: 'volver' }]
                        ]
                    }
                }
            );
        }

        // ===== QR BOLIVIA =====
        else if (query.data === 'qr_bolivia') {
            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: 'https://i.postimg.cc/Qxq9Dc28/Whats-App-Image-2026-02-02-at-11-46-52.jpg',
                    caption: `🇧🇴 **PAGAR 100 BS**

📌 Saca una captura y págalo por tu banca  
⬇️ Envía el comprobante de recibo de pago⬇️`,
                    parse_mode: "Markdown"
                },
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⬅️ Volver', callback_data: 'metodo_pago' }],
                            [{ text: '✅ Ya pagué', url: 'https://t.me/agentedeinformacion' }]
                        ]
                    }
                }
            );
        }

        // ===== PAYPAL =====
        else if (query.data === 'paypal') {
            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: 'https://i.postimg.cc/5y4rgHF9/depositphotos-220680152-stock-illustration-paypal-logo-printed-white-paper.jpg',
                    caption: `💳 **PAGO POR PAYPAL**

📌 Monto: **11.50 USD**  
📧 \`alejandrohinojosasoria237@gmail.com\`

Envía tu captura después del pago 💎`,
                    parse_mode: "Markdown"
                },
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⬅️ Volver', callback_data: 'metodo_pago' }],
                            [{ text: '📤 Enviar captura', url: 'https://t.me/agentedeinformacion' }]
                        ]
                    }
                }
            );
        }

        // ===== TARJETA =====
     else if (query.data === 'tarjeta') {
    await bot.editMessageMedia(
        {
            type: 'photo',
            media: 'https://i.postimg.cc/Z5Yw0YwM/credit-card.jpg',
            caption: `💳 **PAGO CON TARJETA**

💰 **Monto: 11.50 USD**

1️⃣ Presiona **Ir a pagar**  
2️⃣ Coloca tu correo  
3️⃣ Ingresa tu tarjeta  
4️⃣ Envía la captura`
        },
        {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "Markdown",   // ✅ AQUÍ debe ir
            reply_markup: {
                inline_keyboard: [
                    [{ text: '💳 Ir a pagar', url: 'https://app.takenos.com/pay/d46905c8-b22e-4425-864c-3d8e83dc0237' }],
                    [{ text: '📤 Enviar captura', url: 'https://t.me/agentedeinformacion' }],
                    [{ text: '⬅️ Volver', callback_data: 'metodo_pago' }]
                ]
            }
        }
    );
}


        // ===== VOLVER =====
        else if (query.data === 'volver') {
            const welcome = getWelcomeMessage();

            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: welcome.media,
                    caption: welcome.caption,
                    parse_mode: welcome.parse_mode
                },
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: welcome.reply_markup
                }
            );
        }

        await bot.answerCallbackQuery(query.id);

    } catch (e) {
        console.log('❌ Error:', e.description || e.message);
    }
});
