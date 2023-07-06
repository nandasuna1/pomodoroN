import { styled } from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background: linear-gradient(
    ${(props) => props.theme.secondary_light},
    ${(props) => props.theme.secondary_dark}
  );
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
