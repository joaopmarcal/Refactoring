import createStatementData from './createStatementData.js';
import fs from 'fs';
const invoiceJSON = fs.readFileSync('invoices.json', 'utf8');
const invoice = JSON.parse(invoiceJSON);
const playJSON = fs.readFileSync('plays.json','utf8');
const plays = JSON.parse(playJSON);

function statement (invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for(let perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
    function usd(Anumber) {
        return new Intl.NumberFormat("en-US",
            { style: "currency", currency: "USD",
                minimumFractionDigits: 2}).format(Anumber/100);
    }
}

console.log(statement(invoice,plays));