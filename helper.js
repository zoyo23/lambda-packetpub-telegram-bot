const cheerio = require('cheerio');

function GetProductIdByHtml(html) {
  const $ = cheerio.load(html);
  let productId = $(".product-image")[0].attribs.src.split('https://static.packt-cdn.com/products/')[1].split('/')[0];

  return productId;
}

function GetBookInfoMessage(apiResponse) {
  let message = "";
  message += "<b>Title</b>: " + apiResponse.title + ".\n\n";
  message += "<b>Resume</b>: " + apiResponse.oneLiner + ".\n\n";
  message += "<b>Total Pages</b>: " + apiResponse.pages + " Pages\n\n";
  message += "<b>Estimate Time</b>: " + apiResponse.length + "\n\n";
  message += "<b>Free URL</b>: https://www.packtpub.com/free-learning\n\n";  
  return message;
}

module.exports = {
  GetProductIdByHtml: GetProductIdByHtml,
  GetBookInfoMessage: GetBookInfoMessage
};