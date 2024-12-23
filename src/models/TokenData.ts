export interface LiquidityPool {
  [dex: string]: {
    address: string;
    amount: number;
    lpPair: string;
  };
}

export interface Holder {
  address: string;
  amount: string;
  percentage: string;
}

export interface TokenOverview {
  name: string | null;
  symbol: string | null;
  address: string | null;
  deployer: string | null;
  launchDate: string | null;
  marketCap: string | null;
  currentPrice: string | null;
  totalSupply: string | null;
}

export interface SecurityAnalysis {
  mintStatus: string | null;
  freezeStatus: string | null;
  lpStatus: string | null;
  topHoldersRisk: string | null;
}

export interface ExternalLinks {
  website?: string;
  coingecko_coin_id?: string;
  telegram_handle?: string;
  twitter_handle?: string;
  discord_handle?: string;
  cmc_coin_id?: string;
}

export class TokenData {
  overview: TokenOverview;
  security: SecurityAnalysis;
  liquidity: LiquidityPool[];
  holders: Holder[];
  links: ExternalLinks;

  constructor() {
    this.overview = {
      name: null,
      symbol: null,
      address: null,
      deployer: null,
      launchDate: null,
      marketCap: null,
      currentPrice: null,
      totalSupply: null
    };

    this.security = {
      mintStatus: null,
      freezeStatus: null,
      lpStatus: null,
      topHoldersRisk: null
    };

    this.liquidity = [];
    this.holders = [];
    this.links = {};
  }

  static createDefault(): TokenData {
    const defaultData = new TokenData();
    defaultData.overview = {
      name: 'N/A',
      symbol: 'N/A',
      address: 'N/A',
      deployer: 'N/A',
      launchDate: 'N/A',
      marketCap: 'N/A',
      currentPrice: 'N/A',
      totalSupply: 'N/A'
    };

    defaultData.security = {
      mintStatus: 'N/A',
      freezeStatus: 'N/A',
      lpStatus: 'N/A',
      topHoldersRisk: 'N/A'
    };

    return defaultData;
  }
} 