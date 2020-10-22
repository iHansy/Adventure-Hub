# Adventure Hub


_Duration: 2 week sprint_

A few of my favorite things to do are hiking, biking, camping, and traveling. I'm also a huge planner, so I love making lists, specifically lists of adventures I want to go on. I realized that there was a problem with these lists I was making in my phone. They were crammed, unorganized, and not easy to read. Therefore sparked the idea of Adventure Hub.

Adventure Hub is a social media application where users can keep organized bucket lists of future and past adventures. Once a future adventure has been completed, a user can edit that adventure's pictures, description, and additional information with the click of a button. There are two other main features I integrated into this application. The first being a user feed page, where a user can see all the adventures of other users and drop a like if they think it's cool. Secondly, I implimented a national state park search feature to search for parks by state. Here a user can find a park that they like and directly add it as an upcoming future adventure.

## Screen Shots

This is the home page where a student will start their feedback. The professor can click "Admin View" to view all responses.

![home](images/feedback-tracker-home.png)

This is the admin page where the professor can view all submissions and delete any if needed.

![admin](images/feedback-tracker-admin.png)


### Prerequisites

If you plan to clone and run this application, first install Node.js:

- [Node.js](https://nodejs.org/en/)

## Installation

1. Create a database named `prime_feedback`.
2. The queries in the `data.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
3. Open up your editor of choice and run an `npm install`.
4. Run `npm run server` in your terminal.
5. Run `npm run client` in your terminal.
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Starting on the home page, click 'Start Feedback'.
2. Continue with the questions and hit next when filled in.
3. Feel free to add a comment, but this is optional.
4. On the review page you can go back and edit your responses or click 'Submit'.
5. Find the feedback history by clicking 'Admin View' on the home page.

## Technologies used

Prime stack -
- Index.html
- CSS
- JavaScript
- Node.js
- React.js
- Redux.js
- Express
- PostgreSQL

## Acknowledgement
Thanks to [Prime Digital Academy](https://www.primeacademy.io) who equipped and helped me to make this application a reality. Also huge thanks to my cohort Rabin and my family!

## Support
If you have suggestions or issues, please email me at Hansolo6283@gmail.com
