import { type } from "arktype";

export const LeaderboardInsights = type({
  data: {
    rankings: type({
      value: "number",
      keys: "string[]",
    }).array(),
    key_type: "'team' | 'event' | 'match'",
  },
  name: "string",
  year: "number",
});

export const NotablesInsight = type({
  data: {
    entries: type({
      context: "string[]",
      team_key: "string",
    }).array(),
  },
  name: "string",
  year: "number",
});
