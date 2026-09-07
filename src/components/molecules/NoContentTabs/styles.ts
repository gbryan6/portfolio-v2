import styled from 'styled-components';
import { media } from '@/styles/breakpoints';

export const Container = styled.div`
  grid-area: CT;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 80%;

  ${media.tablet} {
    height: auto;
    padding: 4rem 2.4rem;
    text-align: center;
  }

  .no-content_top{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .no-content_bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 400;

    row-gap: 0.6rem;
  }
`;
