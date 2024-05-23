import { getMarkets, getStrategies } from "./api";
import { reportCardUrl } from "./config";
import { StrategyDefinition } from "./types";
import { writeFileSync } from "fs";

const filename = "strategies.json";

async function main() {
  const markets = await getMarkets();
  const currentStrategies = await getStrategies();

  console.log(`Found ${markets.length} markets`);

  const strategies: StrategyDefinition[] = markets
    .filter((x) => !x.inWinddown)
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .flatMap((market) => {
      const lpStrategy = currentStrategies.find(
        (x) => x.id == `${market.contractAddress}-lp`
      );
      const xlpStrategy = currentStrategies.find(
        (x) => x.id == `${market.contractAddress}-xlp`
      );

      if (lpStrategy == undefined) {
        console.info(
          `New strategy ${market.contractAddress}-lp added (${market.name}). Please add categories, riskLevel to the output manually`
        );
      }
      if (xlpStrategy == undefined) {
        console.info(
          `New strategy ${market.contractAddress}-xlp added (${market.name}). Please add categories, riskLevel to the output manually`
        );
      }

      const startTime = new Date(market.launchedAt);
      startTime.setSeconds(0, 0);

      return [
        {
          id: `${market.contractAddress}-lp`,
          name: `${market.name} Perps LP`.replace("_", "/"),
          platform: "Levana",
          type: "Perps LP",
          method: "levana-pool-lp",
          link: `https://trade.levana.finance/osmosis/earn/${market.name}`,
          tvl: `https://public-osmosis-api.numia.xyz/earn/strategies/${market.contractAddress}-lp/tvl`,
          apr: `https://public-osmosis-api.numia.xyz/earn/strategies/${market.contractAddress}-lp/apr`,
          geoblock: "https://geoblocked.levana.finance/",
          lockDuration: "P1D",
          riskLevel: lpStrategy?.riskLevel ?? 0,
          riskReportUrl: reportCardUrl,
          startDateTimeUtc: startTime.toISOString().split(".")[0] + "Z",
          unlisted: lpStrategy?.unlisted ?? false,
          disabled: false,
          message:
            "Provides liqudity for a perpetual futures contract market. Cannot be withdrawn until 24h after having deposited.",
          depositDenoms: [
            {
              coinMinimalDenom: market.collateral,
            },
          ],
          positionDenoms: [],
          rewardDenoms: [
            {
              coinMinimalDenom: market.collateral,
            },
          ],
          categories: lpStrategy?.categories ?? [],
        },
        {
          id: `${market.contractAddress}-xlp`,
          name: `${market.name} Perps xLP`.replace("_", "/"),
          platform: "Levana",
          type: "Perps LP",
          method: "levana-pool-xlp",
          link: `https://trade.levana.finance/osmosis/earn/${market.name}`,
          tvl: `https://public-osmosis-api.numia.xyz/earn/strategies/${market.contractAddress}-xlp/tvl`,
          apr: `https://public-osmosis-api.numia.xyz/earn/strategies/${market.contractAddress}-xlp/apr`,
          geoblock: "https://geoblocked.levana.finance/",
          lockDuration: "P45D",
          riskLevel: xlpStrategy?.riskLevel ?? 0,
          riskReportUrl: reportCardUrl,
          startDateTimeUtc: startTime.toISOString().split(".")[0] + "Z",
          unlisted: xlpStrategy?.unlisted ?? false,
          disabled: false,
          message:
            "Provides liqudity for a perpetual futures contract market. Position is staked.",
          depositDenoms: [
            {
              coinMinimalDenom: market.collateral,
            },
          ],
          positionDenoms: [],
          rewardDenoms: [
            {
              coinMinimalDenom: market.collateral,
            },
          ],
          categories: xlpStrategy?.categories ?? [],
        },
      ] satisfies StrategyDefinition[];
    });

  writeFileSync(filename, JSON.stringify(strategies, null, 2));
  console.info(`Strategies written to ${filename}`);
}

main()
  .then()
  .catch((err) => console.error(err));
