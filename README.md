# Goober

Live demo at https://goober-production.up.railway.app/

## Main Technologies

- Typescript
- Next.js
- Prisma
- Socket.io

## Challenges

The primary challenge for this project was to keep both Rider and Driver users updated in real-time or near real-time conditions. To address this, I utilized `Socket.io` and employed polling through the `@tanstack/react-query` library as a backup.

During the development process, I chose to use polling in specific parts of the code, such as searching for pending rides, and reserved socket implementation for active rides.

## Decisions and Project Scope

### Socket.io Implementation in Next.js APP API Routes

One of the main challenges in this project was implementing `Socket.io` on Next.js APP API routes. I successfully implemented it in the Next.js PAGES API directory, a hacky but needed solution for overcoming technical limitations from Next.js. 

### Integration of Ride Route Map

Adding a map with the ride route to the application was a considered decision, despite requiring more development time. The outcome justified the effort, as it significantly improved the app experience.

### Session Handling

The app includes a basic one-time session to enhance the user experience. It lacks any form of authentication or persistent sessions, as it falls outside the scope of this MVP.

### Code Reusability

To optimize development time, I intentionally mixed some components and logic from both the Rider and Driver apps. I applied this approach to features with the same or very similar logic to avoid redundant code.

### Deploy to Vercel

An encountered frustration was attempting to deploy to Vercel. It seems Vercel has a time limit on functions, causing inconsistent socket connections.

## UI

I extensively utilized [ui.shadcn.com](https://ui.shadcn.com/) for its accessible and visually appealing components. The goal was to maintain a clean UI design throughout the application.

## Environment Variables

Two essential environment variables are required for this project:

1. `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key with access to Maps JavaScript API, Directions API, Geocoding API, and Places API. Used for autocompleting locations, geolocation, visualizing Google maps, calculating route distance, and obtaining directions.

2. `DATABASE_URL`: Connection string for the database. The project has been tested only with PostgreSQL.

## Getting Started

To run the development server, execute the following command:

```bash
yarn && yarn dev
```

## Pictures


<img width="1509" alt="image" src="https://github.com/matpandino/goober/assets/16725679/a9bc573a-d9f9-46a9-959b-1df26738ebc8">

<img width="1510" alt="image" src="https://github.com/matpandino/goober/assets/16725679/11a93961-a9ed-4220-9644-ed53d7b3f962">

