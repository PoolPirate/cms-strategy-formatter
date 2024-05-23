export type Market = {
  contractAddress: string;
  collateral: string;
  name: string;
  inWinddown: boolean;
  launchedAt: string;
};

export type StrategiesCMSFile = {
  strategies: StrategyDefinition[];
};

export type QuerierMarketsResponse = {
  markets: QuerierMarket[];
};
export type QuerierMarket = {
  in_winddown: boolean;
  info: QuerierMarketInfo;
  status: QuerierMarketStatus;
  launched: string;
};
export type QuerierMarketInfo = {
  market_addr: string;
};
export type QuerierMarketStatus = {
  market_id: string;
  collateral: QuerierMarketCollateral;
};

export type QuerierMarketCollateral = {
  native: QuerierNativeMarketCollateral;
};
export type QuerierNativeMarketCollateral = {
  denom: string;
};

export type StrategyDefinition = {
  id: string;
  name: string;
  platform: string;
  type: string;
  method: string;
  link: string;
  tvl: string;
  apr: string;
  geoblock: string;
  lockDuration: string;
  riskLevel: number;
  riskReportUrl: string;
  startDateTimeUtc: string;
  unlisted: boolean;
  disabled: boolean;
  message: string;
  depositDenoms: { coinMinimalDenom: string }[];
  positionDenoms: [];
  rewardDenoms: { coinMinimalDenom: string }[];
  categories: ("Blue Chip" | "Stablecoins" | "Correlated")[];
};
