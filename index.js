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
        caption: `🙈 LEIDYSITA😈

🔥 SUSCRÍBETE 😉 SEMANA DE PROMOCIÓN 🔥

Hola, me alegro de que finalmente me hayas encontrado 🔥🔥  
¿Quieres descubrir el contenido de mi canal VIP 🙈🔥?

Vamos al grano, ambos sabemos por qué estás aquí jeje 😏  
Y sí, la pasarás increíble en mi VIP 🫣🔥

💙 POR ESTA SEMANA CON UNA PROPINA DE 8.50 DÓLARES  
Serás parte de mi comunidad más especial,
Desbloqueas fotos y videos MUY exclusivos 🔥

🔥 LA SUSCRIPCIÓN DURA UN MES  
Tipo OnlyFans 😈  
(Contenido SOLO para suscriptores VIP)

👇 Elige un método de pago para empezar`,
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
    bot.processUpdate(req.body);
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

// ================== /START ==================
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const welcome = getWelcomeMessage();

    await bot.sendPhoto(chatId, welcome.media, {
        caption: welcome.caption,
        reply_markup: welcome.reply_markup
    });
});

// ================== BOTONES ==================
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    try {

        if (query.data === 'metodo_pago') {
            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: 'https://i.postimg.cc/t4Vz4ZDD/img6.jpg',
                    caption: `HOLI 💕🔥
TODOS MIS MÉTODOS DE PAGO 🥰

📌 BOLIVIA 🇧🇴
📌 EXTRANJERO 🌍`
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

        else if (query.data === 'qr_bolivia') {
            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: 'https://i.postimg.cc/c4BP16y9/IMG-20260302-WA0009.jpg',
                    caption: `🇧🇴 POR ESTA SEMANA PAGA 75 BS

📌 Saca una captura y págalo por tu banca  
⬇️ Envía el comprobante de pago ⬇️`
                },
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⬅️ Volver', callback_data: 'metodo_pago' }],
                            [{
                                text: '✅ Ya pagué',
                                url: 'https://t.me/agentedeinformacion?text=Hola%20Leidy,%20te%20mando%20la%20captura,%20pagué%20por%20QR%20Bolivia'
                            }]
                        ]
                    }
                }
            );
        }

        else if (query.data === 'paypal') {
            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: 'https://i.postimg.cc/5y4rgHF9/depositphotos-220680152-stock-illustration-paypal-logo-printed-white-paper.jpg',
                    caption: `💳 PAGO POR PAYPAL

Monto: 8.50 USD
Correo: alejandrohinojosasoria237@gmail.com

Envía tu captura después del pago 💎`
                },
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⬅️ Volver', callback_data: 'metodo_pago' }],
                            [{
                                text: '✅ Enviar captura',
                                url: 'https://t.me/agentedeinformacion?text=Hola%20Leidy,%20te%20mando%20la%20captura,%20pagué%20por%20PayPal'
                            }]
                        ]
                    }
                }
            );
        }

        else if (query.data === 'tarjeta') {
            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: 'https://i.postimg.cc/NMF1X4FH/Screenshot_20260213_110627_Chrome.jpg',
                    caption: `💳 SUSCRIPCIÓN CON TARJETA

Monto: 8.50 USD

1️⃣ Presiona Ir a pagar  
2️⃣ Coloca tu correo  
3️⃣ Ingresa los datos de tu tarjeta  
4️⃣ Envía la captura`
                },
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '💳 Ir a pagar', url: 'https://app.takenos.com/pay/664ed8b3-8291-486c-80b2-4324715b6426' }],
                            [{
                                text: '✅ Enviar captura',
                                url: 'https://t.me/agentedeinformacion?text=Hola%20Leidy,%20te%20mando%20la%20captura,%20pagué%20con%20Tarjeta'
                            }],
                            [{ text: '⬅️ Volver', callback_data: 'metodo_pago' }]
                        ]
                    }
                }
            );
        }

        else if (query.data === 'volver') {
            const welcome = getWelcomeMessage();

            await bot.editMessageMedia(
                {
                    type: 'photo',
                    media: welcome.media,
                    caption: welcome.caption
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
        console.log('❌ Error:', e.response?.body || e.message);
    }
});
