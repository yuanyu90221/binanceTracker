import {observable, computed, action, createTransformer} from 'mobx';
import hmacSHA256 from 'crypto-js/hmac-sha256';

const SATOSHI = 0.00000001;

export default class BinanceApiStore {
  constructor(apiKeysStore) {
    this.apiKeysStore = apiKeysStore;
  }

  @observable apiKeysStore;
  @observable balance;
  @observable tickers;
  
  @computed get tickersMap() {
    return this.tickers.reduce((acc, item)=>{
      acc[item.symbol] = (Number(item.askPrice) +  Number(item.bidPrice))/2;
      return acc;
    }, 
    {});
  }

  symbolPriceInBtc(symbol, amount){
    if(symbol == 'BTC') {return amount;}
    const priceInBtc = this.tickersMap[`${symbol}BTC`] || 1/(this.tickersMap[`BTC${symbol}`]);
    return (priceInBtc * amount).toFixed(8);
  }

  btcPriceInUsdt(amount) {
    return (amount * this.tickersMap[`BTCUDST`].toFixed(2));
  }

  @computed get computeBalances() {
    if (!this.balances || !this.tickers) {return;}
    const that = this;
    console.log(this.tickersMap);
    return this.balances && this.balances.filter(item=>Number(item.free) > 0)
    .map(item => {
      item.btcPrice = that.symbolPriceInBtc(item.asset, Numner(item.free));
      item.usdPrice = that.btcPriceInUsdt(item.btcPrice);
      return item;
    });
  }
}