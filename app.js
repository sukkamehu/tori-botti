const nodemailer = require('nodemailer');
const cheerio = require('cheerio');
const axios = require('axios');
const settings = require('./settings.json');

let transporter = nodemailer.createTransport(settings.email_service);

let tori = {
  itemsReported: [], // keep list to not send report of matches twice
  autoScan: function(){
    console.log(new Date(), "Toribotti started with config", settings)
    setInterval(() => {
      let url = `https://www.tori.fi/${settings.region}?q=${settings.searching_for}`;
      console.log(new Date(), "Checking for new items, url: ", url)
      axios.get(url).then((response) => {
        const $ = cheerio.load(response.data, { decodeEntities: true });
        let itemsToAlert = [];
        let emailHtml = "";
        $('#blocket > div.main > div > div > div.list_mode_thumb a').each((i, elm) => {
          if(elm.attribs.id){
            if(!tori.itemsReported.includes(elm.attribs.id)){
              itemsToAlert.push(elm.attribs.id)
              emailHtml += `<div style='border: 1px solid;'>${cheerio.html(elm)}</div>`
            }
          };
        });
        if(itemsToAlert.length > 0){
          if(settings.email_service){
            tori.sendMail(emailHtml, itemsToAlert);
          } else {
            console.log(new Date(), "New items found! Id's:", itemsToAlert)
            tori.itemsReported = tori.itemsReported.concat(itemsToAlert)
          }
        } else {
          console.log(new Date(), "No new items to alert")
        }
      }).catch((e) => { console.log(new Date(), "error to check",e) })
    }, settings.check_interval_mins * 60 * 1000)
  },
  sendMail: function(emailHtml, itemsToAlert){

    let subject = `LΓΆytyi ${itemsToAlert.length} uutta artikkelia haulla ${settings.searching_for}! πππ`
    let from = `"ToriBotti π" <toribotti@tori.fi>`
    if(settings.email_service.auth.user){
      from = `"ToriBotti π" <${settings.email_service.auth.user}>`
    }

    transporter.sendMail({
      from: from,
      to: settings.report_emails,
      subject: subject,
      html: `<html><head><meta charset="UTF-8"></head><body>${emailHtml}</body></html>`
    }).then(console.log("Message sent!")).catch((e) => { console.log(new Date(), "error sending mail",e) });

    tori.itemsReported = tori.itemsReported.concat(itemsToAlert)
  }
}

tori.autoScan();
