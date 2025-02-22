import { PropsWithChildren } from "react";

interface TimerCircleProps {
   radius: number;
   circumference: number;
   height: number;
   width: number;
   timeLeft: number;
   totalTime: number;
}

export const TimerCircle = (props: PropsWithChildren<TimerCircleProps>) => {
   const { radius, circumference, height, width, timeLeft, totalTime, children } = props;

   // Calculates the amount of circle to show based on the time left
   const percentage = (timeLeft / totalTime) * 100;

   const circlePosition = (percentage / 100) * 2 * Math.PI;

   // Calculate x and y position for small circle based on the timer's radius and size (100x100)
   const circleX = 100 + radius * Math.cos(Math.PI / 2 - circlePosition);
   const circleY = 100 - radius * Math.sin(Math.PI / 2 - circlePosition);

   return (
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200" role="img" aria-label="Timer progress">
         <circle
            className="text-secondary"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={width}
            cy={height}
         />
         <circle
            className="text-white transition-all duration-300"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * percentage) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={width}
            cy={height}
         />
         <circle
            className="text-white transition-all duration-300"
            r={12}
            cx={circleX}
            cy={circleY}
            fill="currentColor"
            transform="rotate(90 100 100)"
         />
         {children}
      </svg>
   )
}