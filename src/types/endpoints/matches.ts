import { Endpoints } from "../index.js";
import { Match, Match_Simple } from "../schemas/matches.js";
import { type } from "arktype";

export const matchEndpoints = {
  "/match/{match_key}": {
    schema: Match,
    arguments: type(["string"]),
    transformMatch: ({ key: eventKey }, schema) => {
      if (
        eventKey &&
        parseInt(eventKey.slice(0, 4)) &&
        typeof schema === "object" &&
        schema
      ) {
        let newSchema: any = schema;
        newSchema["score_breakdown"]["yearOfCompetition"] = parseInt(
          eventKey.slice(0, 4),
        );
        return newSchema;
      }
      return schema;
    },
  },
  "/match/{match_key}/simple": {
    schema: Match_Simple,
    arguments: type(["string"]),
  },
} satisfies Endpoints;
