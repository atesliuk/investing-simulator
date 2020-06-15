import {StockTimeSeries} from "./StockTimeSeries";

export class Stock{

  companyName: string;
  symbol: string;
  price: string;
  dailyChangePercents: string;
  exchange: string;
  lastUpdated: string;
  timeSeries: StockTimeSeries[];


  constructor(companyName: string, price: string) {
    this.companyName = companyName;
    this.price = price;
  }
}
