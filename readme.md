

# Feedback Sync Frontend

This is the frontend repository for the Feedback Sync project. It is built using modern web technologies to provide a seamless user experience.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Directories](#Directories)
- [Packages](#packages)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Feedback Sync is a platform designed to streamline the process of collecting and managing feedback. This repository contains the frontend code, which interacts with the backend services to provide a responsive and intuitive user interface.

## Prerequisites

To run this project, the backend should be running. You can find the backend repository at the following link:

[Feedback Sync Backend Repository](https://github.com/P2772571/feedback-sync-backend)

Additionally, ensure you have Node.js version 20 installed. You can download it from the [official Node.js website](https://nodejs.org/).

## Directories

- **node_modules/**: Contains all the installed dependencies and packages required for the project.
- **public/**: This folder contains public assets like the `logo` file, which serves as the entry point for the application.
- **src/**: The source code of the project, which includes the following subdirectories:
  - **assets/**: Stores images, icons, and other static assets used in the application.
  - **components/**: Contains reusable UI components for building different parts of the interface.
  - **config/**: Configuration files related to the application.
  - **layouts/**: Defines the layout structure of dashboard.
  - **pages/**: Contains the main pages of the application, such as the Dashboard Home, Login, Register, Goal, Pip etc.
  - **redux/**: Holds files related to the Redux store, actions, and reducers for state management.
    - **auth/**: This folder manages the authentication-related state using multiple slice files.
      - **authSlice.js**: Manages authentication state, such as login/logout and token management.
      - **feedbackSlice.js**: Handles feedback-related data and actions, allowing users to fetch or submit feedback.
      - **goalSlice.js**: Manages the state related to user goals, such as creating, updating, or fetching goals.
      - **pipSlice.js**: Handles the Performance Improvement Plan (PIP) state, dealing with fetching, updating, or managing PIP-related actions.
      - **profileSlice.js**: Manages the user profile state, allowing updates or fetching user profile details.
      - **userSlice.js**: Deals with general user-related state and actions.
    - **store.js**: This file sets up the Redux store, combining all slices and middleware. It initializes the global state and is imported into the root of the app to provide state management.
  - **routes/**: Defines the routes of the application using React Router v6.
    - **AppRoutes.jsx**: Contains the main routing logic for the app, setting up paths and rendering components.
    - **PrivateRoutes.jsx**: Handles routes that are only accessible to authenticated users.
    - **ProtectedRoutes.jsx**: Protects specific routes from being accessed without proper authorization.
    - **PublicRoutes.jsx**: Routes accessible to users without authentication, such as login or signup pages.
  
  - **services/**: Contains service files that handle business logic, such as API calls using Axios. The configuration of axios is defined in the config directory

    - **authService.js**: Contains functions for authentication-related API requests such as login, signup, and logout.
    - **feedbackRequestService.js**: Manages API requests related to submitting feedback requests.
    - **feedbackService.js**: Provides functions for handling feedback-related operations like fetching, submitting, and updating feedback.
    - **goalService.js**: Manages API requests related to user goals, such as creating, updating, and retrieving goals.
    - **pipService.js**: Handles API interactions for managing Performance Improvement Plans (PIP), including creating and updating plans.
    - **profileService.js**: Provides API functions for updating and fetching user profile information.
    - **taskService.js**: Manages task-related operations, including task creation, updates, and retrieval.
    - **userService.js**: Contains functions for managing user data, such as fetching user details, updating user information, and managing user-related actions.

  - **theme/**: Manages the global theme and styling for the application, likely using Material-UI.
  - **utils/**: Contains utility functions or helper methods that are used throughout the application.

- **App.css**: Main CSS file for the application-wide styles.
- **App.jsx**: The main component where the app structure and routing logic is defined.
- **index.css**: General CSS styles applied to the entire project.
- **main.jsx**: Entry point for rendering the React application into the DOM.
- **index.html**: HTML template served to the user.
- **package.json**: Configuration file listing the project dependencies and scripts.
- **vite.config.js**: Configuration file for the Vite build tool, which is used for fast development and bundling.


## Packages

The project uses the following main packages:

- **React**: A JavaScript library for building user interfaces. It allows developers to create large web applications that can update and render efficiently in response to data changes.
- **Redux**: A predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments, and are easy to test.
- **Axios**: A promise-based HTTP client for making requests to the backend API. It provides a simple and easy-to-use API for performing HTTP requests in a client-side application.
- **React Router**: A collection of navigational components for React applications. It enables dynamic routing in a web application, allowing users to navigate between different views or pages.
- **Material-UI**: A popular React UI framework for building responsive and accessible user interfaces. It provides a set of customizable components that follow Google's Material Design guidelines.



## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/feedback-sync-frontend.git
cd feedback-sync-frontend
npm install
```

## Usage

To start the development server, run:

```bash
npm start
```

This will launch the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

We welcome contributions to improve the project. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

