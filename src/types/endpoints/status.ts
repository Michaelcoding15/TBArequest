import { API_Status_App_Version } from "../schemas/status.js";
import { type } from "arktype";
import { Endpoints } from "../index.js";

const status = type({
  current_season: "number",
  max_season: "number",
  is_datafeed_down: "boolean",
  down_events: "string[]",
  ios: API_Status_App_Version,
  android: API_Status_App_Version,
});

export const statusEndpoints = {
  "/status": {
    schema: status,
    arguments: type([]),
  },
} satisfies Endpoints;
