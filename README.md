# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Search for weather information by entering a location or using voice input
- Receive real-time weather alerts for extreme conditions
- Get smart recommendations for clothing and outdoor activities
- View optimal outdoor time windows with weather scoring
- Compare weather across up to 3 locations simultaneously
- Save favorite locations with audio feedback
- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details

### Screenshot

![Weather Now Homepage](./application-screenshot.png)

### Links

- Solution URL: [Frontend Mentor]()
- Live Site URL: [Weather Now](https://weather-app-pearl-seven-35.vercel.app/)

## My process

### Built with

**Core Technologies**

- Semantic HTML5 markup
- Tailwind CSS 4.0 - Utility-first CSS framework
- Mobile-first workflow
- React 18 - JavaScript library
- Vite - Fast build tool and development server

**State & Data Management**

- Zustand - Minimal state management library
- Open-Meteo API - Weather data source
- Geolocation API - Location detection
- Web Speech API - Voice search capability

**UX Enhancement**

- Framer Motion - Animation library for smooth transitions
- use-sound - Audio feedback on interactions
- Sonner - Toast notifications
- @tabler/icons-react - Comprehensive icon library

**Progressive Web App**

- Service Workers - Offline capability
- Web App Manifest - Installability
- Cache API - Performance optimization

### Advanced Features and State Management

This solution goes beyond basic weather display to provide actionable insights and a premium user experience.

**Smart Weather Intelligence**

- **Real-time Alerts System**: Automatic warnings for extreme heat (>35°C/95°F), freezing temperatures, heavy rain (>5mm), strong winds (>40km/h), high UV index (>7), and poor visibility (<1km). All thresholds adapt to your selected unit system.

- **Intelligent Recommendations Engine**: Context-aware suggestions including clothing advice based on temperature ranges, umbrella reminders when precipitation probability exceeds 30%, sunscreen alerts for UV index above 5, hydration reminders in hot/humid conditions, and activity suitability scoring.

- **Best Time Outside Widget**: A dedicated insights page featuring a custom weather scoring algorithm that analyzes temperature deviation from ideal range (18-24°C/64-75°F), precipitation impact, wind conditions, and sky clarity. Presents an interactive 12-hour timeline with color-coded quality indicators and keyboard-accessible bar chart showing optimal outdoor windows.

- **Location Comparison**: Compare up to 3 locations side-by-side with individual weather scores, sortable by temperature or overall weather quality, exportable data as JSON, and shareable via native Web Share API or clipboard fallback.

**Technical Architecture**

- **Global State Management (Zustand)**: Single source of truth for weather data, location information, user preferences, and favorites. Prevents prop-drilling and ensures synchronization across all components. State persists to localStorage with automatic unit conversion handling.

- **Favorites System**: Save frequently checked locations with isSaved logic, audio feedback via use-sound on save/remove actions, and toast notifications confirming actions.

- **Voice Search Integration**: Hands-free location search using Web Speech API with visual feedback during listening and automatic form submission on voice input completion.

- **Professional Loading States**: Skeleton loaders displayed during data fetching and on initial load when no location selected, providing continuous professional experience throughout the app lifecycle.

- **Scroll-triggered Animations**: Hourly forecast cards use Framer Motion's useInView hook to animate only when entering viewport, improving perceived performance and reducing unnecessary renders.

- **Progressive Web App**: Installable on mobile and desktop with offline access, optimized caching strategy, and fast repeat visits.

- **Accessibility First**: Full keyboard navigation (Tab, Enter, Space, Arrow keys), comprehensive ARIA labels announcing weather conditions and scores, focus management with visible indicators, and semantic HTML structure throughout.

### What I learned

This project significantly expanded my technical capabilities across multiple domains:

**State Management Mastery**
I implemented complex state logic with Zustand including automatic unit conversion across the entire application, localStorage persistence with state rehydration, optimistic UI updates for immediate feedback, and state synchronization across multiple components without prop drilling. The challenge of managing favorites, comparison locations, and weather data in a single store taught me effective state normalization strategies.

**Custom Algorithm Development**
Creating the weather scoring system required translating subjective weather quality into objective metrics. The algorithm considers temperature deviation from ideal range (18-24°C) with 3-point penalties per degree, precipitation impact with 20-point penalties per mm, wind speed thresholds, and weather condition bonuses for clear skies. This taught me how to balance multiple factors to create meaningful scores that genuinely help users plan their day.

**Advanced Accessibility Implementation**
Building truly accessible components from scratch taught me practical WCAG compliance. I implemented keyboard navigation patterns (Arrow keys for timeline bar navigation), ARIA labels that announce complete context ("10 AM, 22 degrees, score 85 out of 100, Excellent conditions"), focus management strategies to guide user attention, and semantic HTML with proper button elements instead of clickable divs. Testing with screen readers revealed the importance of aria-pressed states and descriptive labels.

**Framer Motion Animation Orchestration**
I learned to create sophisticated animation sequences including staggered list animations with useInView for performance, exit animations that slide elements out smoothly rather than collapsing height, layout animations for smooth reordering during sorting, and gesture animations with whileHover and whileTap for tactile feedback. The key insight was balancing visual appeal with performance by animating transforms instead of layout properties.

**API Integration Patterns**
Working with Open-Meteo API taught me robust data fetching strategies including error boundary implementation for graceful failures, loading state management with skeleton loaders, retry logic for failed requests, and timezone handling for accurate local time display. Integrating Geolocation and Web Speech APIs expanded my understanding of browser permission handling and user privacy considerations.

**Responsive Design Patterns**
Implementing mobile-first design revealed the importance of touch targets (minimum 44px), preventing hover tooltips on touch devices (using click/tap instead), breakpoint strategies for 3-column comparison grid collapsing to 1 column, and font size scaling for readability across devices.

I am really proud of the Zustand store I built for this project. Here is an excerpt of the store implementation:

```js
const useWeatherStore = create()(
  persist(
    (set, get) => ({
      weatherData: null,
      isFetching: false,
      isAddingLocation: false,
      isError: false,
      location: null,
      currentLocation: null,
      favoriteLocations: [],
      compareLocations: [],
      units: {
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
      },
      setUnits: (newUnits) => set({ units: newUnits, weatherData: null }),

      fetchWeather: async () => {
        const state = get();
        if (!state.location) {
          return;
        }

        set({ isFetching: true, isError: false });
        try {
          const params = {
            latitude: state.location.latitude,
            longitude: state.location.longitude,
            daily:
              "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
            hourly:
              "weather_code,temperature_2m,precipitation,apparent_temperature",
            current:
              "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,cloud_cover,is_day",
            timezone: state.location.timezone,
            ...state.units,
          };

          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast`,
            { params }
          );
          set({
            weatherData: response.data,
            isFetching: false,
            isError: false,
          });
        } catch (error) {
          set({ isFetching: false, isError: true });
          notifyError(
            error.response?.data?.message ||
              error.message ||
              "Failed to fetch weather data. Please try again."
          );
        }
      },
      // ... rest of implementation
    }
  ),
  {
    name: "weather-storage",
    storage: createJSONStorage(() => localStorage),
  }
);

export default useWeatherStore;
```

Also the scoring algorithm I built for the "Best Time Outside" feature was quite challenging but rewarding to implement. Here is an excerpt of that logic:

```js
const scoredHours = todayHours.map((h) => {
  let score = 100;
  // Temps in ideal range (18-24°C or 64.4-75.2°F)
  const IDEAL_TEMP_1 = isMetric ? 18 : 64.4;
  const IDEAL_TEMP_2 = isMetric ? 24 : 75.2;
  const IDEAL_TEMP_MID = isMetric ? 21 : 70;

  // Ideal Temperature (18-24°C), 3 points penalty for every degree outside the  ideal midpoint
  if (h.temp < IDEAL_TEMP_1 || h.temp > IDEAL_TEMP_2) {
    score -= Math.abs(h.temp - IDEAL_TEMP_MID) * 3;
  }

  // Precipitation(rainfall), 20 points penalty for every unit
  score -= h.precipitation * 20;

  // Clear sky bonus, 10 points bonus
  if (h.weatherCode === 0 || h.weatherCode === 1) {
    score += 10;
  }

  return { ...h, score: Math.max(0, score) };
});
```

### Continued development

**Immediate Next Steps**

- Weather history tracking showing 7-day temperature trends and pattern recognition
- Activity-specific recommendations (running, hiking, photography) based on weather suitability
- Customizable alert thresholds allowing users to set personal comfort ranges
- Weather radar visualization with precipitation overlay

**Technical Improvements**

- Unit testing with Vitest covering critical business logic (scoring algorithm, unit conversions)
- E2E testing with Playwright simulating complete user journeys
- Performance monitoring with Web Vitals tracking Core Web Vitals metrics
- Enhanced error boundaries with error reporting and recovery suggestions
- Service Worker optimization for smarter caching strategies

**Learning Goals**
While I successfully implemented global state management using Zustand, I want to explore more complex state management patterns in larger applications to understand tradeoffs between different approaches.

I plan to enhance my skills in writing comprehensive test suites to ensure robustness and reliability. I aim to deepen my understanding of web accessibility standards beyond WCAG 2.1 AA compliance, exploring ARIA patterns for complex widgets.

Additionally, I want to study advanced performance optimization techniques including code splitting strategies, bundle size analysis, and rendering optimization beyond memoization.

### Useful resources

- [Zustand Documentation](https://zustand-demo.pmnd.rs/) - Highly effective state management documentation for learning concise store patterns.

- [Framer Motion Docs](https://www.framer.com/docs/) - Indispensable guide for implementing complex animation orchestration, particularly the useInView hook for scroll effects.

- [use-sound](https://www.npmjs.com/package/use-sound) - Node package to integrate sounds into React applications, enhancing user interaction feedback.

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Essential reference for accessibility compliance. The keyboard navigation and ARIA patterns sections guided the implementation of accessible components.

- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/) - Comprehensive Progressive Web App implementation guide. The caching strategies and service worker patterns were particularly helpful.

## Author

- Frontend Mentor - [@Fejiro001](https://www.frontendmentor.io/profile/Fejiro001)
- Twitter - [@aberefejiro](https://www.twitter.com/aberefejiro)
- GitHub - [@Fejiro001](https://www.github.com/Fejiro001)

## Acknowledgments

- [Josh Comeau](https://www.joshwcomeau.com/) - For inspiring the integration of sound effects into this project through his website's delightful audio feedback and his insightful [use-sound](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/) demonstrating how sound enhances user experience.
- [Frontend Mentor](https://www.frontendmentor.io/) - For providing professionally designed challenges that push beyond basic tutorials into real-world application development.
- [Open-Meteo](https://open-meteo.com/) - For offering a free, high-quality weather API without requiring authentication, making weather data accessible to developers worldwide.
