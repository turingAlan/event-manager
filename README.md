# Event Manager

## Overview
Event Manager is a web application built with Angular 18 that allows users to efficiently manage events. With a sleek and intuitive interface, users can easily add, edit, and delete events. The application is secured with email and password authentication to ensure data privacy and user-specific event management.

## Features
- User Authentication:
  - Secure login with email and password
  - Protected routes for authenticated users only
- Event Management:
  - Add new events with details such as title, description, date, time, and location
  - Edit existing events
  - Delete events
  - View a list of all events
  - Detailed view of individual events
- Responsive Design:
  - Fully responsive interface that works on desktop, tablet, and mobile devices
- Data Persistence:
  - Events are saved and retrieved from a backend service

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (v18.x)

## Installation and Setup
Follow these steps to get your development environment set up:

1. Clone the repository
   ```
   git clone https://github.com/turingAlan/event-manager.git
   ```

2. Navigate to the project directory
   ```
   cd event-manager
   ```

3. Install dependencies
   ```
   npm install
   ```
3. Run Json server to run mock backend
   ```
   npm i -g json-server && json-server --watch db.json
   ```

4. Start the development server
   ```
   ng serve
   ```

5. Open your browser and visit `http://localhost:4200`

## Folder Structure
```
event-manager/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── loader.component.ts
│   │   ├── pages/
│   │   │   ├── event-detail/
│   │   │   ├── event-form/
│   │   │   ├── event-list/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── page-not-found/
│   │   │   └── register/
│   │   ├── services/
│   │   │   ├── authenticate.service.ts
│   │   │   └── event.service.ts
│   │   ├── models/
│   │   │   ├── event.model.ts
│   │   │   └── user.model.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   └── styles.scss
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Built With
- [Angular 18](https://angular.io/) - The web framework used
- [Angular Material](https://material.angular.io/) - UI component library
- [RxJS](https://rxjs.dev/) - Reactive Extensions Library for JavaScript
- [Tailwind](https://tailwindcss.com/) - A utility-first CSS framework


## Authors
- **Sarthak Jain** - [turingAlan](https://github.com/turingAlan)

