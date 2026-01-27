import { Result, tryCatch } from "./utils.js";
import {
  endpoints,
  TBAEndpoint,
  TBAEndpoints,
} from "./types/endpoints/index.js";
import { ArkErrors } from "arktype";

/*
 * Creates a function that can call the TBA api.
 * @see https://www.thebluealliance.com/apidocs/v3
 * @param api_key The api key given to you from The Blue Alliance.
 * @returns A function that can request from any endpoint in the TBA api. Go to the TBA api docs to see more information on endpoints and arguments required.
 */
export function createTBACaller(
  api_key: string,
): <T extends TBAEndpoint>(
  endpoint: T,
  ...args: TBAEndpoints[T]["arguments"]["infer"]
) => Promise<Result<TBAEndpoints[T]["schema"]["infer"]>> {
  return async <T extends TBAEndpoint>(
    endpoint: T,
    ...args: TBAEndpoints[T]["arguments"]["infer"]
  ) => await TBA(endpoint, api_key, ...args);
}

async function TBA<T extends TBAEndpoint>(
  endpoint: T,
  api_key: string,
  ...args: TBAEndpoints[T]["arguments"]["infer"]
): Promise<Result<TBAEndpoints[T]["schema"]["infer"]>> {
  let numArg = -1;

  // Fills all the arguments that are needed.
  const filledEndpoint = endpoint.replace(/{(.+?)}/g, () => {
    numArg++;
    return args[numArg].toString();
  });

  const result = await tryCatch(
    fetch(`https://www.thebluealliance.com/api/v3${filledEndpoint}`, {
      headers: {
        "X-TBA-Auth-Key": api_key,
      },
    }),
  );

  if (result.error)
    return {
      data: null,
      error: result.error,
    };

  if (result.data.status !== 200)
    return {
      data: null,
      error: new Error(`${result.data.status} - ${result.data.statusText}`),
    };

  const json = await tryCatch(result.data.json());
  if (json.error)
    return {
      data: null,
      error: new Error(
        `JSON didn't parse for endpoint ${endpoint}. Please contact the developers of the TBArequest package with this error: ${json.error.message}`,
      ),
    };

  if ("transformMatch" in endpoints[endpoint]) {
    let data;
    switch (endpoint) {
      case "/event/{event_key}/matches":
      case "/match/{match_key}": {
        data = { key: args[0] };
        break;
      }
      case "/team/{team_key}/event/{event_key}/matches": {
        data = { key: args[1] };
        break;
      }
      case "/team/{team_key}/matches/{year}": {
        data = { year: args[1] };
        break;
      }
      default: {
        data = {};
      }
    }
    json.data = endpoints[endpoint].transformMatch(
      data as { key?: string; year?: number },
      json.data,
    );
  }

  let schema = endpoints[endpoint].schema(json.data);
  if (schema instanceof ArkErrors)
    return {
      data: null,
      error: new Error(
        `Schema for endpoint ${endpoint} didn't work. Please contact the developers of the TBArequest package with this error: ${schema}`,
      ),
    };

  return { data: schema, error: null };
}
