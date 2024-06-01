# Testing Controllers and API Routes
Now that we know about testing pure functions and using mock functions in tests, it's time to learn how to test our backend controllers and API routes. 

**Consider this scenario**: We are building a social media web app similar to Twitter and want to test its controllers and routes functionality to make sure everything is working as expected.

## Setup
Like always, the first steps for this assignment are:

1. Open your terminal and navigate to your dedicated assignments folder.
2. Then clone this assignment repo on your local machine.
3. Now open the assignment folder on VSCode.

## Starter code
You will find the following starter code in the `src` folder of the project:

1. Express application setup in `app.js`
2. Basic setup for routes and controllers:
    - `controllers/post.js`
    - `controllers/comment.js`
    - `routes/index.js`
3. MongoDB database connection setup in `db/connection.js`.
4. Models for posts and comments in the `models` folder.

**Note**: In this project, we are using _"referencing"_ in the database schema for a change. We have explored embedding in many other assignments. Take a look at the models carefully. You will find that each post document has an array of comments and each comment in this array is referenced. At the same time, each comment document also has a reference to the post it belongs to.

_What is the advantage of this two-way referencing?_ : This allows to fetch data from both directions. For example, if we want to fetch a post with all its comments, we can do so from the posts collection, while if we want to fetch a single comment with its linked post we can do so from the comments collection. This is possible using the `populate()` function provided by Mongoose. However, we should be fetching from any one direction at a given time depending on the requirement.

## Requirements

Firstly, you must build out the controllers to complete the API. The routes are already linked to the controller functions in the starter code.
- **Get All Posts** : You must get all the posts with all their comments data populated.
- **Add New Post** : By default, a new post will not have any comments when created.
- **Get Single Post** : You must get the specified post with all its comments data populated.
- **Get Single Comment** : You must get the comment with its related post data populated.
- **Add Comment On Post** : When you create a new comment, you must add the necessary references in both comment and post documents.

Once you have completed building these controllers, it's time to write some tests.

### Testing Controllers

You will find a `__tests__` folder in the `controllers` folder to write unit tests for each controller function. Take the following approach to write your controller unit tests:
- Use mock functions for all database operations.
- Consider at least one happy path case and one edge case for each controller function.
- Your tests should verify if your controllers are calling the right Mongoose functions.
- Your tests should not perform any actual database operations.
- Your tests should not perform any actual HTTP requests.

### Testing API Routes

You will find a test file created inside the `routes` folder. Here is where we will take an integration testing approach and test out the actual end-to-end execution of our API endpoints. Take the following approach to write your API integration tests:
- Do not use any mock functions in these tests.
- Consider at least one happy path case and one edge case for each API endpoint.
- Your tests should perform the actual HTTP requests and then run assertions on the responses.
- Your tests should perform actual database operations for each test case.
- Your tests should run assertions on the HTTP response code and response body.

Your assignment will be evaluated on the basis of quality and coverage of test cases.

### Some considerations

- The database used for testing is different from the development one.
- You can use [setup and teardown](https://jestjs.io/docs/setup-teardown) for your API tests, where you can pre-populate the test database before running the tests and clean up the test database after running the tests.
- For now you can ignore the presence of any users collection for your app, as we are not focusing on authentication and authorization in this specific assignment.

## Working with docker

This app is bootstraped with docker and docker-compose. It containerize the server, as well as the database.

### To start the server

run the command `yarn && yarn start`. This will install all the dependencies and build the docker image

### To run the tests

run the command `yarn test`. Make sure that the server is up and running as well as the database

### To install packages

when you run `yarn add PACKAGE` the package will be installed in docker as well automatically. However if you run into issues, you need to stop the server first with `yarn run stop` then you can run `yarn run build` to rebuild the docker image and start again.

### To prune the containers and data

> ⚠️ WARNING: This is a destructuve command that would delete the containers and all the data inside like database data, and uploads

you can run `yarn run prune` to shutdown the server and delete all the volumes associated with it. This serves as a start fresh command, that will return your server environment to original. It will not affect your code changes though.

## Submission
Once you're ready to submit the assignment, follow these steps on your terminal:
1. Stage your changes to be committed: `git add .`
2. Commit your final changes: `git commit -m "solve assignment"`
3. Push your commit to the main branch of your assignment repo: `git push origin main`

After your changes are pushed, return to this assignment on Canvas for the final step of submission.