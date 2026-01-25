import { Endpoints } from "../index.js";
import {
  District_Advancement,
  District_List,
  District_Ranking,
} from "../schemas/districts.js";
import { Event, Event_Simple } from "../schemas/events.js";
import { Award, Team, Team_Simple } from "../schemas/teams.js";
import { type } from "arktype";

export const districtEndpoints = {
  "/districts/{year}": {
    schema: District_List.array(),
    arguments: type(["number"]),
  },
  "/district/{district_abbreviation}/history": {
    schema: District_List.array(),
    arguments: type(["string"]),
  },
  "/district/{district_key}/events": {
    schema: Event.array(),
    arguments: type(["string"]),
  },
  "/district/{district_key}/awards": {
    schema: Award.array(),
    arguments: type(["string"]),
  },
  "/district/{district_key}/events/simple": {
    schema: Event_Simple.array(),
    arguments: type(["string"]),
  },
  "/district/{district_key}/events/keys": {
    schema: type("string[]"),
    arguments: type(["string"]),
  },
  "/district/{district_key}/teams": {
    schema: Team.array(),
    arguments: type(["string"]),
  },
  "/district/{district_key}/teams/simple": {
    schema: Team_Simple.array(),
    arguments: type(["string"]),
  },
  "/district/{district_key}/teams/keys": {
    schema: type("string[]"),
    arguments: type(["string"]),
  },
  "/district/{district_key}/rankings": {
    schema: type(District_Ranking.array(), "|", "null"),
    arguments: type(["string"]),
  },
  "/district/{district_key}/advancement": {
    schema: type({ "[string]": District_Advancement }, "|", "null"),
    arguments: type(["string"]),
  },
} satisfies Endpoints;
