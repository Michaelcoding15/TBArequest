import { type } from "arktype";

export const Regional_Advancement = type({
  cmp: "boolean",
  cmp_status:
    "'NotInvited' | 'PreQualified' | 'EventQualified' | 'PoolQualified' | 'Declined'",
  qualifying_event: "string?",
  qualifying_award_name: "string?",
  qualifying_pool_week: "number?",
});

export const Regional_Ranking = type({
  team_key: "string",
  rank: "number",
  rookie_bonus: "number?",
  point_total: "number",
  single_event_bonus: "number?",
  event_points: type({
    total: "number",
    alliance_points: "number",
    elim_points: "number",
    award_points: "number",
    event_key: "string",
    qual_points: "number",
  }).array(),
});
