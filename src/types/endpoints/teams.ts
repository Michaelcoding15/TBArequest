import {
  Award,
  Media,
  Team,
  Team_Robot,
  Team_Simple,
} from "../schemas/teams.js";
import { Endpoints } from "../index.js";
import { Event, Event_Simple, Team_Event_Status } from "../schemas/events.js";
import { District_List } from "../schemas/districts.js";
import { Match, Match_Simple } from "../schemas/matches.js";
import { type } from "arktype";

export const teamEndpoints = {
  "/teams/{page_num}": {
    schema: Team.array(),
    arguments: type(["number"]),
  },
  "/teams/{page_num}/simple": {
    schema: Team_Simple.array(),
    arguments: type(["number"]),
  },
  "/teams/{page_num}/keys": {
    schema: type("string[]"),
    arguments: type(["number"]),
  },
  "/teams/{year}/{page_num}": {
    schema: Team.array(),
    arguments: type(["number", "number"]),
  },
  "/teams/{year}/{page_num}/simple": {
    schema: Team_Simple.array(),
    arguments: type(["number", "number"]),
  },
  "/teams/{year}/{page_num}/keys": {
    schema: type("string[]"),
    arguments: type(["number", "number"]),
  },
  "/team/{team_key}": {
    schema: Team,
    arguments: type(["string"]),
  },
  "/team/{team_key}/simple": {
    schema: Team_Simple,
    arguments: type(["string"]),
  },
  "/team/{team_key}/history": {
    schema: type({ events: Event.array(), awards: Award.array() }),
    arguments: type(["string"]),
  },
  "/team/{team_key}/years_participated": {
    schema: type("number[]"),
    arguments: type(["string"]),
  },
  "/team/{team_key}/districts": {
    schema: District_List.array(),
    arguments: type(["string"]),
  },
  "/team/{team_key}/robots": {
    schema: Team_Robot.array(),
    arguments: type(["string"]),
  },
  "/team/{team_key}/events": {
    schema: Event.array(),
    arguments: type(["string"]),
  },
  "/team/{team_key}/events/simple": {
    schema: Event_Simple.array(),
    arguments: type(["string"]),
  },
  "/team/{team_key}/events/keys": {
    schema: type("string[]"),
    arguments: type(["string"]),
  },
  "/team/{team_key}/events/{year}": {
    schema: Event.array(),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/events/{year}/simple": {
    schema: Event_Simple.array(),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/events/{year}/keys": {
    schema: type("string[]"),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/events/{year}/statuses": {
    schema: type({
      "[string]": Team_Event_Status,
    }),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/event/{event_key}/matches": {
    schema: Match.array(),
    arguments: type(["string", "string"]),
    transformMatch: ({ key: eventKey }, schema) => {
      if (
        eventKey &&
        parseInt(eventKey.slice(0, 4)) &&
        Array.isArray(schema) &&
        schema.every((v) => v && typeof v === "object")
      ) {
        for (const member of schema) {
          member["score_breakdown"]["yearOfCompetition"] = parseInt(
            eventKey.slice(0, 4),
          );
        }
      }
      return schema;
    },
  },
  "/team/{team_key}/event/{event_key}/matches/simple": {
    schema: Match_Simple.array(),
    arguments: type(["string", "string"]),
  },
  "/team/{team_key}/event/{event_key}/matches/keys": {
    schema: type("string[]"),
    arguments: type(["string", "string"]),
  },
  "/team/{team_key}/event/{event_key}/awards": {
    schema: Award.array(),
    arguments: type(["string", "string"]),
  },
  "/team/{team_key}/event/{event_key}/status": {
    schema: type(Team_Event_Status, "|", "null"),
    arguments: type(["string", "string"]),
  },
  "/team/{team_key}/awards": {
    schema: Award.array(),
    arguments: type(["string"]),
  },
  "/team/{team_key}/awards/{year}": {
    schema: Award.array(),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/matches/{year}": {
    schema: Match.array(),
    arguments: type(["string", "number"]),
    transformMatch: ({ year }, schema) => {
      if (
        year &&
        Array.isArray(schema) &&
        schema.every((v) => v && typeof v === "object")
      ) {
        for (const member of schema) {
          member["score_breakdown"]["yearOfCompetition"] = year;
        }
      }
      return schema;
    },
  },
  "/team/{team_key}/matches/{year}/simple": {
    schema: Match_Simple.array(),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/matches/{year}/keys": {
    schema: type("string[]"),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/media/{year}": {
    schema: Media.array(),
    arguments: type(["string", "number"]),
  },
  "/team/{team_key}/media/tag/{media_tag}": {
    schema: Media.array(),
    arguments: type(["string", "string"]),
  },
  "/team/{team_key}/media/tag/{media_tag}/{year}": {
    schema: Media.array(),
    arguments: type(["string", "string", "number"]),
  },
  "/team/{team_key}/social_media": {
    schema: Media.array(),
    arguments: type(["string"]),
  },
} satisfies Endpoints;
