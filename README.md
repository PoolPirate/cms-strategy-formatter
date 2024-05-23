# Levana Market CMS Exporter

Exports a strategy file required to list Levana markets on the Osmosis earn page.

### What does it do?

- Pulls all the markets from the querier
- Ignores all the ones that are winding down
- Gets current strategies file from Github
- Created strategy definitions for all the markets
  - `riskLevel`, `unlisted`, `categories` are copied from existing definitions
- Log all generated strategies that were not present in the Github file

### Workflow

1. Clone repo && npm i
2. Check that all values in `config.ts` look up-to-date
3. npm run run
4. Output will contain which markets were added, manually update categories in the outputted `strategies.json` file
5. Create PR to [This Repo](https://github.com/osmosis-labs/fe-content/tree/main) replacing all the Levana strategies with the content of the `strategies.json` file
