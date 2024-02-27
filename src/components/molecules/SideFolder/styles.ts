import styled, { keyframes } from 'styled-components'

interface ISideFolderStyles {
  color: string
  isOpen: boolean
}

const fadeIn = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {

    margin-top: 0.2rem;
    padding-left: 1.4rem;
    padding-top: 0.8rem;
    margin-left: 2.8rem;

    max-height: 500px;
    opacity: 1;
  }
`

export const Container = styled.div<ISideFolderStyles>`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-bottom: 0.8rem;

  .side-folder_head {
    display: flex;
    align-items: center;

    cursor: pointer;

    width: 100%;

    > svg {
      color: ${({ theme, color }) =>
        color ? color : theme.colors.fontPrimary };
      width: 1.6rem;
      height: 1.6rem;

      margin-right: 0.8rem;
      margin-left: 0.7rem;
    }
  }

  .side-folder_content {
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 0;
    margin: 0;
    max-height: 0;
    opacity: 0;

    border-left: 1px solid ${({ theme, isOpen }) =>
        isOpen ? theme.colors.line : 'transparent'};

    overflow: hidden;
    animation-duration: 0.15s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-name: ${({ isOpen }) => (isOpen && fadeIn)};

    .file-folder {
      margin-bottom: 0.8rem;
    }
  }
`
