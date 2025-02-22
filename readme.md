### Prerequisites

- pnpm

### Installation / Running the App

You should be able to run the app via the devbox setup in Codesandbox and view a preview of the application.

It will be available on localhost:5173 in the preview

#### Running App Locally

You can create an SSH session with the devbox via VSCode or Cursor:

1. Go to the top right corner and click "Open in VSCode"
   a. You may need to install some extensions for SSH support to connect to the devbox
2. It should automatically run the app on localhost:5173
   a. If it doesn't, open up the terminal in the IDE and run `pnpm run dev`
3. Open up your browser to localhost:5173

### Running Tests

To run tests, use:

```sh
pnpm run test
```

### Notes

- Did not have a normal dev environment so apologies if there are some formatting issues as this was all done on Codesandbox
- AI Usage:
  - Used to help figure out items like generating an SVG and the math required to calculate how much of the timer to display
  - Used to help fill out edge cases on testing to achieve 100% test coverage
