import styled from "@emotion/styled";

const StyledTag = styled.span`
  background: #526670;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.75rem;
`;
const Tag = ({ text }: { text: string }) => {
  return <StyledTag>{text}</StyledTag>;
};

export default Tag;
