const request = require('axios').default;
const { GetProductIdByHtml, GetBookInfoMessage } = require('./helper');
const ID_BOT = process.env.ID_TELEGRAM_BOT;
const ID_CHAT = process.env.ID_TELEGRAM_CHAT;

module.exports.PacketPubTelegramBot = (event, context, callback) => {
  request.get('https://www.packtpub.com/free-learning')
    .then(({ data: htmlPacktPub }) => {

      console.log(`----------------------------------------`)
      console.log(`----- GET PRODUCT ID -----`)
      let productId = GetProductIdByHtml(htmlPacktPub);
      console.log(`PRODUCT ID : ${productId}`)
      console.log(`----- GET PRODUCT SUCCESS  -----`)
      console.log(`----------------------------------------`)

      request.get(`https://static.packt-cdn.com/products/${productId}/summary`)
        .then(({ data: productsApiResponse }) => {

          console.log(`----------------------------------------`)
          console.log(`----- GET PRODUCT INFO MESSSAGE -----`)
          let infoMessage = GetBookInfoMessage(productsApiResponse);
          console.log(`INFO MESSSAGE : ${infoMessage}`)
          console.log(`----- GET PRODUCT INFO MESSSAGE SUCCESS -----`)
          console.log(`----------------------------------------`)

          request.post(`https://api.telegram.org/bot${ID_BOT}/sendPhoto`,
            {
              "chat_id": ID_CHAT,
              "parse_mode": "HTML",
              "photo": `https://static.packt-cdn.com/products/${productId}/cover/smaller`,
              "caption": infoMessage,
              "disable_web_page_preview": false,
              "disable_notification": false,
              "reply_to_message_id": ""
            })
            .then(({ data: sendMessageResponse }) => {
              console.log(sendMessageResponse);
            })
            .catch(callback);
        })
        .catch(callback);

      callback(productId);
    })
    .catch(callback);
};