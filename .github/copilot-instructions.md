# Copilot Instructions - Ahoy, Matey! 🏴‍☠️

Arrr! Welcome aboard this here React vessel, powered by the winds o' Vite and the TypeScript seas!

## Repository Overview

This be a modern React application, built with the finest tools from the seven seas:
- **Type o' Ship**: Vite + React 19 + TypeScript
- **Navigation**: TanStack Router for chartin' our course
- **State Management**: TanStack Query fer fetchin' treasures from distant lands
- **Testing**: Vitest with React Testing Library fer findin' bugs before they sink the ship
- **Code Quality**: ESLint fer keepin' the code shipshape

## Commands fer Sailin' This Vessel

### Development Mode
```bash
npm run dev
```
This starts the development server, matey! Yer ship will be sailin' at `http://localhost:5173` (or whatever port Vite be choosin').

### Building the Ship
```bash
npm run build
```
First compiles TypeScript (`tsc -b`), then builds with Vite. Always run this before pushin' to production waters!

### Linting the Deck
```bash
npm run lint
```
Checks fer code issues without fixin' 'em. Run this to see what needs cleanin'!

```bash
npm run lint:fix
```
Automatically fixes lint issues. Use this to make yer code squeaky clean!

### Type Checking
TypeScript types are checked during the build process with `tsc -b`. If ye want to check types separately:
```bash
npx tsc --noEmit
```

### Testing the Waters
```bash
npm test
```
Runs tests in watch mode - they'll re-run when ye change files.

```bash
npm run test:run
```
Runs all tests once, then exits. Use this fer CI/CD or when ye just want a quick check.

```bash
npm run test:ui
```
Opens a fancy UI fer navigatin' through yer tests. Quite handy fer debuggin'!

### Preview the Build
```bash
npm run preview
```
Serves the production build locally so ye can test it before launchin' into the wild seas.

## Project Structure

```
src/              - All yer React components and application code
  routes/         - TanStack Router route definitions
index.html        - The main HTML file, the ship's hull
vite.config.ts    - Vite configuration
vitest.config.ts  - Test configuration
tsconfig.*.json   - TypeScript configurations fer different parts o' the ship
eslint.config.js  - ESLint rules fer keepin' code clean
```

## Development Workflow - The Pirate's Code

1. **Before startin' work**: Always run `npm install` to ensure all dependencies be aboard
2. **While developin'**: Use `npm run dev` to see yer changes in real-time
3. **Before committin'**: 
   - Run `npm run lint:fix` to clean up the code
   - Run `npm run test:run` to ensure all tests be passin'
   - Run `npm run build` to verify the production build works
4. **TypeScript**: This ship runs on TypeScript! Always add proper types to yer code
5. **Testing**: Write tests fer new features using Vitest and React Testing Library

## Key Dependencies

- **React 19**: The latest version, with all the newest treasures
- **Vite**: Fast as the wind fer development and building
- **TanStack Router**: Type-safe routing with file-based conventions
- **TanStack Query**: Data fetchin' and caching made easy
- **Vitest**: Lightning-fast testing framework
- **ESLint**: Code quality enforcer

## Notes fer the Crew

- This project uses ES modules (`"type": "module"` in package.json)
- React Compiler plugin be enabled fer optimizin' the code
- The router devtools and query devtools be available in development mode
- MSW (Mock Service Worker) be available fer mockin' API requests in tests

## Troubleshooting

If ye run into rough seas:
1. Try cleanin' up with `rm -rf node_modules package-lock.json` then `npm install`
2. Make sure ye be runnin' Node.js version 18 or higher
3. Check that all TypeScript types be properly defined
4. Verify ESLint config be compatible with the code

Now set sail and write some code, ye scurvy dog! 🏴‍☠️⚓️
