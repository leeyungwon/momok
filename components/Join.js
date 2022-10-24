import styled from "styled-components";

const Title = (props) => {
  return (
    <>
      <JoinTitle>{props.title}</JoinTitle>
      <JoinP>{props.subtitle}</JoinP>
    </>
  );
};
const JoinTitle = styled.h3`
  color: #fe742c;
  font-weight: 500;
  font-size: 36px;
  line-height: 120%;s
`;

const JoinP = styled.p`
  color: #9796a1;
  font-size: 14px;
  line-height: 28px;
  margin-bottom: 38px;
`;

const JoinComponent = ({ title, subtitle, children }) => (
  <>
    <Title title={title} subtitle={subtitle} />
    {children}
  </>
);

export default JoinComponent;
