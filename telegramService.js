const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();;

const telegramBotService = (function () {
  // Create a bot that uses 'polling' to fetch new updates
  let bot = new TelegramBot(
    process.env.TELEGRAM_BOT_TOKEN,
    {
      polling: false,
    }
  );

  return {
    sendMessage: (chatId, message) => {
      bot.sendMessage(chatId, message, { parse_mode: "HTML" });
    },
  };
})();

module.exports = telegramBotService;
