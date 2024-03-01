import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-left: 31rem;

  font-weight: normal;
  .writer {
    display: flex;
    flex-direction: column;
    
    .writer-top {
      display: flex;
      flex-direction: column;
      margin-bottom: 4.2rem;
    }

    .writer-bottom{
      display: flex;
      flex-direction: column;
      row-gap: 0.8rem;
    }
  }

  .snippet {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }

  .snippet-break-column {
    padding-left: 2rem;
  }

  .snippet-purple {
    color: #4d5bce;
  }

  .snippet-green {
    color: #43d9ad;
  }

  .snippet-orange {
    color: #e99287;
  }

  .snippet-red {
    color: #f16b6b;
  }

  .snippet-download {
    color: white;
  }
`
