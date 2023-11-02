backend-nodejs-challenge
========================

Welcome to the AMPEERS Energy Backend challenge.
This challenge consists of 4 main tasks.

Time
----

You have 120+ minutes time to solve the tasks of the challenge.

Questions
---------

If you have questions during the challenge, please send us a short mail.


Submission
----------

Please send your results as ZIP file, as an email-attachment, or better yet as a
wetransfer link (or similar), to avoid issues with certain mail filters or size
limits.

Make sure to include some form of instructions of how to run your code.
We use Yarn for depdendency management internally, but a ReadMe and a
`package.json` are fine as well.

---

Tasks
-----

Our general setting can be described as:
* You have several blocks of emission related data (carbondioxyde, methane etc. as JSON)
  * For Task 2 - keep in mind that this data has to be gathered from a REST API which is slow >5secs.
* Your main objective is to design & try to implement a architecture so that the following things are considered:
  * can be queried (search, sorted, filtered, range, aggregates, ...)
    * Error handling
    * GraphQL or REST
    * Concrete APIS
      * filter:
        * should be able to filter the resultset by a given start- & end-date
        * should be able to filter the resultset by the `average` property with greater or less than a specified value
      * aggregate:
        * aggreate the `average` value from the filtered results by a mathematical basic function like `sum, mean, ...`
  * uses ressources efficiently when a huge load applied
  * data can be updated via an api
  * can be consumed as a stream, for example for 3rd party
* Implement as many parts of your architecture as you can in NodeJS.
* See example data in `./data`

> ℹ The data itself is not that important. Its more to be able to demonstrate your ideas.
> Its that small for simplification reasons.
> A real world use-case will contain a much higher volume of data!
> The data was grabbed from: https://api.v2.emissions-api.org/ui/
> It contains emission statistics for Germany.

### Task 1: Vanilla JavaScript (WarmUp)

  * Implement a function which takes a arbitary nested JS Object and do the following transformations:
    * add +1 to each Number: `x: 9 =&gt; x: 10`
    * add 'AE' to each String: `y: 'abc' =&gt; y: 'abc AE'`
    * the object should keep its structure!
    * See a rough example structure below:

    ```js
    // initial object
    {
      a: 123,
      b: 'abc'
      c: [1, 2, 3],
      d: {
        e: [4, 5, 6]
      }
    }

    // resulting object
    {
      a: 124,
      b: 'abc AE'
      c: [2, 3, 4],
      d: {
        e: [5, 6, 7]
      }
    }
    ```

### Task 2

* Consists of theoretical 2a and practical 2b.
* __Point your focus clearly on 2b!__


### Task 2a: Architecture

* Describe a rough architecture, which somehow adresses the requirements from above.

- We will use Express.js to create a server, handle our routes to fetch specific resources.
- An app file which will create a server, includes dedicated routes, listen to the incoming requests, handle and send the responses accordingly. 
- We can add express middlewares to make it secure like cors, helmet etc. (JWT, sanitize, input validation, rate limiter, auth are not in scope )
- Routes folder contains all the routes containing resource name and its handler
- Handler contains the handling of request body to the route, extract inputs from req.body and call the respective services to serve it.
- Services folder contains functions which will work on the db collections(json store in this case) by using inputs from their handlers.
- Json data will be stored as key-value in Services to mimic the Db or external storage.
- Middlewares folder contains the basic required express middleware features.
- Logging mechansim is used using winston to log errors, responses etc.
- Node cache to cache the response(node-cache npm or Redis not in scope)
- If the data doesn't change very frequently, you can pre-fetch and store it periodically. We can cache it or store in Db etc(Not in scope)
- Adding Timeouts, Retries, throttling, maintain rate-limit-bucket mechanism (Not in scope)
- Streaming of JSON is not in scope but cannot be sent using express-stream-json
- Data updation is not in scope. We can acheieve using put calls and updating the resouces either in memory or directly in the file


* You can use any technology you migh think makes sense.
- We will use Express.js, RESTful APIs and express middlewares.

* Describe why you choosen a particular technology.
- These technologies are widely used, lot of features included, stable and community support for the issues encountered.

* You could either write things down or scribble it - as you prefer.

This concludes task 1 and leads you to the next one.


### Task 2b: Implementation

* Implement your architecture, created in Task 1.
* In order to simplify the task we already provided the initial data in the `data` folder.


### Task 3: Evil-Question-NodeJS (JavaScript)

* What will be logged / happen with the following code lines.
* Whats the issue here? Short description is totally fine.

```js
const _promise = Promise.reject(new Error('BOOOM'));
_promise.then(() => console.log('.then'));
_promise.catch(console.log)
```
Should log the string BOOM.
Since we are rejecting the Promise Object, the catch handler will handle the Promise rejection.

---

Final Notes
-----------

**A mature concept is better than some half-working code 😊**
**We do not count seconds - so take some minuts more if you´re in the flow!**

Have fun during the task - We wish you best of luck! 🚀
