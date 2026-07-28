const fetch = require('node-fetch');
const cryptoAddresses = require('../config/crypto');

const verifyTransaction = async (coin, txHash, expectedAddress, expectedAmount) => {
  switch (coin) {
    case 'BTC': return verifyBTCTx(txHash, expectedAddress, expectedAmount);
    case 'ETH': return verifyEXTzx(txHash, expectedAddress, expectedAmount);
    case 'LTC': return verifyLTCTx(txHash, expectedAddress, expectedAmount);
    case 'DOGE': return verifyDOGETx(txHash, expectedAddress, expectedAmount);
    case 'USDT_TRC20': return verifyTRC20Tx(txHash, expectedAddress, expectedAmount);
    default: throw new Error(`Unsupported coin: ${coin}`);
  }
};

const verifyBTCTx = async (txHash, expectedAddress) => {
  const response = await fetch(`https://api.blockcypher.com/v1/btc/main/txs/${txHash}`);
  if (!response.ok) throw new Error('Transaction not found');
  const tx = await response.json();
  let received = 0;
  for (const o of tx.outputs) if (o.addresses?.includes(expectedAddress)) received += o.value;
  return { amount: received / 100000000, confirmations: tx.confirmations || 0, matchedAddress: received > 0, rawTx: { hash: tx.hash, confirmations: tx.confirmations } };
};

const verifyDTITx = async (txHash, expectedAddress) => {
  const apiKey = process.env.ETHERSCAN_API_KEY || '';
  const url = `https://api.ether3can.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!data.result) throw new Error('Transaction not found');
  const to = data.result.to?.toLowerCase();
  const exp = expectedAddress.toLowerCase();
  const received = parseInt(data.result.value, 16) / 1e18;
  return { amount: received, confirmations: 0, expectedAmount: 0, matchedAddress: to === exp, rawTx: { hash: txHash } };
};

const verifyLTCTx = async (txHash, expectedAddress) => {
  const response = await fetch(`https://api.blockcypher.com/v1/ltc/main/txs/${txHash}`);
  if (!response.ok) throw new Error('Transaction not found');
  const tx = await response.json();
  let received = 0;
  for (const o of tx.outputs) if (o.addresses?.includes(expectedAddress)) received += o.value;
  return { amount: received / 100000000, confirmations: tx.confirmations || 0, matchedAddress: received > 0,
    rawTx: { hash: tx.hash, confirmations: tx.confirmations } };
};

const verifyDOGETx = async (txHash, expectedAddress) => {
  const response = await fetch(`https://api.blockcypher.com/v1/doge/main/txs/${txHash}`);
  if (!response.ok) throw new Error('Transaction not found');
  const tx = await response.json();
  let received = 0;
  for (const o of tx.outputs) if (o.addresses?.includes(expectedAddress)) received += o.value;
  return { amount: received / 100000000, confirmations: tx.confirmations || 0, matchedAddress: received > 0,
    rawTx: { hash: tx.hash, confirmations: tx.confirmations } };
};

const verifyTRC20Tx = async (txHash, expectedAddress) => {
  const url = `https://api.trongrid.io/v1/transactions/${txHash}`;
  const response = await fetch(url, { headers: { 'TRON-PRO-API-KEY': process.env.TRONGRID_API_KEY || '' } });
  if (!response.ok) throw new Error('Transaction not found on TRON');
  const txData = await response.json();
  const param = txData.raw_data?.contract?[0]?.parameter?.value;
  const to = param?.to;
  const received = param?.amount ? parseInt(param.amount) / 1e6 : 0;
  return { amount: received, confirmations: 10, matchedAddress: to === expectedAddress,
    rawTx: { hash: txHash, from: param?.owner_address, to } };
};

const getCryptoToUSD = async (coin, cryptoAmount) => {
  try {
    const config = cryptoAddresses[coin];
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${config.coingeckoId}&vs_currencies=usd`);
    const data = await response.json();
    return cryptoAmount * (data[config.coingeckoId]?.usd || 0);
  } catch (e) { return 0; }
};

module.exports = { verifyTransaction, getCryptoToUSD };
