import Transition from "~/components/Common/Transition";
import Header from "~/components/Common/Header";
import LoginComponent from "~/components/Join";
import Content from "~/components/Common/Content";
import { BtnBox,IconBox,Qtext } from "~/components/Common/Common";

const Question_02 = () => {
  return (
    <Transition>
      <Header icon="icon icon-chicken" />
      <Content>
        
        <IconBox><i class="icon icon-chicken"></i></IconBox>
        <Qtext>연속으로 같은 음식을<br></br> 먹어도 되나요?</Qtext>
        <div>
        <BtnBox>상관이에요</BtnBox>
        <BtnBox off>안되는데연?</BtnBox>
        </div>
      </Content>
    </Transition>
  );
};

export default Question_02;
