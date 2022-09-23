const request = require('axios').default;
const { GetProductIdByHtml, GetBookInfoMessage } = require('./helper');
const ID_BOT = process.env.ID_TELEGRAM_BOT;
const ID_CHAT = process.env.ID_TELEGRAM_CHAT;

module.exports.PacketPubTelegramBot = async (event, context, callback) => {

  console.log(`----------------------------------------`);
  console.log(`----- GET HTML FREE LEARNING -----`);
  let htmlPacktPub = await request.get('https://www.packtpub.com/free-learning');
  console.log(`----- GET HTML FREE LEARNING SUCESS -----`);
  console.log(`----------------------------------------`);

  console.log(`----------------------------------------`);
  console.log(`----- GET PRODUCT ID -----`);
  let productId = GetProductIdByHtml(htmlPacktPub.data);
  console.log(`----- GET PRODUCT ID SUCCESS  -----`);
  console.log(`----------------------------------------`);

  console.log(`----------------------------------------`);
  console.log(`----- GET PRODUCT INFO BY ID -----`);
  let productsApiResponse = await request.get(`https://static.packt-cdn.com/products/${productId}/summary`);
  console.log(`----- GET PRODUCT INFO BY ID SUCCESS -----`);
  console.log(`----------------------------------------`);

  console.log(`----------------------------------------`);
  console.log(`----- GET PRODUCT INFO MESSSAGE -----`);
  let infoMessage = GetBookInfoMessage(productsApiResponse.data);
  console.log(`----- GET PRODUCT INFO MESSSAGE SUCCESS -----`);
  console.log(`----------------------------------------`);

  console.log(`----------------------------------------`);
  console.log(`----- SEND INFO MESSSAGE TO TELEGRAM -----`);
  let sendMessageResponse = await request.post(`https://api.telegram.org/bot${ID_BOT}/sendPhoto`,
    {
      "chat_id": ID_CHAT,
      "parse_mode": "HTML",
      "photo": `https://static.packt-cdn.com/products/${productId}/cover/smaller`,
      "caption": infoMessage,
      "disable_web_page_preview": false,
      "disable_notification": false,
      "reply_to_message_id": ""
    });
  console.log(`----- SEND INFO MESSSAGE TO TELEGRAM SUCCESS -----`);
  console.log(`----------------------------------------`);
};