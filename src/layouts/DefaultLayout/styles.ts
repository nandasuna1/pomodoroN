import { styled } from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5% auto;
  padding: 2.5%;

  background: linear-gradient(
    ${(props) => props.theme.secondary_light},
    ${(props) => props.theme.secondary_dark}
  );
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  @media only screen and (max-width: 650px) {
    width: 90%;
    height: 80vh;
    padding: 7%;
  }
`
