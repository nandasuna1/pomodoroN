import 'styled-components'
import { defaultTheme, lightTheme } from '../styles/theme/default'

type ThemeType = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
