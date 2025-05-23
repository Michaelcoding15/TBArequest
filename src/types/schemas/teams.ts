import { z } from "zod";

export const Team_Simple = z.object({
	key: z.string().regex(/frc\d+/),
	team_number: z.int(),
	nickname: z.string(),
	name: z.string(),
	city: z.string().nullable(),
	state_prov: z.string().nullable(),
	country: z.string().nullable(),
});

export const Team = Team_Simple.extend({
	postal_code: z.string().nullable(),
	website: z.string().nullable().optional(),
	rookie_year: z.number().nullable(),
})

export const Award_Recipient = z.object({
	team_key: z.string().nullable(),
	awardee: z.string().nullable(),
});

export const Award = z.object({
	name: z.string(),
	award_type: z.int(),
	event_key: z.string(),
	recipient_list: z.array(Award_Recipient),
	year: z.int(),
});

export const Team_Robot = z.object({
	year: z.int(),
	robot_name: z.string(),
	key: z.string(),
	team_key: z.string(),
});

export const Media = z.object({
	type: z.string(),
	foreign_key: z.string(),
	details: z.record(z.any(), z.any()).nullable().optional(),
	preferred: z.boolean().optional(),
	team_keys: z.array(z.string()),
	direct_url: z.string().optional(),
	view_url: z.string().optional(),
});