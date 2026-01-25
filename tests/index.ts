import { configDotenv } from "dotenv";
import { createTBACaller } from "../src/index.js";

const env = configDotenv();

if (env.error) throw new Error("Env failed.");
const api_key = env.parsed?.API_KEY!;

export const TBA = createTBACaller(api_key);

export const getKeys = <T extends {}>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

export const YEAR_NUM = 2025;
export const PAGE_NUM = 0;
export const TEAM_KEY = "frc1014";
export const EVENT_KEY = `${YEAR_NUM}tnkn`;
export const MEDIA_TAG = "chairmans_presentation";
export const DISTRICT_ABBR = "fma";
export const DISTRICT_KEY = `${YEAR_NUM}fma`;
export const MATCH_KEY = `${YEAR_NUM}tnkn_qm1`;
