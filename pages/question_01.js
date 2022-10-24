import Transition from "~/components/Common/Transition";
import Header from "~/components/Common/Header";
import Content from "~/components/Common/Content";
import { BtnBox,IconBox,Qtext,NextBtn } from "~/components/Common/Common";

const Question_01 = () => {
  return (
    <Transition>
      <Header icon="egg" type="StartHeader"><NextBtn>다음에 하기</NextBtn></Header>
      <Content>
        <IconBox><i class="icon icon-chicken"></i></IconBox>
        <Qtext>맴찔이 인가요?</Qtext>
        <div>
        <BtnBox block>네,맵찔이에요</BtnBox>
        <BtnBox block off>그냥 휴먼 수준?</BtnBox>
        <BtnBox block off>아닌데요?</BtnBox>
        </div>
      </Content>
    </Transition>
  );
};

export default Question_01;
