import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  background-color: red;

  width: 51rem;
  height: 47rem;

  border: 1px solid ${({ theme }) => theme.colors.background};
  border-radius: 0.8rem;

  background: linear-gradient(180deg, #237b6d, rgba(67, 217, 173, 0.13));

  box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, 0.3);

  backdrop-filter: blur(64px);

  .bottom {
    width: 2rem !important;
    height: 2rem !important;
  }

  .bottom-up-left {
    position: absolute !important;
    left: 1.1rem !important;
    top: 1.1rem !important;
    right: unset !important;
    bottom: unset !important;
  }

  .bottom-up-right {
    position: absolute !important;
    right: 1.1rem !important;
    top: 1.1rem !important;
    left: unset !important;
    bottom: unset !important ;
  }

  .bottom-down-left {
    position: absolute !important;
    right: unset !important;
    top: unset !important;
    left: 1.1rem !important;
    bottom: 1.1rem !important;
  }

  .bottom-down-right {
    position: absolute !important;
    left: unset !important;
    top: unset !important;
    right: 1.1rem !important;
    bottom: 1.1rem !important;
  }

  .typing-ilustration {
    position: unset !important;
    width: unset !important;
    height: unset !important;
  }
`
export const ButtonCv = styled.button`
  position: absolute;
  bottom: 8.5rem;

  border: none;
  border-radius: 0.8rem;

  outline: none;

  padding: 1.1rem 2.2rem;

  background-color: #43d9ad;

  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    &::before,
    &::after {
      display: none;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;

    width: calc(100% + 6px); 
    height: calc(100% + 6px); 
    border-radius: 0.8rem; 
    background-color: #43d9ad; 
    opacity: 0.3;
    animation: pulseButton 1s infinite alternate;
  }

  &::before {
    top: -3px;
    left: -3px;
  }

  &::after {
    bottom: -6px;
    right: -6px;
    width: calc(100% + 12px); 
    height: calc(100% + 12px);
    animation-delay: 0.2s; 
  }

  @keyframes pulseButton {
    0% {
      opacity: 0.3;
    }
    100% {

      opacity: 0;
    }
  }
`
