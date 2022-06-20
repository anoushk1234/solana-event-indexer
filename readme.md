# Solana Indexer

Note: the anchor npm package required a package called superstruct to work with cron so i manually added it, if you run npm install you might also have to do this.

This is a very basic prototype i built in a couple of hours, theres a lot of room for improvement and additions like geyser plugins but atleast it works.

## How does it work?

the emitter program has an event that is emitted, the listner.ts has a cron job with a listner for the specific event and that runs in parallel to an express server with a graphql api, gui and postgress db. When an event is emitted the listner gets the event and the db is updated, we can then use the /graphql endpoint to see the data. There is one issue where the same event gets either fired twice or listened twice but ill see to that in the future.

## How to use it locally?

Create a postgres db using `createdb <db_name>`
In `database/models/models.ts` replace solanaindexer with the name of your db
Manually create a table or use the commented code in model.ts to create one.
Get the smart contract up and running, thats pretty straight forward.
Run `npm run start`
go to the /graphql endpoint and run a query, you should see the data.
