import "@testing-library/jest-dom/vitest";

import { beforeAll, afterEach } from "vitest";

import { cleanup } from "@testing-library/react";


beforeAll(() => {
   globalThis.ResizeObserver = class ResizeObserver {
      observe() {
         // do nothing
      }
      unobserve() {
         // do nothing
      }
      disconnect() {
         // do nothing
      }
   };


});

afterEach(() => {
   cleanup();
});
