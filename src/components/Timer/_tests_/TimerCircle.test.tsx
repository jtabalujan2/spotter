import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { TimerCircle } from "../TimerCircle";

describe("TimerCircle", () => {


   it("calculates the correct percentage and circle position", () => {
      const { container } = render(
         <TimerCircle
            radius={50}
            circumference={314}
            height={100}
            width={100}
            timeLeft={25}
            totalTime={100}
         />
      );
      const circle = container.querySelector("circle:nth-of-type(2)");
      expect(circle?.getAttribute("stroke-dashoffset")).toBeCloseTo(235.5, 1);
   });

   it("renders children correctly", () => {
      const { getByText } = render(
         <TimerCircle
            radius={50}
            circumference={314}
            height={100}
            width={100}
            timeLeft={50}
            totalTime={100}
         >
            <text>Time Left</text>
         </TimerCircle>
      );
      expect(getByText("Time Left")).toBeInTheDocument();
   });

   it("renders small circle at correct position", () => {
      const { container } = render(
         <TimerCircle
            radius={50}
            circumference={314}
            height={100}
            width={100}
            timeLeft={50}
            totalTime={100}
         />
      );
      const smallCircle = container.querySelector("circle:nth-of-type(3)");
      expect(smallCircle?.getAttribute("cx")).toBeCloseTo(100, 1);
      expect(smallCircle?.getAttribute("cy")).toBeCloseTo(150, 1);
   });
});