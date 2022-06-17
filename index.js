const axios = require('axios');
const cheerio = require('cheerio');

const income = [
    {curr: 'EUR', sum: 400, date:'2020-03-30'},
    {curr: 'USD', sum: 500, date:'2020-02-20'},
    {curr: 'PLN', sum: 458, date:'2020-01-31'}
]

let result = {
    totalEarned: 0,
    totalEarnedUAH: 0,
    tax5percent: 0,
    rawData: income
}

const f = async () => {
    const getRate = async(el) => {
        const url = 'https://minfin.com.ua/ua/currency/' + el.curr + '/' + el.date;
        const $ = cheerio.load(
            (await axios
                .post(url))
                .data
        )
        return parseFloat($('span.mfm-posr').text().substring(0, 5));
    }

    for (let i = 0; i < 3; i++) {
        const tax5percent = result.rawData[i].sum * 0.05;
        result.tax5percent += tax5percent;
        result.totalEarned += result.rawData[i].sum - tax5percent;
        const rate = await getRate(result.rawData[i]);
        result.totalEarnedUAH += (result.rawData[i].sum - tax5percent) * rate;
        result.rawData[i].rate = rate;
    }

    console.log(result);
}

f();