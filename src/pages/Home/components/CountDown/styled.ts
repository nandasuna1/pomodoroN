import { styled } from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme.primary_light};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme.primary_dark};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media only screen and (max-width: 650px) {
    width: 100%;
    font-size: 10vw;
    line-height: 5vw;
  }
`
export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme.primary_dark};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 650px) {
    width: 5vw;
  }
`
