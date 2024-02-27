import React, { InputHTMLAttributes, useState } from 'react';
import { FaCheck } from "react-icons/fa6";
import { Container } from './styles';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean; 
  checkboxId: string;
}

function Checkbox({ checked: checkedProp, checkboxId, ...rest }: ICheckboxProps) {
  return (
    <Container htmlFor={`checkbox-${checkboxId}`}>
      <input type="checkbox" id={`checkbox-${checkboxId}`} checked={checkedProp} {...rest} readOnly />
      <span className="checkmark">{checkedProp && <FaCheck />}</span>
    </Container>
  );
}

export default Checkbox;