import { expect, test } from "vitest";
import {
  DISTRICT_ABBR,
  DISTRICT_KEY,
  getKeys,
  MATCH_KEY,
  TBA,
  YEAR_NUM,
} from "./index.js";
import { districtEndpoints } from "../src/types/endpoints/districts.js";
import { insightEndpoints } from "../src/types/endpoints/insights.js";
import { matchEndpoints } from "../src/types/endpoints/matches.js";
import { regionalAdvancementEndpoints } from "../src/types/endpoints/regionalAdvancements.js";
import { searchIndex } from "../src/types/endpoints/index.js";

type OtherEndpoints = typeof districtEndpoints &
  typeof insightEndpoints &
  typeof matchEndpoints &
  typeof regionalAdvancementEndpoints &
  typeof searchIndex;

const tests = {
  "/districts/{year}": [YEAR_NUM],
  "/district/{district_abbreviation}/history": [DISTRICT_ABBR],
  "/district/{district_key}/events": [DISTRICT_KEY],
  "/district/{district_key}/awards": [DISTRICT_KEY],
  "/district/{district_key}/events/simple": [DISTRICT_KEY],
  "/district/{district_key}/events/keys": [DISTRICT_KEY],
  "/district/{district_key}/teams": [DISTRICT_KEY],
  "/district/{district_key}/teams/simple": [DISTRICT_KEY],
  "/district/{district_key}/teams/keys": [DISTRICT_KEY],
  "/district/{district_key}/rankings": [DISTRICT_KEY],
  "/district/{district_key}/advancement": [DISTRICT_KEY],
  "/insights/leaderboards/{year}": [YEAR_NUM],
  "/insights/notables/{year}": [YEAR_NUM],
  "/match/{match_key}": [MATCH_KEY],
  "/match/{match_key}/simple": [MATCH_KEY],
  "/regional_advancement/{year}": [YEAR_NUM],
  "/regional_advancement/{year}/rankings": [YEAR_NUM],
  "/search_index": [],
} satisfies {
  [key in keyof OtherEndpoints]: OtherEndpoints[key]["arguments"]["infer"];
};

for (const endpoint of getKeys(tests)) {
  test(endpoint, async () => {
    const result = await TBA(endpoint, ...tests[endpoint]);
    expect(result.error).toBe(null);
  });
}
