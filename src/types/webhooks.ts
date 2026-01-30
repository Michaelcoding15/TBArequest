import { type } from "arktype";
import { Event, Webcast } from "./schemas/events.js";
import { Match } from "./schemas/matches.js";
import { Award } from "./schemas/teams.js";

const upcomingMatch = type({
  message_type: "'upcoming_match'",
  message_data: {
    event_key: "string",
    match_key: "string",
    team_key: "string?",
    event_name: "string",
    team_keys: "string[]",
    scheduled_time: "number?",
    predicted_time: "number?",
    webcast: Webcast.optional(),
  },
});

const matchScore = type({
  message_type: "'match_score'",
  message_data: {
    event_key: "string",
    match_key: "string",
    team_key: "string?",
    event_name: "string",
    match: Match,
  },
});

const matchVideo = type({
  message_type: "'match_video'",
  message_data: {
    event_key: "string",
    match_key: "string",
    team_key: "string?",
    event_name: "string",
    match: Match,
  },
});

const startingCompLevel = type({
  message_type: "'starting_comp_level'",
  message_data: {
    event_key: "string",
    event_name: "string",
    comp_level: "'qm' | 'ef' | 'qf' | 'sf' |'f'",
    scheduled_time: "number?",
  },
});

const allianceSelection = type({
  message_type: "'alliance_selection'",
  message_data: {
    event_key: "string",
    team_key: "string?",
    event_name: "string",
    event: Event,
  },
});

const awardsPosted = type({
  message_type: "'awards_posted'",
  message_data: {
    event_key: "string",
    team_key: "string?",
    event_name: "string",
    awards: Award.array(),
  },
});

const eventScheduleUpdated = type({
  message_type: "'schedule_updated'",
  message_data: {
    event_key: "string",
    event_name: "string",
    first_match_time: "number?",
  },
});

const ping = type({
  message_type: "'ping'",
  message_data: {
    title: "string",
    desc: "string",
  },
});

const broadcast = type({
  message_type: "'broadcast'",
  message_data: {
    title: "string",
    desc: "string",
    url: "string",
  },
});

const webhookVerification = type({
  message_type: "'verification'",
  message_data: {
    verification_key: "string",
  },
});

export const notification = upcomingMatch
  .or(matchScore)
  .or(matchVideo)
  .or(startingCompLevel)
  .or(allianceSelection)
  .or(awardsPosted)
  .or(eventScheduleUpdated)
  .or(ping)
  .or(broadcast)
  .or(webhookVerification);
