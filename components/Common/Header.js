import styled from "styled-components";
import {IconBox} from "~"
const Header = ({ icon, children, className, type , pagename }) => {
const classList = [
`icon icon-${icon}`,
className,
].join(' ');


const PrevBtn = styled.button`
border:none;
background:none;
`
const H1 = styled.h1`
flex: auto;
display: block;
font-weight: 500;
font-size: 20px;
line-height: 28px;
text-align: center;
letter-spacing: -1px;
color: #1D232E;
`


if({type}.type == 'StartHeader'){ 
return(
  <header>
    <h1>
      <i className={classList}></i>
    </h1>
    {children}
  </header>
  );
}else{
return(
<header>
  <PrevBtn>←</PrevBtn>
  <H1>
    {pagename}
  </H1>
  {children}
</header>
);
}
};
export default Header;
