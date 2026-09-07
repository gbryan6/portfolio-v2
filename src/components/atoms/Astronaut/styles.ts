import styled from 'styled-components'

export const Wrapper = styled.div`
  /*
   * Colour roles for the pixel grid, from the theme. The pink/cyan pair is a
   * chromatic-aberration rim — warm on one edge, cool on the other — which is
   * what gives the mascot its vaporwave read.
   */
  --astro-suit: ${({ theme }) => theme.colors.fontSecondary};
  --astro-visor: ${({ theme }) => theme.colors.visorGlass};
  --astro-glow: ${({ theme }) => theme.colors.highlight};
  --astro-pink: ${({ theme }) => theme.colors.neonPink};
  --astro-cyan: ${({ theme }) => theme.colors.neonCyan};
  --astro-shade: ${({ theme }) => theme.colors.fontPrimary};

  display: flex;
  flex-shrink: 0;

  svg {
    width: 4.4rem;
    height: 4.95rem;
    display: block;
  }
`
