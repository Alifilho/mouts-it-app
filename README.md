# Mouts IT App

## Table of Contents

1. [Installation](#installation)  
2. [Environment Variables](#environment-variables)
3. [Running the App](#usage)  
4. [API Reference](#api-reference)
5. [Default Credentials](#default-credentials)
6. [Commits](#commits)
7. [Contact/Support](#contact--support)  

## Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/Alifilho/mouts-it-app && cd mouts-it-app
   ```  
2. Install dependencies  
   ```bash
   npm install
   ```

By default, the app is listening an api in port `3001`. You can change this via an environment variable in api project.

## Environment Variables

- `SESSION_SECRET` — iron session secret key  
- `COOKIE_NAME` — cookie name
- `BASE_URL` — base url for backend mouts-it api

Create a `.env` in the project root and define:

```bash
  cp .example.env .env
```

## Running the App

Start the app in development mode:

```bash
npm run dev
```

## API Reference

The complete API reference is automatically generated with Swagger and available at `http://localhost:3001/docs` (in API project). Use this interactive UI to explore endpoints, view request/response schemas, and try out calls directly.

## Default Credentials
In API by default, the user is:  
- **Email:** admin@mouts.com  
- **Password:** 12345

## Commits

This repository follows the [Conventional Commits](https://www.conventionalcommits.org/) specification to maintain a clear, structured commit history.

## Contact / Support

For questions, bug reports, or help, please reach out to the maintainer at alissonoliveiram@gmail.com.
