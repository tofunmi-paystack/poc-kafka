# Proof of Concept: Kafka + NodeJS

## Overview
I was tasked by Wes to study Kafka (for my self-development) and thereafter, attempt to make an application using the concept learned.

This application is a two-in-one: producer app and consumer app. These two apps are independent. That is, they do not rely on each other for dependencies neither do they have any shared files.

Each application has its own package.json, signifying that they manage their dependencies independently.

## Setup
Follow the instructions below to se tup both the `producer` and the `consumer` applications.

Firstly, since this is a Kafka project, we need to have a kafka instance running. A docker compose file has been added to the root of this folder to allow you easily spawn up a Kafka + Zookeeper instance.

Simply run in the root directory (where this readme is):
```shell
$ docker-compose up -d
```
After a successful composition, kafka should be exposed on `9092` (you can change this by modifying the `docker-compose.yml` file). Now, we can go ahead to spinning up the consumer.

### Spin-Up Consumer
Kindly make sure your node version is 14.0+ (you can use `nvm` to manage multiple versions of node on your machine).

- check in to the consumer app directory
  ```shell
    $ cd consumer  
  ```
- install the dependencies
  ```shell
   $ npm install
  ```
- create a `.env` file and copy the content from `.env.example` into it, or simply run
  ```shell
   $ cp .env.example .env
  ```
- edit the `.env` file, you can most likely leave as is except you want to change the values of the variables. Please, pay attention to the `KAFKA_*` variables as you'll be using the same values you set here in the producer app. 
- Now, you are set to run the consumer. Run
  ```shell
   $ npm run start
  ```
_Now, you should have your consumer running and waiting for messages from the topics in the `config/handlers.js` file (fed by the producer). Leave this terminal open as the is where you will see the requests being received from the topics by the consumer._

### Spin-Up Producer
Now that the consumer is up and running, let's spin up a producer that we can you to send requests.

- check in to the producer app directory
  ```shell
    $ cd producer  
  ```
- install the dependencies
  ```shell
   $ npm install
  ```
- create a `.env` file and copy the content from `.env.example` into it, or simply run
  ```shell
   $ cp .env.example .env
  ```
- edit the `.env` file, you can most likely leave as is except you changed the values of the variables for the consumer. Please, pay attention to the `KAFKA_*` variables as you'll be using the same values you set the consumer app.
- now, you are set to run the Producer. Run
  ```shell
   $ npm run start
  ```
- the available routes on the producer are:
  - **PUT** `/api/v1/transactions/:transactionId/cancel`
  - **PATCH** `/api/v1/transactions/:transactionId` 
  
    **Request**:
    ```json
    {
      "amount": 40000,
      "currency": "USD" 
    }
    ```

When you hit any of these routes, go check the terminal with the consumer, you should be seeing the received requests.

Thank you!