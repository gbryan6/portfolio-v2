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
