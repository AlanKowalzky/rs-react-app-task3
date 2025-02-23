# React Pokemon Dashboard with Theme Switching

This project is a React-based dashboard application that displays Pokemon data with theme switching capabilities.

The application fetches Pokemon data from the PokeAPI and presents it in a user-friendly interface. It features a dashboard that lists Pokemon, allows for item selection, and includes a theme switcher for toggling between light and dark modes. The project is built using modern web technologies including React, Redux Toolkit, and TypeScript, providing a robust and scalable foundation for further development.

Key features of this application include:
- Pokemon data fetching and display
- Item selection functionality
- Theme switching between light and dark modes
- Responsive design for various screen sizes
- Integration with PokeAPI for real-time data
- State management using Redux Toolkit
- Type-safe development with TypeScript

## Repository Structure

The repository is organized as follows:

- `src/`: Contains the main source code for the application
  - `components/`: React components including Dashboard, Flyout, and ThemeSwitcher
  - `context/`: Context providers, including ThemeContext
  - `features/`: Redux slices and actions for managing application state
  - `services/`: API service definitions
  - `store/`: Redux store configuration
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions
- `cypress/`: Cypress integration tests
- `public/`: Public assets
- Configuration files: Various configuration files for TypeScript, ESLint, and Vite

Key Files:
- `src/main.tsx`: Entry point of the application
- `src/App.tsx`: Main application component
- `src/store/store.ts`: Redux store configuration
- `vite.config.ts`: Vite build tool configuration

## Usage Instructions

### Installation

Prerequisites:
- Node.js (version 14 or later)
- npm (version 6 or later)

To install the project dependencies, run the following command in the project root directory:

```bash
npm install
```

### Getting Started

To start the development server, use the following command:

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`.

### Building for Production

To create a production build, use:

```bash
npm run build
```

This will generate optimized production files in the `dist/` directory.

### Running Tests

To run the Cypress integration tests:

```bash
npm run test
```

### Linting

To run the ESLint linter:

```bash
npm run lint
```

### Configuration

The application uses environment variables for configuration. Create a `.env` file in the project root with the following variables:

```
VITE_API_BASE_URL=https://pokeapi.co/api/v2/
```

### Common Use Cases

1. Fetching Pokemon Data:
   The application automatically fetches Pokemon data when the Dashboard component mounts. You can modify the fetch parameters in `src/components/Dashboard/Dashboard.tsx`.

2. Switching Themes:
   Use the ThemeSwitcher component to toggle between light and dark themes. The theme state is managed by the ThemeContext.

3. Selecting Items:
   Click on Pokemon items in the Dashboard to select them. Selected items will be displayed in the Flyout component.

### Troubleshooting

1. API Data Not Loading
   - Check your internet connection
   - Verify that the PokeAPI endpoint is correct in `src/services/apiSlice.ts`
   - Look for any console errors related to CORS issues

2. Theme Not Switching
   - Ensure that the theme CSS files are correctly imported in `src/components/ThemeSwitcher/ThemeSwitcher.tsx`
   - Check if the ThemeContext is properly set up and provided to the app

3. Redux State Issues
   - Use Redux DevTools to inspect the state and action dispatches
   - Verify that the store is correctly configured in `src/store/store.ts`

For debugging, you can enable more verbose logging by setting `NODE_ENV=development` in your environment.

## Data Flow

The application's data flow follows these steps:

1. The user interacts with the Dashboard component
2. The Dashboard component dispatches actions to fetch data using the apiSlice
3. The apiSlice makes HTTP requests to the PokeAPI
4. Received data is stored in the Redux store
5. The store updates trigger re-renders of connected components
6. User interactions (like selecting items) dispatch actions to update the store
7. The updated store state is reflected in the UI (e.g., selected items shown in the Flyout)

```
[User] <-> [Dashboard] <-> [Redux Store] <-> [API Slice] <-> [PokeAPI]
                ^                ^
                |                |
                v                v
           [ThemeSwitcher]   [Flyout]
```

Note: The ThemeContext operates independently of this data flow, managing theme state separately from the Redux store.# rs-react-app-task3
