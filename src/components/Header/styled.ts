import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme.primary_light};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme.primary_dark};
      }

      &.active {
        color: ${(props) => props.theme.third_light};
      }
    }
  }

  button {
    height: 30px;
    width: fit-content;
    padding: 0 2%;

    border: none;
    border-radius: 10px;

    background-color: ${(props) => props.theme.primary_dark};
    font-weight: bolder;

    cursor: pointer;

    color: ${(props) => props.theme.white};

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`
