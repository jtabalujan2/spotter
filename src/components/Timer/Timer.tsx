import { ChangeEvent, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { getFormattedTime } from "../../utils/getFormattedTime";
import { TimerCircle } from "./TimerCircle";

const CIRCLE_RADIUS = 70;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const INITIAL_DEFAULT_TIME_LEFT = 60;
const DEFAULT_MINUTE_LEFT = '1';
const DEFAULT_SECOND_LEFT = '0';

interface TimerProps {
  className?: string;
}

export const Timer = ({ className }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_DEFAULT_TIME_LEFT);
  const [totalTime, setTotalTime] = useState(INITIAL_DEFAULT_TIME_LEFT);
  const [inputMinuteTimeLeft, setInputMinuteTimeLeft] = useState(DEFAULT_MINUTE_LEFT);
  const [inputSecondTimeLeft, setInputSecondTimeLeft] = useState(DEFAULT_SECOND_LEFT);
  const [isRunning, setIsRunning] = useState(false);

  const { time } = getFormattedTime(timeLeft);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);

        const { mins, secs } = getFormattedTime(timeLeft - 1);
        setInputMinuteTimeLeft(mins.toString());
        setInputSecondTimeLeft(secs.toString());
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setInputMinuteTimeLeft('0');
      setInputSecondTimeLeft('0');
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleInputMinuteTime = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setInputMinuteTimeLeft("0");
      return;
    }

    if (isNaN(Number(value)) || Number(value) < 0) {
      setInputMinuteTimeLeft(prev => prev);
      return;
    }

    const minuteInSeconds = Number(value) * 60;

    setInputMinuteTimeLeft(value);
    setTotalTime(minuteInSeconds + Number(inputSecondTimeLeft));
    setTimeLeft(minuteInSeconds + Number(inputSecondTimeLeft));
  }

  const handleInputSecondTime = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || value === "0") {
      setInputSecondTimeLeft("0");
      return;
    }

    if (isNaN(Number(value)) || Number(value) > 60 || Number(value) < 0) {
      setInputSecondTimeLeft(prev => prev);
      return;
    }

    const minuteInSeconds = Number(inputMinuteTimeLeft) * 60;

    setInputSecondTimeLeft(value);
    setTotalTime(minuteInSeconds + Number(value));
    setTimeLeft(minuteInSeconds + Number(value));
  }

  const handleTimerRunner = () => {
    setIsRunning(!isRunning);
  }

  const handleResetTimer = () => {
    setTimeLeft(INITIAL_DEFAULT_TIME_LEFT);
    setTotalTime(INITIAL_DEFAULT_TIME_LEFT);
    setInputMinuteTimeLeft(DEFAULT_MINUTE_LEFT);
    setInputSecondTimeLeft(DEFAULT_SECOND_LEFT);
  }

  const handleAddMinuteToTimer = () => {
    setTimeLeft(prev => prev + 60);
    setTotalTime(prev => prev + 60);
    setInputMinuteTimeLeft(prev => String(Number(prev) + 1));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  }

  return (
    <div className={className} data-testid="timer">
      <section className="w-48 h-48 mx-auto mb-4 relative flex items-center justify-center">

        <TimerCircle
          circumference={CIRCLE_CIRCUMFERENCE}
          radius={CIRCLE_RADIUS}
          timeLeft={timeLeft}
          totalTime={totalTime}
          height={100}
          width={100}
        >
          {isRunning && (
            <text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              transform="rotate(90 100 100)"
              fill="white"
              fontSize={24}
              role="timer"
              aria-live="polite"
            >
              {time}
            </text>
          )}
        </TimerCircle>

        {!isRunning &&
          <div className="absolute text-white text-2xl">
            <input
              className="max-w-10  text-right border-none outline-none"
              inputMode="numeric"
              value={inputMinuteTimeLeft.length < 2 ? inputMinuteTimeLeft.padStart(2, "0") : Number(inputMinuteTimeLeft).toString()}
              onChange={handleInputMinuteTime}
              aria-label="Minutes"
              data-testid="minute-input"
            />
            <label className="">:</label>
            <input
              className="max-w-10 border-none outline-none "
              inputMode="numeric"
              value={inputSecondTimeLeft.length < 2 ? inputSecondTimeLeft.padStart(2, "0") : Number(inputSecondTimeLeft).toString()}
              onChange={handleInputSecondTime}
              aria-label="Seconds"
              data-testid="seconds-input"
            />
          </div>
        }
      </section>

      <section className="mx-auto w-full flex justify-between items-center text-white" >
        <button className="cursor-pointer mr-3" onClick={handleAddMinuteToTimer} onKeyDown={handleKeyDown} tabIndex={0} aria-label="Add one minute">
          +1:00
        </button>

        <button onClick={handleTimerRunner} onKeyDown={handleKeyDown} tabIndex={0} className="cursor-pointer mr-3 bg-secondary p-2 rounded-full" aria-label={isRunning ? "Pause timer" : "Start timer"}>
          {isRunning ? <Pause /> : <Play />}
        </button>

        <button onClick={handleResetTimer} onKeyDown={handleKeyDown} tabIndex={0} className="cursor-pointer" aria-label="Reset Timer">
          Reset
        </button>
      </section >
    </div >
  );
};
