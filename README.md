# ITechArt traineeship.

> Note-app training server with integrated database.    

## Overview  

> Hi there! Welcome to my note-app server application. This app was developed due to problems with integration of server emulators with your React App.
>  
> So what is this application is used for? This app provides all the neccessary functionality to create, update, delete, read and store your data (notes, users data), provides authorisation features and notes-sharing system.  
>     
> What is more, this app is really easy to integrate with and it's logic incredibly user-friendly.

## Instructions

### Common

> I really advice you to watch [this](https://www.youtube.com/watch?v=WMO9aarO390) video before you will start integrate out API to yout application. If you're not familliar with **js requests** and **JWT** you should learn about this as soon as it posible. I also advice you to use **axios** library for requests sending and response handling.
>  
> API base url is: [https://note-app-training-server.herokuapp.com/](https://note-app-training-server.herokuapp.com/).
> 
> All the neccessary information about API end-points you can find there: [API-documentation](https://note-app-training-server.herokuapp.com/api-docs/).

### Endpoints

> #### Notes
> ---
> *All these end-points are secured with JWT authorisation!*
> 1. `api/notes [GET]` - get the page of notes belonging to particular user. If you're confused with the word **page**, check what is **pagination**.   
> The **number of page** you want to get you should provide in request query as `page` parameter. If value is not provided, API will use default page value - **1**  
> You can also provide notes filter options using query to filter the notes you want to receive. There are such options as `name` (filtering by note title), `dateFrom` and `dateTo` (filtering by creation date). Note, that if you provide the incorrect date values, API will filter note as if you did not provided them.
> If there are no errors, you will receive an array of notes represented as JSON. See example:
> ```
>  [  
>    {  
>      "id": "619559804621f90bbeae1a1a",  
>      "title": "Text Jimmy on facebook",  
>      "description": "Today I'm gonna finally text Jim about incoming party.",  
>      "createdAt": "2002-07-22T00:00:00.000Z",  
>      "updatedAt": "2002-07-25T00:00:00.000Z",  
>      "sharedWith": [  
>        [  
>          "apolo@gmail.com"  
>        ]  
>      ]  
>    }  
>  ]  
> ```  
> 2. `api/notes [POST]` - create new note. Requires note `title` and `description` fields in request body. Example:
> ```
> {
>    "title": "Some title",
>    "description": "Some note content"
> }
> ```
> Fields are mandatory and validated by API. Validation rules are: both title and description represented as **string**, title length is **3+** symbols, description length is from **3** up to **500** symbols.  
> If no errors occured while proccessing the request, user will recieve a json object of note with additional **id** and **createdAt** fields, which are set by server, as response. Example:  
> ```
> {
>   "id": "619559804621f90bbeae1a1a",
>   "title": "Text Jimmy on facebook",
>   "description": "Today I'm gonna finally text Jim about incoming party.",
>   "createdAt": "2002-07-22T00:00:00.000Z",
> }
> ```  
> 3. `api/notes/{note id} [PUT]` - update note by ID with provided in body new `title` and `description` values. Body example:  
> ```
>  {
>    "title": "Updated title",
>    "description": "Some updated note content"
>  }
> ```  
> If validation succed and no errors occured user will receive an object with updated note values as response and `updatedAt`, which is set by server and shows when the note was last time updated. Example:  
> ```
>  {
>    "id": "619559804621f90bbeae1a1a",
>    "title": "Text Jimmy on facebook",
>    "description": "Today I'm gonna finally text Jim about incoming party.",
>    "createdAt": "2002-07-22T00:00:00.000Z",
>    "updatedAt": "2002-07-25T00:00:00.000Z"
>  }
> ```  
> 4. `api/notes/{note id} [DELETE]` - delete note with particular id provided in path. If no errors occured, user will receive an object, containing `id` and `success` fields. Example:  
> ```
>  {
>    "success": true,
>    "id": "61978398175a4d517602b064"
>  }
> ```  
> 5. `api/notes/share [GET]` - get a page of shared with particular user notes. You can provide **page number** in query, otherwise you will receive default (first) page. Successfull response example:  
> ```
>  [
>    {
>      "id": "619559804621f90bbeae1a1a",
>      "title": "Text Jimmy on facebook",
>      "description": "Today I'm gonna finally text Jim about incoming party.",
>      "createdAt": "2002-07-22T00:00:00.000Z",
>      "updatedAt": "2002-07-25T00:00:00.000Z",
>      "author": "apolo@gmail.com"
>    }
>  ]
> ```
> 6. `api/notes/share/{note id} [PUT]` - share note by provided in path `id` with several users.  
> Users you want to share note with represented as an array of users emails in `users` field. Example:  
> ```
>  {
>    "users": [
>      "apolo@gmail.com"
>    ]
>  }
> ```
> If no errors occured, user will receive an array of users emails, that are the ones, who you successfully shared note with. Example:  
> ```
>  [
>    "apolo@gmail.com"
>  ]
> ```
> ---
> #### Users
> ---
> *Endpoints which require auth token marked as [SECURED]*
> 1. `[SECURED] api/users [GET]` - get all users list. No parms. Success response example:  
> ```
>  [
>    {
>      "email": "daniel.apolo@gmail.com",
>      "firstName": "Daniel",
>      "lastName": "Apolonik",
>      "birthday": "2002-04-25T00:00:00.000Z"
>    }
>  ]
> ```
> 2. `api/users [POST]` - register new user. Requires a body with `email`, `firstName`, `lastName`, `birthday` and `password` fields. Example:  
> ```
>  {
>    "email": "daniel.apolo@gmail.com",
>    "firstName": "Daniel",
>    "lastName": "Apolonik",
>    "birthday": "2002-04-25T00:00:00.000Z",
>    "password": "somepass321"
>  }
> ```
> All fields are validated. There are fields validation rules: 
> - Email: regexp - `^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+` (apolo@gmail.com).  
> - First name and lastName: regexp - `^[A-Z][a-z]+(-[A-Z][a-z]+)*$` (Apolo-Daniel, Daniel).
> - Birthday: any valid date string that can be converted to Date type. Note that if you don't provide timezone in your date string, server will use his own timezone.  
> - Password: 8+ symbols, at least 1 letter and 1 digit required. Only digits and letters are allowed.  
>
> If validation is successfull and there are no errors occured, user will receive an object, containing all the common information about the registered user and also a pair of auth tokens: access token and refresh token. Example:  
> ```
>  {
>    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJlLm5vdGVzQGdtYWlsLmNvbSIsImlhdCI6MTYzNzY4MTMzOCwiZXhwIjoxNjM3NjkyMTM4fQ.mQxkBmyknTUErUtZoT4zwleIMG5s4iqffY4xPxuhCRE",
>    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFdas8daXnNoYXJlLm5vdGVzQGdtYWlsLmNvbSIsImlhdCI6MTYzNzY4MTMzOCwiZXhwIjoxNjM3NjkyMTM4fQ.mQxkBmyknTUErUtZoT4zwleIMG5s4iqffY4xPxuhCRE",
>    "user": {
>      "email": "daniel.apolo@gmail.com",
>      "firstName": "Daniel",
>      "lastName": "Apolonik",
>      "birthday": "2002-04-25T00:00:00.000Z"
>    }
>  }
> ```
> 3. `[SECURED] api/users [PUT]` - update some general information about user. Just provide new values (even if they are note changed) in `firstName`, `lastName` and `birthday` fields. Example:  
> ```
>  {
>    "firstName": "Daniel",
>    "lastName": "Apolo",
>    "birthday": "2002-04-25T21:00:00.000Z"
>  }
> ```
> If no errors occured, user will receive updated user's common info as an object. Example:  
> ```
> {
>    "email": "daniel.apolo@gmail.com",
>    "firstName": "Daniel",
>    "lastName": "Apolonik",
>    "birthday": "2002-04-25T00:00:00.000Z"
>  }
> ```
> 4. '[SECURED] api/users/password [PUT]` - update user's password. Requires `oldPassword` and `newPassword` fields in body. Example:  
> ```
>  {
>    "oldPassword": "some0ldPassword",
>    "newPassword": "someNewPassw0rd"
>  }
> ```
> If no errors occured, user will receive updated user's common info as an object. Example:  
> ```
> {
>    "email": "daniel.apolo@gmail.com",
>    "firstName": "Daniel",
>    "lastName": "Apolonik",
>    "birthday": "2002-04-25T00:00:00.000Z"
>  }
> ```
> ---
> #### Authentification  
> *No security*  
> *DO NOT USE YOUR **REAL** CREDENTIALS. All your requests are logged in plain mode, so we can see some details of them.*
> 1. `api/users/auth [GET]` - auth by credentials attempt, returns access token and refresh token if succeed. Credentials are passed through body. Example:  
> ```
>  {
>    "email": "apolo@gmail.com",
>    "password": "s0mepass"
>  }
> ```
> If no errors occured, user will receive a pair of new auth tokens and user's common information. Example:  
> ```
>  {
>    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJlLm5vdGVzQGdtYWlsLmNvbSIsImlhdCI6MTYzNzY4MTMzOCwiZXhwIjoxNjM3NjkyMTM4fQ.mQxkBmyknTUErUtZoT4zwleIMG5s4iqffY4xPxuhCRE",
>    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFdas8daXnNoYXJlLm5vdGVzQGdtYWlsLmNvbSIsImlhdCI6MTYzNzY4MTMzOCwiZXhwIjoxNjM3NjkyMTM4fQ.mQxkBmyknTUErUtZoT4zwleIMG5s4iqffY4xPxuhCRE",
>    "user": {
>      "email": "daniel.apolo@gmail.com",
>      "firstName": "Daniel",
>      "lastName": "Apolonik",
>      "birthday": "2002-04-25T00:00:00.000Z"
>    }
> }
> ```
> 2. `api/users/auth/refresh [POST]` - refresh tokens using refresh token. Provide `refreshToken` field in the body of your request. Example:  
> ```
>  {
>    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJlLm5vdGVzQGdtYWlsLmNvbSIsImlhdCI6MTYzNzY4MTMzOCwiZXhwIjoxNjM3NjkyMTM4fQ.mQxkBmyknTUErUtZoT4zwleIMG5s4iqffY4xPxuhCRE"
>  }
> ```
> If no errors occured, user will receive a pair of new auth tokens. Example:  
> ```
>  {
>    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJlLm5vdGVzQGdtYWlsLmNvbSIsImlhdCI6MTYzNzY4MTMzOCwiZXhwIjoxNjM3NjkyMTM4fQ.mQxkBmyknTUErUtZoT4zwleIMG5s4iqffY4xPxuhCRE",
>    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFdas8daXnNoYXJlLm5vdGVzQGdtYWlsLmNvbSIsImlhdCI6MTYzNzY4MTMzOCwiZXhwIjoxNjM3NjkyMTM4fQ.mQxkBmyknTUErUtZoT4zwleIMG5s4iqffY4xPxuhCRE"
>  }
> ```
> ---

### Auth info  

> As I mentioned before, we use JWT tokens in our API to authorise.  
> `Access Token` has low expire time value (3h). You should use this token to access all the secured enpoints. Provide this token as `Authorization` HTTP header with value as `Bearer [token]` (without []).
> If `Access Token` has expired, you will receive appropriate message with **403 FORBIDDEN** status code. That means you should either refresh it using `Refresh Token` or just authorise using credentials again.  
>   
> `Refresh token` is stored in database and it also has expire time(24h). That means you can use this tokens again and again not asking users to log in again. Each time you refresh tokens you will receive new `Refresh Token` too and previous token becomes invalid.  
> After `Refresh token` expired you should authorise using credentials again.  

## Conclusion   

> I hope my API will help you to create a decent web application and would save your time working with server emulators.  
>
> If you have some additional questions, or you found out, that API works incorrectly (it might be so), please, contact either your mentor or me directly.  
>  
> My contacts:  
> **Skype** : live:.cid.e8d1c9789d0b2336  
> **E-mail**: apolonik.danila2002@gmail.com  
> **TG**    : @dapodev  
> **INST**  : @dapo.dev  

# Good luck!




