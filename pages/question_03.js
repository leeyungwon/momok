import { useState } from 'react'
import Transition from "~/components/Common/Transition";
import Header from "~/components/Common/Header";
import Content from "~/components/Common/Content";
import { TextBtn,IconBox,Qtext,PriceBox,NextBtn } from "~/components/Common/Common";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const marks = [
{
  value: 0,
  label: 'MIN',
},
{
  value: 100000,
  label: 'MAX',
},
];

function valuetext(value) {
return `${value}°C`;
}

const Question_03 = () => {
const [value, setValue] = useState([7000, 15000]);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

return (

  <Transition>
  <Header icon="fried-egg" type="StartHeader"><NextBtn>다음에 하기</NextBtn></Header>
  <Content>
    
    <IconBox><i class="icon icon-chicken"></i></IconBox>
    <Qtext>회사 한끼 식사로 적당한<br></br>
가격대는 얼마 일까요?</Qtext>
  <div>
    <PriceBox>{value[0]}원</PriceBox>
    <PriceBox>{value[1]}원</PriceBox>
  </div>
  <Box>
    <Slider
      getAriaLabel={() => 'Temperature range'}
      min={0}
      max={100000}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      marks={marks}
    />
  </Box>
  <TextBtn>완료</TextBtn>
  </Content>
  </Transition>
);
}

export default Question_03;
