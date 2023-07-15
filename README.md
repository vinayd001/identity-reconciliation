# Welcome to Identity Reconciliation Project

It solves to identify and keep track of a customer's identity across multiple purchases.

# .env file

PORT=3000
#### POSTGRES
PG_HOST=localhost
PG_PORT=5430
PG_USER=postgres
PG_DB=postgres
PG_PASSWORD=password

## how to start the server
num run dev

## how to stop the server
CTRL + C

## Project tech stack
express + typescript + pg sql

## how to run the api
you can call the api using below curl

curl --location 'https://bitespeed-interview-test.onrender.com/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "lorraine@hillvalley.edu",
	"phoneNumber": "123"
}'

URL=https://bitespeed-interview-test.onrender.com/identify