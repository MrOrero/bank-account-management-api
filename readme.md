## Bank Account Management API

### Introduction

This is an API that allows users to carry out basic Bank Account operations
You can view the live API [here](https://bank-account-management-api-m3mi.onrender.com/).

This api was developed using

- NodeJs (version 18.10.0)
- Express
- TypeScript

## Getting Started

### Prerequisites

The tools listed below are needed to run this application to run effectively:

- Node
- Npm

You can check the Node.js and npm versions by running the following commands.

### Check node.js version

`node -v`

### Check npm version

`npm -v`

## Installation

- Install project dependencies by running `npm install`.

- Before compilation you should install typescript globally using `npm install typescript`

- Then to compile kindly use `npm build`

- Start the server with `npm start`

- Alternatively you can run the application in watch mode using `npm run start:dev`

- Access endpoints on your desired localhost set port

## Run the tests

```shell
npm run test
```

All tests are written in the `src/test` directory.

# REST API

The REST API to the _Bank Management API_ is described below.

The base URL is

    http://localhost/

The base URL for the live version is

    https://bank-account-management-api-m3mi.onrender.com/

| Method | Description         | Endpoints                       |
| :----- | :------------------ | :------------------------------ |
| POST   | Create Account      | /account/add-account            |
| POST   | Get Account Details | /account/:accountNumber/details |
| POST   | Get All Accounts    | /account/all                    |

## Postman documentation

https://documenter.getpostman.com/view/29346997/2s9Y5ctL1W

#### Deployed Link

You can [click here](https://bank-account-management-api-m3mi.onrender.com/) to test the api
