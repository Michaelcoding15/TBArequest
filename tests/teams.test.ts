import { expect, test } from "vitest";
import {
  EVENT_KEY,
  getKeys,
  MEDIA_TAG,
  PAGE_NUM,
  TBA,
  TEAM_KEY,
  YEAR_NUM,
} from "./index.js";
import { teamEndpoints } from "../src/types/endpoints/teams.js";

const tests = {
  "/teams/{page_num}": [PAGE_NUM],
  "/teams/{page_num}/simple": [PAGE_NUM],
  "/teams/{page_num}/keys": [PAGE_NUM],
  "/teams/{year}/{page_num}": [YEAR_NUM, PAGE_NUM],
  "/teams/{year}/{page_num}/simple": [YEAR_NUM, PAGE_NUM],
  "/teams/{year}/{page_num}/keys": [YEAR_NUM, PAGE_NUM],
  "/team/{team_key}": [TEAM_KEY],
  "/team/{team_key}/simple": [TEAM_KEY],
  "/team/{team_key}/history": [TEAM_KEY],
  "/team/{team_key}/years_participated": [TEAM_KEY],
  "/team/{team_key}/districts": [TEAM_KEY],
  "/team/{team_key}/robots": [TEAM_KEY],
  "/team/{team_key}/events": [TEAM_KEY],
  "/team/{team_key}/events/simple": [TEAM_KEY],
  "/team/{team_key}/events/keys": [TEAM_KEY],
  "/team/{team_key}/events/{year}": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/events/{year}/simple": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/events/{year}/keys": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/events/{year}/statuses": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/event/{event_key}/matches": [TEAM_KEY, EVENT_KEY],
  "/team/{team_key}/event/{event_key}/matches/simple": [TEAM_KEY, EVENT_KEY],
  "/team/{team_key}/event/{event_key}/matches/keys": [TEAM_KEY, EVENT_KEY],
  "/team/{team_key}/event/{event_key}/awards": [TEAM_KEY, EVENT_KEY],
  "/team/{team_key}/event/{event_key}/status": [TEAM_KEY, EVENT_KEY],
  "/team/{team_key}/awards": [TEAM_KEY],
  "/team/{team_key}/awards/{year}": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/matches/{year}": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/matches/{year}/simple": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/matches/{year}/keys": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/media/{year}": [TEAM_KEY, YEAR_NUM],
  "/team/{team_key}/media/tag/{media_tag}": ["frc2614", MEDIA_TAG],
  "/team/{team_key}/media/tag/{media_tag}/{year}": ["frc2614", MEDIA_TAG, 2017],
  "/team/{team_key}/social_media": [TEAM_KEY],
} satisfies {
  [key in keyof typeof teamEndpoints]: (typeof teamEndpoints)[key]["arguments"]["infer"];
};

for (const endpoint of getKeys(tests)) {
  test(endpoint, async () => {
    const result = await TBA(endpoint, ...tests[endpoint]);
    expect(result.error).toBe(null);
  });
}
