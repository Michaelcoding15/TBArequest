import { District_List } from "./districts.js";
import { type } from "arktype";

export const Webcast = type({
  type: "'youtube' | 'twitch' | 'ustream' | 'iframe' | 'html5' | 'rtmp' | 'livestream' | 'direct_link' | 'mms' | 'justin' | 'stemtv' | 'dacast'",
  channel: "string",
  "date?": "string | null",
  file: "(string | null)?",
});

export const Event_Simple = type({
  key: "string",
  name: "string",
  event_code: "string",
  event_type: "number",
  district: type(District_List, "|", "null"),
  city: "string | null",
  state_prov: "string | null",
  country: "string | null",
  start_date: "string",
  end_date: "string",
  year: "number",
});

export const Event = Event_Simple.and({
  short_name: "string | null",
  event_type_string: "string",
  week: "number | null",
  address: "string | null",
  postal_code: "string | null",
  gmaps_place_id: "string | null",
  gmaps_url: "string | null",
  lat: "number | null",
  lng: "number | null",
  location_name: "string | null",
  timezone: "string | null",
  website: "string | null",
  first_event_id: "string | null",
  first_event_code: "string | null",
  webcasts: Webcast.array(),
  division_keys: "string[]",
  parent_event_key: "string | null",
  playoff_type: "number | null",
  playoff_type_string: "string | null",
});

export const WLT_Record = type({
  wins: "number",
  losses: "number",
  ties: "number",
});

// Docs don't say it is nullable, but it has been null during testing
export const Team_Event_Status_rank = type({
  num_teams: "number | null",
  ranking: type({
    matches_played: "number | null",
    qual_average: "number | null",
    sort_orders: "number[] | null",
    rank: "number | null",
    dq: "number | null",
    team_key: "string | null",
  }).optional(),
  sort_order_info: type(
    {
      precision: "number | null",
      name: "string | null",
    },
    "|",
    "null",
  ).array(),
  status: "string | null",
}).partial();

export const Team_Event_Status_alliance_backup = type({
  in: "string?",
  out: "string?",
});

export const Team_Event_Status_alliance = type({
  name: "(string | null)?",
  number: "number",
  backup: type(Team_Event_Status_alliance_backup, "|", "null").optional(),
  pick: "number",
});

export const Team_Event_Status_playoff = type({
  "level?": "'qm' | 'ef' | 'qf' | 'sf' | 'f'",
  current_level_record: type(WLT_Record, "|", "null").optional(),
  record: type(WLT_Record, "|", "null").optional(),
  "status?": "'won' | 'eliminated' | 'playing'",
  "playoff_average?": "number | null",
});

export const Team_Event_Status = type({
  alliance_status_str: "string?",
  playoff_status_str: "string?",
  overall_status_str: "string?",
  next_match_key: "(string | null)?",
  last_match_key: "(string | null)?",
  playoff: type(Team_Event_Status_playoff, "|", "null").optional(),
  qual: type(Team_Event_Status_rank, "|", "null").optional(),
  alliance: type(Team_Event_Status_alliance, "|", "null").optional(),
});

export const Elimination_Alliance = type({
  name: "(string | null)?",
  backup: type(
    {
      in: "string",
      out: "string",
    },
    "|",
    "null",
  ).optional(),
  declines: "string[]",
  picks: "string[]",
  status: type({
    playoff_average: "number | null",
    level: "string",
    record: type(WLT_Record, "|", "null"),
    current_level_record: type(WLT_Record, "|", "null"),
    status: "string",
  })
    .partial()
    .optional(),
});
