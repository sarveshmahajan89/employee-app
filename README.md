# Employee Feedback application uisng MERN stack

This application allows employees to submit feedback toward each other's performance review.
This project is made with ReactJs as a UI framework, bootstrap css library, ExpressJs for API service with Nodejs as server side serving for API calls management, and mongodb for database.

## Application features

- #### Admin view 
    - Add/remove/update/view employees.
    - view performance reviews.
    - Assign employees within team to participate in another employee's performance review.
    
- #### Employee view 
    - List of employees performance reviews requiring feedback.
    - Submitting feedback.
    
## Using this project

Clone the project, change into the directory and install the dependencies.

```bash
cd employee-app
npm install
```
## Using this project

Run the React application on its own with the command:

```bash
npm run start
```

Run the API server on its own with the command:

```bash
npm run server
npm run server
```

Run both the applications together with the command:

```bash
npm run app-start
```
Note: If you're running this code locally, and facing "connection error: ERROR queryTxt EREFUSED", try using a different internet provider, like using your phone's hotspot instead of your home wi-fi or vice versa. 
Some ISPs have trouble with Atlas.

Run automated tests()created using Enzype test API with the command:

```bash
npm run test
```
The React application will run on port 3001, while server is running om poort 3000.
