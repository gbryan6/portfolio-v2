'use client'

import { Theme } from '@/app/types/styled';
import styled from 'styled-components';

interface ITextProps {
  tag: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  font: keyof Theme['typograph'];
  color: keyof Theme['colors'];
  className?: string
}

function Text ({ tag, font='head', color='fontPrimary', children, ...rest }: ITextProps){
  const Component = styled(tag)`
    font-size: ${({ theme }) => theme.typograph[font]};
    color: ${({ theme }) => theme.colors[color]};
  `;

  return <Component {...rest}>{children}</Component>;
};

export default Text;