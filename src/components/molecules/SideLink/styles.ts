import styled from 'styled-components'

export const Container = styled.a`
  display: flex;
  align-items: center;

  width: 100%;
  text-decoration: none;

  cursor: pointer;
  overflow: hidden;

  /* 8px between stacked links; no effect on a lone one (e.g. "contatos"). */
  & + & {
    margin-top: 0.8rem;
  }

  .side-link_icon {
    flex-shrink: 0;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.8rem;
    color: ${({ theme }) => theme.colors.fontPrimary};
    transition: color var(--motion-fast) ease;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color var(--motion-fast) ease;
  }

  .side-link_out {
    flex-shrink: 0;
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.8rem;
    opacity: 0;
    color: ${({ theme }) => theme.colors.accent};
    transition: opacity var(--motion-fast) ease;
  }

  &:hover {
    span,
    .side-link_icon {
      color: ${({ theme }) => theme.colors.activeTitle};
    }

    .side-link_out {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: 0.2rem;

    .side-link_out {
      opacity: 1;
    }
  }
`
