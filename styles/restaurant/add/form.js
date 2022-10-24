import styled from 'styled-components'

const FormWrap = styled.div`
  margin-top: 25px;
`

const Label = styled.label`
  margin-bottom: 5px;
  line-height: 23px;
  color: #9796A1;
  display: block;
`

const Input = styled.input`
  width: 100%;
  height: 65px;
  padding: 0 20px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  transition: border-color .2s;
  font-size: 17px;

  &:focus {
    border-color: #FE724C;
  }
`

const Select = styled.select`
  width: 100%;
  height: 65px;
  padding: 0 20px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  transition: border-color .2s;
  font-size: 17px;
  appearance: none;

  &:focus {
    border-color: #FE724C;
  }
`

const Button = styled.button`
  width: 100%;
  height: 65px;
  padding: 0 20px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  transition: border-color .2s;
  background-color: #FFF;
  text-align: center;
  font-size: 17px;
  appearance: none;

  &:focus {
    border-color: #FE724C;
  }
`

export {
  FormWrap,
  Label,
  Input,
  Select,
  Button,
}
