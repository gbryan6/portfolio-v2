import styled from 'styled-components'

// SN = SIDE NAV
// CT = CONTENT
// TB = TABS

export const Container = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-columns: 31.1rem 1fr;
  grid-template-areas:
    'SN TB'
    'SN CT';
  width: 100%;
  height: 100%;
`

export const SideNav = styled.aside`
  grid-area: SN;
  display: flex;

  height: 100%;
  width: 100%;

  border-right: 1px solid ${({ theme }) => theme.colors.line};

  .side-nav_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2.4rem;
    width: 6.8rem;
    height: 100%;
    border-right: 1px solid ${({ theme }) => theme.colors.line};
    padding: 2rem 0;

    svg {
      width: 2.4rem;
      height: 2rem;
      color: ${({ theme }) => theme.colors.fontPrimary};
    }
  }

  .side-nav_right {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`
