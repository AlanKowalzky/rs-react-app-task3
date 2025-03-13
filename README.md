# Pokemon Dashboard - A React-based Pokemon Explorer with Theme Switching

A modern React application that provides an interactive dashboard for exploring Pokemon data with dynamic theme switching capabilities. Built with TypeScript and Redux Toolkit, it offers a responsive interface with real-time search, filtering, and detailed Pokemon information display.

This application integrates with the PokeAPI to fetch Pokemon data and provides features like pagination, search functionality, and theme customization. The dashboard supports both light and dark themes, making it comfortable to use in different lighting conditions. Users can select multiple Pokemon, view detailed information about each one, and navigate through the Pokemon list with an intuitive pagination system.

## Repository Structure
```
.
├── src/                          # Source code directory
│   ├── components/               # React components
│   │   ├── Dashboard/           # Main dashboard component
│   │   ├── Flyout/             # Flyout panel component
│   │   ├── PokemonDetailsPanel/ # Pokemon details display
│   │   ├── SearchBar/          # Search functionality
│   │   └── ThemeSwitcher/      # Theme switching component
│   ├── context/                 # React context definitions
│   ├── features/                # Redux features and slices
│   │   ├── apiData/            # API data management
│   │   ├── selectedItems/      # Selected items management
│   │   └── theme/              # Theme state management
│   ├── services/               # API service definitions
│   └── utils/                  # Utility functions
├── config files                # Configuration files (ts, babel, etc.)
└── package.json               # Project dependencies and scripts
```

## Usage Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Quick Start
1. Launch the application:
```bash
npm run dev
```

2. Use the dashboard features:
```typescript
// Search for Pokemon
const searchBar = document.querySelector('input[placeholder="Search Pokemon"]');
searchBar.value = 'pikachu';

// Toggle theme
const themeButton = document.querySelector('button');
themeButton.click(); // Switches between light and dark theme
```

### More Detailed Examples

1. Searching and Filtering Pokemon:
```typescript
// Using the SearchBar component
<SearchBar onSearch={(value) => {
  // Value will be automatically converted to lowercase
  console.log(`Searching for: ${value}`);
}} />
```

2. Theme Management:
```typescript
// Using the ThemeContext
const { theme, toggleTheme } = useTheme();
// theme will be either 'light' or 'dark'
```

### Troubleshooting

1. API Connection Issues
- Problem: Pokemon data not loading
- Solution: 
```bash
# Check network connection
curl https://pokeapi.co/api/v2/pokemon

# Enable debug logging
localStorage.setItem('debug', 'api:*');
```

2. Theme Not Persisting
- Problem: Theme resets on page refresh
- Solution: Check local storage permissions
```javascript
// Verify local storage access
console.log(localStorage.getItem('theme'));
```

## Data Flow
The application follows a unidirectional data flow pattern with Redux managing the global state.

```ascii
+-------------+     +-----------+     +----------------+
|   PokeAPI   | --> |  Redux    | --> |    React      |
|   Service   |     |  Store    |     |  Components   |
+-------------+     +-----------+     +----------------+
       ^                 |                    |
       |                 v                    v
+-------------+     +-----------+     +----------------+
|   Search    |     |  Theme    |     |    Pokemon    |
|   Actions   |     | Context   |     |    Details    |
+-------------+     +-----------+     +----------------+
```

Key Component Interactions:
1. API Service fetches Pokemon data from PokeAPI
2. Redux store manages Pokemon data and selected items
3. Theme context handles theme switching across components
4. SearchBar component triggers API queries
5. Dashboard component orchestrates data display
6. PokemonDetailsPanel displays selected Pokemon information
7. Theme switching propagates through ThemeContext