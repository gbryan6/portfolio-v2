import styled from 'styled-components'

interface ISideFolderStyleProps {
  $color: string
}

export const Container = styled.div<ISideFolderStyleProps>`
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
      color: ${({ theme, $color }) => $color || theme.colors.fontPrimary};
      width: 1.6rem;
      height: 1.6rem;

      margin-right: 0.8rem;
      margin-left: 0.7rem;
    }
  }

  .side-folder_content {
    width: 100%;
  }

  .side-folder_content_inner {
    display: flex;
    flex-direction: column;

    margin-top: 0.2rem;
    margin-left: 2.8rem;
    padding-left: 1.4rem;
    padding-top: 0.8rem;

    border-left: 1px solid ${({ theme }) => theme.colors.line};

    .file-folder {
      margin-bottom: 0.8rem;
    }
  }
`
