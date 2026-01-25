import { Endpoints } from "../index.js";
import {
  Regional_Advancement,
  Regional_Ranking,
} from "../schemas/regionalAdvancements.js";
import { type } from "arktype";

export const regionalAdvancementEndpoints = {
  "/regional_advancement/{year}": {
    schema: type({ "[string]": Regional_Advancement }),
    arguments: type(["number"]),
  },
  "/regional_advancement/{year}/rankings": {
    schema: Regional_Ranking.array(),
    arguments: type(["number"]),
  },
} satisfies Endpoints;
