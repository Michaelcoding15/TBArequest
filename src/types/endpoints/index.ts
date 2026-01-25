import { teamEndpoints } from "./teams.js";
import { statusEndpoints } from "./status.js";
import { eventEndpoints } from "./events.js";
import { matchEndpoints } from "./matches.js";
import { districtEndpoints } from "./districts.js";
import { regionalAdvancementEndpoints } from "./regionalAdvancements.js";
import { insightEndpoints } from "./insights.js";
import type { Endpoints } from "../index.js";
import { type } from "arktype";

const Search_Index = type({
  teams: type({
    key: "string",
    nickname: "string",
  }).array(),

  events: type({
    key: "string",
    name: "string",
  }).array(),
});

export const searchIndex = {
  "/search_index": {
    schema: Search_Index,
    arguments: type([]),
  },
} satisfies Endpoints;

export const endpoints: typeof statusEndpoints &
  typeof teamEndpoints &
  typeof eventEndpoints &
  typeof matchEndpoints &
  typeof districtEndpoints &
  typeof regionalAdvancementEndpoints &
  typeof insightEndpoints &
  typeof searchIndex = {
  ...statusEndpoints,
  ...teamEndpoints,
  ...eventEndpoints,
  ...matchEndpoints,
  ...districtEndpoints,
  ...regionalAdvancementEndpoints,
  ...insightEndpoints,
  ...searchIndex,
} satisfies Endpoints;

export type TBAEndpoints = typeof endpoints;
export type TBAEndpoint = keyof typeof endpoints;
