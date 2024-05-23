import { factoryAddress, strategiesJsonUrl } from "./config";
import { Market, QuerierMarketsResponse, StrategiesCMSFile } from "./types";

export async function getMarkets() {
  const response = await fetch(
    `https://querier-mainnet.levana.finance/v1/perps/markets?network=osmosis-mainnet&factory=${factoryAddress}`
  );

  if (!response.ok) {
    console.error("Failed to get markets from querier");
    process.exit();
  }

  const result = (await response.json()) as QuerierMarketsResponse;

  return result.markets.map((market) => {
    return {
      contractAddress: market.info.market_addr,
      name: market.status.market_id,
      inWinddown: market.in_winddown,
      collateral: market.status.collateral.native.denom,
      launchedAt: market.launched,
    } satisfies Market;
  });
}

export async function getStrategies() {
  const response = await fetch(strategiesJsonUrl);

  if (!response.ok) {
    console.error("Failed to get strategies from github");
    process.exit();
  }

  const cms = (await response.json()) as StrategiesCMSFile;
  return cms.strategies;
}
