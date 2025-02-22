import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
   it("renders without crashing", () => {
      const { container } = render(<App />);
      expect(container).toBeDefined();
   });

   it("contains the TimerCircle component", () => {
      const { getByText } = render(<App />);
      const reset = getByText("Reset");

      expect(reset).toBeInTheDocument();
   });
});