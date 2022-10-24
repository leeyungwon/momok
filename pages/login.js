import Transition from "~/components/Common/Transition";
import Header from "~/components/Common/Header";
import Content from "~/components/Common/Content";
import { BtnBox } from "~/components/Common/Common";
import { borderRadius, display } from "@mui/system";
import styled from "styled-components";


const LoginInput = styled.input`
border: 1px solid #FE724C;
border-radius: 15px;
height: 50px;
line-height: 50px;
color: #000;
width: 100%;
padding:10px;
box-sizing:border-box;
background: #F8FAFD;
border: 1px solid #E7ECF3;
border-radius: 8px;
margin-bottom:16px;
::placeholder {
  color: #A7B0C0;
}
`;

const LoginLabel = styled.label`
position:relative;
`

const LoginPassShow = styled.div`
position:absolute;
right:15px;
top:50%;
transform:translateY(-50%);
color:#FE724C;
`

const Login = () => {
    return (
      <Transition>
        <Header pagename="로그인"/>
        <Content>
          <LoginInput type="email" placeholder="Email"/>
          <LoginLabel>
          <LoginInput type="password" placeholder="Password"/>
          <LoginPassShow>show</LoginPassShow>
          </LoginLabel>
          <BtnBox block style={{borderRadius:'10px',width:'100%'}}>Login</BtnBox>
          
        </Content>
      </Transition>
    );
  };
  
  export default Login;