import { Type } from "arktype";

export type Endpoints = {
  [key: string]: {
    schema: Type;
    arguments: Type<[...unknown[]]>;
    transformMatch?: (
      data: { year?: number; key?: string },
      schema: unknown,
    ) => unknown;
  };
};
