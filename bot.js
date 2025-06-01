// const express = require('express');
// const cors = require('cors');
// const TelegramBot = require('node-telegram-bot-api');

// const token = process.env.TELEGRAM_BOT_TOKEN || '8199410383:AAGJHOXBaSRnBEEolEU6msiVgxPiLCNf6Wo';
// const bot = new TelegramBot(token, { polling: true });

// const app = express();
// app.use(cors());
// app.use(express.json());


// // Replace this with the actual chat ID you get from logs above
// const TARGET_CHAT_ID = -4952290430; // <-- Update with real ID from your logs

// app.post('/api/order-success', (req, res) => {
//   const { orderId, customerName, cartItems, total } = req.body;

//   if (!orderId || !customerName || !cartItems || !total) {
//     return res.status(400).json({ message: 'Missing order data' });
//   }

//   const itemsList = cartItems
//     .map(item => `- ${item.name} x${item.quantity || 1} ($${item.price.toFixed(2)})`)
//     .join('\n');

//   const message = 
//     `✅ *New Order!*\n\n` +
//     `*Order ID:* ${orderId}\n` +
//     `*Customer:* ${customerName}\n` +
//     `*Items:*\n${itemsList}\n` +
//     `*Total:* $${total.toFixed(2)}`;

//   bot.sendMessage(TARGET_CHAT_ID, message, { parse_mode: 'Markdown' })
//     .then(() => res.json({ message: 'Order sent to Telegram' }))
//     .catch(err => {
//       console.error('Telegram send error:', err);
//       res.status(500).json({ message: 'Failed to send order to Telegram' });
//     });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Bot backend running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || '8199410383:AAGJHOXBaSRnBEEolEU6msiVgxPiLCNf6Wo';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(cors());
app.use(express.json());

// Use your real chat ID here (from your bot message logs)
const TARGET_CHAT_ID = -4952290430;

app.post('/api/order-success', (req, res) => {
  console.log('Received order:', req.body);

  const { orderId, customerName, cartItems, total } = req.body;

  if (!orderId || !customerName || !cartItems || !total) {
    return res.status(400).json({ message: 'Missing order data' });
  }

  const itemsList = cartItems
    .map(item => `- ${item.name} x${item.quantity || 1} ($${item.price.toFixed(2)})`)
    .join('\n');

  const message = 
    `✅ *New Order!*\n\n` +
    `*Order ID:* ${orderId}\n` +
    `*Customer:* ${customerName}\n` +
    `*Items:*\n${itemsList}\n` +
    `*Total:* $${total.toFixed(2)}`;

  bot.sendMessage(TARGET_CHAT_ID, message, { parse_mode: 'Markdown' })
    .then(() => res.json({ message: 'Order sent to Telegram' }))
    .catch(err => {
      console.error('Telegram send error:', err);
      res.status(500).json({ message: 'Failed to send order to Telegram' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot backend running on port ${PORT}`));
