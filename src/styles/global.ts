import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
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
        color: ${(props) => props.theme.white};

        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }


    @media only screen and (max-width: 500px) {
    body {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-items: center;
        align-items: center;
    }
}
`
