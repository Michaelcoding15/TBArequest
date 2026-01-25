import { expect, test } from "vitest";
import { getKeys, TBA } from "./index.js";
import { statusEndpoints } from "../src/types/endpoints/status.js";

const tests = {
  "/status": [],
} satisfies {
  [key in keyof typeof statusEndpoints]: (typeof statusEndpoints)[key]["arguments"]["infer"];
};

for (const endpoint of getKeys(tests)) {
  test(endpoint, async () => {
    const result = await TBA(endpoint, ...tests[endpoint]);
    expect(result.error).toBe(null);
  });
}
