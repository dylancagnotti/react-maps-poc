import styled from "@emotion/styled";
import { FC } from "react";
import MapWidget, { TMapWidgetProps } from "./MapWidget";
import Tag from "./Tag";

type TCardProps = {
  title: string;
  description: string;
  tags: string[];
  mapdata?: TMapWidgetProps;
};

/**
 * COLORS
 * Border: #435a66
 * Background: gradient from #213a47 to #435a66
 * Tags: #526670
 * max-w: 470px // 260px w/o map
 * max-h: 250px
 */

const StyledCard = styled.article`
  width: 470px;
  height: 250px;
  border: 1px solid #435a66;
  border-radius: 5px;
  background: linear-gradient(135deg, #213a47, #435a66);
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 10fr 10fr;
  gap: 1rem;
  h3 {
    margin: 0;
    padding: 0;
    text-align: start;
    font-weight: 400;
    font-size: 1.5rem;
  }

  @media screen {
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledDescription = styled.p`
  padding: 0;
  margin: 0;
  text-align: start;
  font-size: 0.75rem;
`;

const StyledAdditionalData = styled.p`
  padding: 0;
  margin: 0;
  text-align: start;
  font-size: 0.75rem;
  opacity: 0.6;
`;

const StyledSelect = styled.select`
  border: 1px solid #3d515c;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 30px;
  color: #3d515c;
`;

const Card: FC<TCardProps> = (props) => {
  return (
    <StyledCard>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "0.5rem",
          height: "100%",
        }}
      >
        <h3>{props.title}</h3>
        <TagsWrapper>
          {props.tags.map((tagText, idx) => (
            <Tag key={idx} text={tagText} />
          ))}
        </TagsWrapper>
        <StyledDescription>{props.description}</StyledDescription>
        <StyledAdditionalData>Rig 1, Rig 2, Rig 3, Rig 4</StyledAdditionalData>
        <StyledSelect
          style={{
            marginTop: "auto",
          }}
        >
          <option>GHG</option>
        </StyledSelect>
      </section>
      {props.mapdata !== undefined && <MapWidget {...props.mapdata} square />}
    </StyledCard>
  );
};

export default Card;
