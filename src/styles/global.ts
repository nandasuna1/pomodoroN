import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --timer-background: ${(props) => props.theme.primary_dark};
        --timer-surface: ${(props) => props.theme.secondary_dark};
        --timer-accent: ${(props) => props.theme.secondary_light};
        --timer-highlight: ${(props) => props.theme.third_light};
        --timer-text: ${(props) => props.theme.text};
        --timer-mascot-filter: ${(props) => props.theme.mascotFilter};
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme.third_light};
    }

    body {
        background-color: ${(props) => props.theme.primary_dark};
        color: ${(props) => props.theme.text};
        min-width: 320px;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
    }

    button, input {
        color: inherit;
    }

    body, input, textarea, button {
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    button {
        font: inherit;
    }
`
