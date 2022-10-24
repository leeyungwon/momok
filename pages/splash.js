
import { textAlign } from "@mui/system";
import { TextBtn,IconBox } from "~/components/Common/Common";
import Content from "~/components/Common/Content";

const SplashHome = () => {
  return (
    
      <Content style={{textAlign:'center'}}>
        <IconBox><i class="icon icon-fried-egg"></i></IconBox>
        <h1>MOMOK</h1>
        <TextBtn block children="NEXT">로그인</TextBtn>
        <TextBtn block children="NEXT">회원가입</TextBtn>
      </Content>

  );
};

export default SplashHome;
