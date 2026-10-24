import { coffeeLight, darkPurpleBlue } from '../theme'

export const defaultTheme = {
  white: '#fff',

  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  'gray-500': '#7C7C8A',
  'gray-600': '#323238',
  'gray-700': '#29292E',
  'gray-800': '#202024',
  'gray-900': '#121214',

  'green-300': '#00B37E',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-500': '#AB222E',
  'red-700': '#7A1921',

  'yellow-500': '#FBA94C',
}

export const darkTheme = {
  white: '#F4F1FF',
  black: '#000',

  primary_dark: darkPurpleBlue.background,
  secondary_dark: darkPurpleBlue.surface,

  primary_light: darkPurpleBlue.text,
  secondary_light: '#5947B2',

  primary_negative: '#E23434',
  secondary_negative: '#911F1F',

  third_light: '#F3A712',

  dark: darkPurpleBlue.background,
  text: darkPurpleBlue.text,
  mascotFilter: darkPurpleBlue.mascotFilter,

  yellow: '#FFD166',
  green: '#06D6A0',
  red: '#EF476F',
}

export const lightTheme = {
  white: '#FFF9F1',
  black: '#000',

  primary_dark: coffeeLight.background,
  secondary_dark: coffeeLight.surface,

  primary_light: coffeeLight.text,
  secondary_light: '#7b4b24',

  primary_negative: '#E23434',
  secondary_negative: '#911F1F',

  third_light: '#496232',

  dark: coffeeLight.text,
  text: coffeeLight.text,
  mascotFilter: coffeeLight.mascotFilter,

  yellow: '#FFD166',
  green: '#06D6A0',
  red: '#EF476F',
}
