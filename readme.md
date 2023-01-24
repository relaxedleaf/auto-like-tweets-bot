# Description

This project features a simple Twitter Bot that acts on your behave to periodically like people's tweets based on the search terms that you provided.

<br>

# Getting Started

## Installation

-   `yarn install` - To install all the dependencies

-   Create `.env` file and copy the keys from `.env.example` over

-   Get the secrets from [Twitter API](https://developer.twitter.com/en/docs/twitter-api) and make sure that you requested `elevated access`

-   Modify the timezone to best suit your location

-   Customize your custom tweet searches by changing keywords in `/src/constants/searchWords.ts`

<br>

## Commands

| Command        | Description                       |
| -------------- | --------------------------------- |
| `yarn install` | Install dependencies              |
| `yarn dev`     | Start dev server                  |
| `yarn start`   | Start production server           |
| `yarn build`   | Remove existing build and rebuild |

<br>

## Dependencies

| Command          | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `dotenv`         | To manage environment variables                                 |
| `twitter-api-v2` | A handy Twitter API client that supports v1 and v2 APIs         |
| `date-fns`       | Library to format and deal with Date objects                    |
| `date-fns-tz`    | Sub package of `date-fns` used to deal with Date with timezones |

<br>

## Dev Dependencies

| Command       | Description                                                                            |
| ------------- | -------------------------------------------------------------------------------------- |
| `typescript`  | To access TypeScript CLI using `tsc` command                                           |
| `@types/node` | Get type safety and auto-completion on Node APIs such as `file`, `path`, and `process` |
| `ts-node`     | Execuate TypeScript code directly without having to wait for it be compiled            |
| `rimraf`      | A cross-flatform tools that acts like `rm -rf`                                         |
| `nodemon`     | Watch for changes and automatically restart the server when a file is changed          |
