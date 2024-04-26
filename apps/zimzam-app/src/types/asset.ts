export interface Asset {
    code: string;
    latestPrice: number;
    priceRecords: number[];
    timeFrame: '1m';
    isFavorite: boolean;
    isSubscribed: boolean;
  }