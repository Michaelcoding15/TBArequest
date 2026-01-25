import { Endpoints } from "../index.js";
import {
  Elimination_Alliance,
  Event,
  Event_Simple,
  Team_Event_Status,
  WLT_Record,
} from "../schemas/events.js";
import { Award, Media, Team, Team_Simple } from "../schemas/teams.js";
import { Match, Match_Simple } from "../schemas/matches.js";
import { type } from "arktype";

const rankings = type({
  rankings: type({
    matches_played: "number",
    qual_average: "number | null",
    extra_stats: "number[]",
    sort_orders: "number[] | null",
    record: type(WLT_Record, "|", "null"),
    rank: "number",
    dq: "number",
    team_key: "string",
  }).array(),

  extra_stats_info: type({
    precision: "number",
    name: "string",
  }).array(),

  sort_order_info: type({
    precision: "number",
    name: "string",
  }).array(),
});

const eventPoints = type({
  points: type({
    "[string]": type({
      total: "number",
      alliance_points: "number",
      elim_points: "number",
      award_points: "number",
      qual_points: "number",
    }),
  }),

  "tiebreakers?": type({
    "[string]": type({
      highest_qual_scores: "number[]",
      qual_points: "number",
    }).partial(),
  }),
});

export const eventEndpoints = {
  "/events/{year}": {
    schema: Event.array(),
    arguments: type(["number"]),
  },
  "/events/{year}/simple": {
    schema: Event_Simple.array(),
    arguments: type(["number"]),
  },
  "/events/{year}/keys": {
    schema: type("string[]"),
    arguments: type(["number"]),
  },
  "/event/{event_key}": {
    schema: Event,
    arguments: type(["string"]),
  },
  "/event/{event_key}/simple": {
    schema: Event_Simple,
    arguments: type(["string"]),
  },
  "/event/{event_key}/alliances": {
    schema: type(Elimination_Alliance.array(), "|", "null"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/insights": {
    schema: type(
      {
        qual: "unknown",
        playoff: "unknown",
      },
      "|",
      "null",
    ),
    arguments: type(["string"]),
  },
  "/event/{event_key}/oprs": {
    schema: type({
      oprs: { "[string]": "number" },
      dprs: { "[string]": "number" },
      ccwms: { "[string]": "number" },
    }),
    arguments: type(["string"]),
  },
  "/event/{event_key}/coprs": {
    schema: type({ "[string]": { "[string]": "number" } }),
    arguments: type(["string"]),
  },
  "/event/{event_key}/predictions": {
    schema: type({ "[string]": "unknown" }, "|", "null"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/rankings": {
    schema: type(rankings, "|", "null"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/district_points": {
    schema: type(eventPoints, "|", "null"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/regional_champs_pool_points": {
    schema: type(eventPoints, "|", "null"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/advancement_points": {
    schema: type(eventPoints, "|", "null"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/teams": {
    schema: Team.array(),
    arguments: type(["string"]),
  },
  "/event/{event_key}/teams/simple": {
    schema: Team_Simple.array(),
    arguments: type(["string"]),
  },
  "/event/{event_key}/teams/keys": {
    schema: type("string[]"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/teams/statuses": {
    schema: type({ "[string]": Team_Event_Status }),
    arguments: type(["string"]),
  },
  "/event/{event_key}/matches": {
    schema: Match.array(),
    arguments: type(["string"]),
    transformMatch: ({ key }, schema) => {
      if (
        key &&
        parseInt(key.slice(0, 4)) &&
        Array.isArray(schema) &&
        schema.every((v) => v && typeof v === "object")
      ) {
        for (const member of schema) {
          member["score_breakdown"]["yearOfCompetition"] = parseInt(
            key.slice(0, 4),
          );
        }
      }
      return schema;
    },
  },
  "/event/{event_key}/matches/simple": {
    schema: Match_Simple.array(),
    arguments: type(["string"]),
  },
  "/event/{event_key}/matches/keys": {
    schema: type("string[]"),
    arguments: type(["string"]),
  },
  "/event/{event_key}/awards": {
    schema: Award.array(),
    arguments: type(["string"]),
  },
  "/event/{event_key}/team_media": {
    schema: Media.array(),
    arguments: type(["string"]),
  },
} satisfies Endpoints;
