import { expect, test } from "vitest";
import { EVENT_KEY, getKeys, TBA, YEAR_NUM } from "./index.js";
import { eventEndpoints } from "../src/types/endpoints/events.js";

const tests = {
  "/events/{year}": [YEAR_NUM],
  "/events/{year}/simple": [YEAR_NUM],
  "/events/{year}/keys": [YEAR_NUM],
  "/event/{event_key}": [EVENT_KEY],
  "/event/{event_key}/simple": [EVENT_KEY],
  "/event/{event_key}/alliances": [EVENT_KEY],
  "/event/{event_key}/insights": [EVENT_KEY],
  "/event/{event_key}/oprs": [EVENT_KEY],
  "/event/{event_key}/coprs": [EVENT_KEY],
  "/event/{event_key}/predictions": [EVENT_KEY],
  "/event/{event_key}/rankings": [EVENT_KEY],
  "/event/{event_key}/district_points": [EVENT_KEY],
  "/event/{event_key}/regional_champs_pool_points": [EVENT_KEY],
  "/event/{event_key}/advancement_points": [EVENT_KEY],
  "/event/{event_key}/teams": [EVENT_KEY],
  "/event/{event_key}/teams/simple": [EVENT_KEY],
  "/event/{event_key}/teams/keys": [EVENT_KEY],
  "/event/{event_key}/teams/statuses": [EVENT_KEY],
  "/event/{event_key}/matches": [EVENT_KEY],
  "/event/{event_key}/matches/simple": [EVENT_KEY],
  "/event/{event_key}/matches/keys": [EVENT_KEY],
  "/event/{event_key}/awards": [EVENT_KEY],
  "/event/{event_key}/team_media": [EVENT_KEY],
} satisfies {
  [key in keyof typeof eventEndpoints]: (typeof eventEndpoints)[key]["arguments"]["infer"];
};

for (const endpoint of getKeys(tests)) {
  test(endpoint, async () => {
    const result = await TBA(endpoint, ...tests[endpoint]);
    expect(result.error).toBe(null);
  });
}
