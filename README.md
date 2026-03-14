# WanderLust - Travel Listings Platform

WanderLust is a full-stack web application that enables users to
explore, create, and review travel accommodation listings. The platform
provides secure authentication, dynamic listing pages, image uploads,
and a review system, simulating a simplified Airbnb-style travel listing
platform.

The project is built using **Node.js, Express, MongoDB, and EJS**
following the **MVC architecture** and **RESTful API design
principles**.


🔗 **Application:**  
https://wanderlust-81q2.onrender.com/

------------------------------------------------------------------------

## Features

### Secure Authentication

-   User signup and login using **Passport.js**
-   **Session-based authentication**
-   **OTP-based email verification**
-   Authorization middleware for protected routes

### Listing Management

-   Create, update, and delete travel listings
-   Upload listing images using **Cloudinary**
-   Dynamic listing pages with optimized image delivery
-   Server-side validation using **Joi**

### Reviews and Ratings

-   Users can add reviews to listings
-   Ratings system for user feedback
-   Nested review routes under listings

### User Experience

-   Server-side rendered views using **EJS templates**
-   Reusable layout components
-   Flash messages for user notifications
-   Client-side form validation

------------------------------------------------------------------------

## Tech Stack

**Backend** - Node.js - Express.js - MongoDB - Mongoose

**Authentication** - Passport.js - Express-session - OTP email
verification

**Frontend** - EJS - CSS - JavaScript

**Cloud Services** - Cloudinary (image hosting and CDN)

**Validation & Utilities** - Joi validation - Custom error handling -
Async wrapper utilities

------------------------------------------------------------------------

## Project Architecture

    wanderlust
    │
    ├── controllers
    │   ├── listingsController.js
    │   ├── reviewController.js
    │   └── userContoller.js
    │
    ├── models
    │   ├── listing.js
    │   ├── review.js
    │   └── user.js
    │
    ├── routes
    │   ├── listing.js
    │   ├── review.js
    │   └── user.js
    │
    ├── public
    │   ├── css
    │   │   └── style.css
    │   └── js
    │       └── formValidation.js
    │
    ├── utils
    │   ├── ExpressError.js
    │   ├── schemaValidate.js
    │   ├── sendOTP.js
    │   └── wrapAsync.js
    │
    ├── views
    │   ├── layouts
    │   │   └── boilerplate.ejs
    │   ├── includes
    │   │   ├── navbar.ejs
    │   │   └── footer.ejs
    │   ├── partials
    │   │   └── flash.ejs
    │   ├── listing
    │   │   ├── edit.ejs
    │   │   ├── index.ejs
    │   │   ├── new.ejs
    │   │   └── show.ejs
    │   └── users
    │       ├── login.ejs
    │       ├── signup.ejs
    │       └── verifyOtp.ejs
    │
    ├── Middleware.js
    ├── cloudConfig.js
    ├── schemaJoi.js
    ├── app.js
    └── package.json

------------------------------------------------------------------------

## Application Workflow

1.  User registers an account\
2.  Email verification is completed using OTP\
3.  User logs in using Passport authentication\
4.  Authenticated users can:
    -   Create travel listings
    -   Upload property images
    -   Edit or delete their listings\
5.  Visitors can:
    -   Browse all listings
    -   View property details
    -   Add reviews and ratings

------------------------------------------------------------------------

## RESTful API Routes

| Method | Route | Description |
|------|------|------|
| GET | `/listings` | Retrieve all listings |
| GET | `/listings/:id` | Retrieve a specific listing |
| POST | `/listings` | Create a new listing |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |

------------------------------------------------------------------------

## Installation

Clone the repository

``` bash
git clone https://github.com/brijeshkumarmorya/wanderlust.git
cd wanderlust
```

Install dependencies

``` bash
npm install
```

Create a `.env` file and configure environment variables

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_KEY=
    CLOUDINARY_SECRET=

    EMAIL_USER=
    EMAIL_PASS=

    SESSION_SECRET=
    MONGODB_URL=

Run the application

``` bash
node app.js
```

The server will start at

    http://localhost:8080

------------------------------------------------------------------------

## Deployment

The application can be deployed using:

-   Render
-   Railway
-   MongoDB Atlas
-   Cloudinary CDN

------------------------------------------------------------------------

## Future Improvements

-   Advanced search and filtering
-   Map integration (Google Maps or Mapbox)
-   Booking functionality
-   Payment gateway integration
-   Multiple image uploads per listing
-   User profile dashboard

------------------------------------------------------------------------

## Author

**Brijesh Kumar**

B.Tech -- Faculty of Technology\
University of Delhi

Full Stack Developer
