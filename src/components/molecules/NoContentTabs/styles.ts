import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CT;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 80%;
  
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
