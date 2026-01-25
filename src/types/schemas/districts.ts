import { type } from "arktype";

export const District_List = type({
  abbreviation: "string",
  display_name: "string",
  key: "string",
  year: "number",
});

export const District_Ranking = type({
  team_key: "string",
  rank: "number",
  rookie_bonus: "number?",
  point_total: "number",
  event_point: type({
    district_cmp: "boolean",
    total: "number",
    alliance_points: "number",
    elim_points: "number",
    award_points: "number",
    event_key: "string",
    qual_points: "number",
  })
    .array()
    .optional(),
});

export const District_Advancement = type({
  dcmp: "boolean",
  cmp: "boolean",
});
