import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Timer } from "../Timer";

describe("Timer Component", () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });

   afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
   });

   it("should render the Timer component", () => {
      render(<Timer />);
      expect(screen.getByTestId("timer")).toBeInTheDocument();
   });

   it("should start the timer when the play button is clicked", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");

      act(() => {
         fireEvent.click(playButton);
      });

      expect(screen.getByLabelText("Pause timer")).toBeInTheDocument();
   });

   it("should pause the timer when the pause button is clicked", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");

      act(() => {
         fireEvent.click(playButton);
      });

      const pauseButton = screen.getByLabelText("Pause timer");

      act(() => {
         fireEvent.click(pauseButton);
      });
      expect(screen.getByLabelText("Start timer")).toBeInTheDocument();
   });

   it("should reset the timer when the reset button is clicked", () => {
      render(<Timer />);
      const resetButton = screen.getByLabelText("Reset Timer");
      act(() => {
         fireEvent.click(resetButton);
      });
      expect(screen.getByLabelText("Start timer")).toBeInTheDocument();
   });

   it("should add one minute to the timer when the +1:00 button is clicked", () => {
      render(<Timer />);
      const addButton = screen.getByLabelText("Add one minute");
      act(() => {
         fireEvent.click(addButton);
      });
      expect(screen.getByDisplayValue("02")).toBeInTheDocument();
   });

   it("should update the minute input value", () => {
      render(<Timer />);
      const minuteInput = screen.getByLabelText("Minutes");
      act(() => {
         fireEvent.change(minuteInput, { target: { value: "2" } });
      });
      expect(minuteInput).toHaveValue("02");
   });

   it("should update the second input value", () => {
      render(<Timer />);
      const secondInput = screen.getByLabelText("Seconds");

      act(() => {
         fireEvent.change(secondInput, { target: { value: "30" } });
      });

      expect(secondInput).toHaveValue("30");
   });

   it("should countdown the timer", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");
      act(() => {
         fireEvent.click(playButton);
      });

      act(() => {
         vi.advanceTimersByTime(1000);
      });

      expect(screen.getByText("00:59")).toBeInTheDocument();
   });

   it("should stop the timer at 0", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");
      act(() => {
         fireEvent.click(playButton);
      });

      act(() => {
         vi.advanceTimersByTime(60000);
      });

      waitFor(() => {
         expect(screen.getByTestId('minute-input')).toHaveValue("00");
         expect(screen.getByTestId('seconds-input')).toHaveValue("00");
         expect(screen.getByLabelText("Start timer")).toBeInTheDocument();
      })

   });

   it("should not allow non-numeric input in minute input", () => {
      render(<Timer />);
      const minuteInput = screen.getByLabelText("Minutes");
      act(() => {
         fireEvent.change(minuteInput, { target: { value: "a" } });
      });
      expect(minuteInput).toHaveValue("01");
   });

   it("should not allow non-numeric input in second input", () => {
      render(<Timer />);
      const secondInput = screen.getByLabelText("Seconds");
      act(() => {
         fireEvent.change(secondInput, { target: { value: "a" } });
      });
      expect(secondInput).toHaveValue("00");
   });

   it("should not allow seconds input greater than 60", () => {
      render(<Timer />);
      const secondInput = screen.getByLabelText("Seconds");
      act(() => {
         fireEvent.change(secondInput, { target: { value: "61" } });
      });
      expect(secondInput).toHaveValue("00");
   });

   it("should display the correct time format when timer is running", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");
      act(() => {
         fireEvent.click(playButton);
      });

      act(() => {
         vi.advanceTimersByTime(1000);
      });

      expect(screen.getByText("00:59")).toBeInTheDocument();
   });

   it("should display the correct time format when timer is paused", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");
      act(() => {
         fireEvent.click(playButton);
      });

      act(() => {
         vi.advanceTimersByTime(1000);
      });

      const pauseButton = screen.getByLabelText("Pause timer");

      act(() => {
         fireEvent.click(pauseButton);
      })

      expect(screen.getByTestId('minute-input')).toHaveValue("00");
      expect(screen.getByTestId('seconds-input')).toHaveValue("59");

   });

   it("should reset the input fields when the timer is reset", () => {
      render(<Timer />);
      const minuteInput = screen.getByLabelText("Minutes");
      const secondInput = screen.getByLabelText("Seconds");

      act(() => {
         fireEvent.change(minuteInput, { target: { value: "2" } });
         fireEvent.change(secondInput, { target: { value: "30" } });
      });


      const resetButton = screen.getByLabelText("Reset Timer");

      act(() => {
         fireEvent.click(resetButton);
      })


      expect(minuteInput).toHaveValue("01");
      expect(secondInput).toHaveValue("00");
   });

   it("should handle Enter key press on buttons", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");

      act(() => {
         fireEvent.keyDown(playButton, { key: "Enter" });
      });

      expect(screen.getByLabelText("Pause timer")).toBeInTheDocument();

   });

   it("should handle Space key press on buttons", () => {
      render(<Timer />);
      const playButton = screen.getByLabelText("Start timer");
      act(() => {
         fireEvent.keyDown(playButton, { key: " " });
      });
      expect(screen.getByLabelText("Pause timer")).toBeInTheDocument();
   });

   it("should not allow empty input in minute input", () => {
      render(<Timer />);
      const minuteInput = screen.getByLabelText("Minutes");
      act(() => {
         fireEvent.change(minuteInput, { target: { value: "" } });
      });
      expect(minuteInput).toHaveValue("00");
   });

   it("should allow two digits input in minute input", () => {
      render(<Timer />);
      const minuteInput = screen.getByLabelText("Minutes");
      act(() => {
         fireEvent.change(minuteInput, { target: { value: "12" } });
      });
      expect(minuteInput).toHaveValue("12");
   });

   it("should not allow empty input in second input", () => {
      render(<Timer />);
      const secondInput = screen.getByLabelText("Seconds");
      act(() => {
         fireEvent.change(secondInput, { target: { value: "" } });
      });
      expect(secondInput).toHaveValue("00");
   });

   it("should not allow negative input in minute input", () => {
      render(<Timer />);
      const minuteInput = screen.getByLabelText("Minutes");
      act(() => {
         fireEvent.change(minuteInput, { target: { value: "-1" } });
      });
      expect(minuteInput).toHaveValue("01");
   });

   it("should not allow negative input in second input", () => {
      render(<Timer />);
      const secondInput = screen.getByLabelText("Seconds");
      act(() => {
         fireEvent.change(secondInput, { target: { value: "-1" } });
      });
      expect(secondInput).toHaveValue("00");
   });

   it("should not allow input greater than 59 in second input", () => {
      render(<Timer />);
      const secondInput = screen.getByLabelText("Seconds");
      act(() => {
         fireEvent.change(secondInput, { target: { value: "61" } });
      });
      expect(secondInput).toHaveValue("00");
   });

});