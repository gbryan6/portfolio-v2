import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  row-gap: 1.2rem;
  text-align: center;
  padding: 2.4rem;

  /* Button aligns itself to flex-start by default; centre it in this column. */
  .empty-state_action {
    align-self: center;
    margin-top: 0.8rem;
  }
`
