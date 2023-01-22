import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`; 

export const Input = styled(TextField)`
  & input {
    padding-bottom: 20px;
    padding-top: 20px;
    width: 100%;
  }
  & input:-webkit-autofill,
  & input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  & .MuiInput-underline:after {
    border-bottom-color: 'blue';
  }
  & label {
    padding-top: 20px;
    font-family: Verdana;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.04em;
    color: 'black';
  }
  & label.Mui-focused {
    color: 'blue';
  }
  & p {
    text-align: right;
    color: 'black';
  }
`;