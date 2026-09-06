import styled from 'styled-components'

export const Wrapper = styled.div`
  /* Colour roles for the pixel grid, from the theme. */
  --astro-suit: ${({ theme }) => theme.colors.fontSecondary};
  --astro-visor: ${({ theme }) => theme.colors.accent};
  --astro-line: ${({ theme }) => theme.colors.line};
  --astro-shade: ${({ theme }) => theme.colors.fontPrimary};

  display: flex;
  flex-shrink: 0;

  svg {
    width: 4.4rem;
    height: 4.95rem;
    display: block;
  }
`
