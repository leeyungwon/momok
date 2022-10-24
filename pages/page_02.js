import Transition from "~/components/Common/Transition";
import Header from "~/components/Common/Header";
import JoinComponent from "~/components/Join";
import Content from "~/components/Common/Content";
import { TextBtn,InputBox } from "~/components/Common/Common";

const Page_02 = () => {
  return (
    <Transition>
      <Header icon="icon icon-chicken" type="StartHeader" />
      <Content>
        <JoinComponent title="정보입력" subtitle="더 이상 뭐먹을지 고민하지 마세요!">  
        <InputBox type="text" placeholder="Name"/>
        <InputBox type="email" placeholder="Email"/>              
        <InputBox type="password" placeholder="Password"/>
        <TextBtn block children="NEXT"></TextBtn>
        </JoinComponent>
      </Content>
    </Transition>
  );
};

export default Page_02;
