import { LeaderboardInsights, NotablesInsight } from "../schemas/insights.js";
import { Endpoints } from "../index.js";
import { type } from "arktype";

export const insightEndpoints = {
  "/insights/leaderboards/{year}": {
    schema: LeaderboardInsights.array(),
    arguments: type(["number"]),
  },
  "/insights/notables/{year}": {
    schema: NotablesInsight.array(),
    arguments: type(["number"]),
  },
} satisfies Endpoints;
