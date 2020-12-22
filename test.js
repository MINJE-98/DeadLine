const cheerio = require('cheerio');
const fetch = require('node-fetch');
async function crawling(data){
    const url =`http://apis.data.go.kr/B553748/CertImgListService/getCertImgListService?ServiceKey=oHyg75oBPQSSnGvid3XNzQZ3SnTI%2FLFW6ZRJzP2b248BpPujhEyz%2FdjaXO8ZajyzqLE0Qyp9b5HGBGfC0h53fA%3D%3D&returnType=xml&pageNo=${data}`
    try{
      const response = await fetch(url); // fetch page
      const htmlString =  await response.text(); // get response text
      const $ = cheerio.load(htmlString);
      const barcode_prod = $('barcode').text();
      console.log(barcode_prod);
    }
    catch(error){
      console.log(error)
    }
  }
  var iterable = {
    [Symbol.iterator]() {
      return {
        i: 0,
        next() {
          if (this.i < 1527) {
            return { value: this.i++, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
for(var i of iterable){
    crawling(i)
}

