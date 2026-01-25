import { type } from "arktype";

export const Team_Simple = type({
  key: "string",
  team_number: "number",
  nickname: "string",
  name: "string",
  city: "string | null",
  state_prov: "string | null",
  country: "string | null",
});

export const Team = Team_Simple.and({
  postal_code: "string | null",
  "website?": "string | null",
  rookie_year: "number | null",
});

export const Award_Recipient = type({
  team_key: "string | null",
  awardee: "string | null",
});

export const Award = type({
  name: "string",
  award_type: "number",
  event_key: "string",
  recipient_list: Award_Recipient.array(),
  year: "number",
});

export const Team_Robot = type({
  year: "number",
  robot_name: "string",
  key: "string",
  team_key: "string",
});

export const Media = type({
  type: "string",
  foreign_key: "string",
  "details?": type({ "[string]": "unknown" }),
  preferred: "boolean?",
  team_keys: "string[]",
  direct_url: "string?",
  view_url: "string?",
});
