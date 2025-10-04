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

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/solutions/weather-app-using-react-and-tailwind-css-3-0-8f8e1c5e1e)
- Live Site URL: [Weather Now](https://weather-app-pearl-seven-35.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS - Utility-first CSS framework (for styling)
- Mobile-first workflow
- React - JavaScript library
- Zustand - Minimal state management library (for weather data, favorites, and unit toggling)
- Framer Motion - Animation library (for smooth transitions and animations)
- use-sound - For audio feedback on interactions (for button clicks and other interactions)
- Sonner - For aesthetically pleasing toast notifications
- Lucide React and Tabler Icons - for weather and UI icons
- Vite - For bundling and development server
- PWA - To enable offline capabilities and improve performance

### Advanced Features and State Management
This solution focuses heavily on providing a seamless, feature-rich user experience, utilizing a single source of truth for all weather data and application settings.

- **Global State Management (Zustand)**: All weather data, location information, and user favorites are managed globally. This prevents prop-drilling and ensures components like the main weather info and the favorites list are always synchronized.

- **Favorites Functionality**: Users can save and remove favorite locations. State logic handles checking if the current location is already saved (isSaved) and triggers a sound and a toast notification upon success/removal.

- **Compare Locations Functionality**: Users can seamlessly compare up tot 3 locations, viewing key metrics of compare locations. With the ability to compare their current location.

- **Skeleton Loading States**: Sophisticated conditional rendering logic ensures that skeleton loaders are displayed not just when data is fetching (isFetching), but also on initial app load when no location has been selected (!isDataAvailable), providing a continuous and professional user experience.

- **In-View List Animations**: Hourly forecast cards utilize a combination of Framer Motion's list variants and useInView to animate individual list items only as they scroll into the viewport, improving perceived performance and user delight.

- **PWA**: The app is configured as a Progressive Web App, allowing for offline access and improved performance on repeat visits.

- **Audio Feedback**: The use-sound library is integrated to provide audio feedback for user interactions, enhancing the overall user experience.

- **Voice Search**: Users can search for locations using voice input, enhancing accessibility and user convenience.

### What I learned

This project was a great opportunity to practice and enhance my skills in several areas:

- **State Management with Zustand**: I learned how to effectively use Zustand for global state management in a React application. This included setting up stores, managing state updates, and ensuring components re-render correctly based on state changes.

- **Animations with Framer Motion**: I gained experience in implementing animations using Framer Motion. I explored various animation techniques to create a more engaging user experience.

- **Responsive Design**: I improved my skills in creating responsive layouts that adapt seamlessly to different screen sizes, ensuring a consistent user experience across devices.

- **API Integration**: I enhanced my ability to work with third-party APIs to fetch and display dynamic weather data, handling asynchronous operations, managing loading states effectively, and integrating geolocation and web speech capabilities.

- **Audio Feedback**: I integrated sound effects into the application using the use-sound library, adding an extra layer of interactivity and feedback for users.

Here's a sample of a code snippet I am proud of:

```js

```

### Continued development

There are several areas I want to continue developing my skills in:

- **State Management**: While I successfully implemented global state management using Zustand, I want to explore more complex state management patterns and libraries like Redux or MobX to see how they compare in larger applications.

- **Performance Optimization**: I want to delve deeper into more performance optimization techniques, especially for React applications, apart from lazy loading, and memoization strategies, which are already being implemented.

- **Testing**: I plan to enhance my skills in writing unit and integration tests for React components using libraries like Jest (Vitest) and React Testing Library to ensure robustness and reliability of my applications.

- **Accessibility**: I aim to improve my understanding of web accessibility standards and best practices to ensure that my applications are usable by all users, including those with disabilities.

### Useful resources

- [Zustand Documentation](https://zustand-demo.pmnd.rs/) - Highly effective state management documentation for learning concise store patterns.

- [Framer Motion Docs](https://www.framer.com/docs/) - Indispensable guide for implementing complex animation orchestration, particularly the useInView hook for scroll effects.

- [use-sound](https://www.npmjs.com/package/use-sound) - Node package to integrate sounds into React applications, enhancing user interaction feedback.


## Author

- Website - [Abere Oghenefejiro](https://www.your-site.com)
- Frontend Mentor - [@Fejiro001](https://www.frontendmentor.io/profile/Fejiro001)
- Twitter - [@aberefejiro](https://www.twitter.com/aberefejiro)

## Acknowledgments

- [Josh Comeau](https://www.joshwcomeau.com/) - for the inspiration to integrate sound effects into this project after checking out his website and reading his [use-sound](https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/) blog post.
