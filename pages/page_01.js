//import { useState } from "react";
import Transition from "~/components/Common/Transition";
import Header from "~/components/Common/Header";
import JoinComponent from "~/components/Join";
import Content from "~/components/Common/Content";
import { TextBtn,InputBox } from "~/components/Common/Common";

const Page_01 = () => {
  return (
    <Transition>
      <Header icon="icon icon-chicken" type="StartHeader"/>
      <Content>
        <JoinComponent
          title="핸드폰번호입력"
          subtitle="뭐 먹을지 고민될때  MOMOK 을 사용해보세요!">
                <InputBox type="number" placeholder="핸드폰 번호를 입력하세요"/>
                <TextBtn block children="NEXT"></TextBtn>
          </JoinComponent>
      </Content>
    </Transition>
  );
};

export default Page_01;
