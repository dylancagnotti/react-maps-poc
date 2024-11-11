import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import WorldMap from "../assets/topoJson/ne_50m_admin_0_countries.json";
import Cities from "../assets/topoJson/ne_50m_populated_places_simple.json";
//import Roads from "../assets/topoJson/ne_10m_roads.json";
import styled from "@emotion/styled";

const StyledMap = styled(ComposableMap)`
  max-width: 1200px;
  height: 100%;
`;

import { FC } from "react";

type TAnnotation = {
  /** [latitude, longitude] */
  coordinates: [number, number];
  name: string;
  onClick: () => void;
};

type TMapWidgetProps = {
  /** [latitude, longitude] */
  startPosition: [number, number];
  zoom: number;
  annotations: TAnnotation[];
};

const MapWidget: FC<TMapWidgetProps> = (props) => {
  return (
    <section style={{ width: "100%" }}>
      <StyledMap
        projectionConfig={{
          center: props.startPosition,
          scale: props.zoom * 1000,
        }}
      >
        <Geographies geography={WorldMap}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#2e3941"
                stroke="#576067"
              />
            ))
          }
        </Geographies>
        {/*<Geographies geography={Roads}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="transparent"
                stroke="#babfc1"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>*/}

        <Geographies geography={Cities}>
          {({ geographies }) => {
            console.log(geographies);
            return geographies.map((geo) => (
              <Annotation
                key={geo.rsmKey}
                fill="#babfc1"
                stroke="#1a1a1a"
                subject={geo.geometry.coordinates}
                connectorProps={{
                  strokeWidth: 0,
                }}
              >
                <text
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fill="#babfc1"
                  stroke="transparent"
                  fontSize="10"
                >
                  {geo.properties.name}
                </text>
              </Annotation>
            ));
          }}
        </Geographies>

        {props.annotations.map((annotation, index) => (
          <Annotation
            key={index}
            subject={annotation.coordinates}
            dx={-30}
            dy={-30}
            onClick={annotation.onClick}
            connectorProps={{
              strokeWidth: 2,
              stroke: "#576067",
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <text
              x={-8}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#0095df"
              stroke="transparent"
              fontSize="10"
              fontWeight={"bold"}
            >
              {annotation.name}
            </text>
            <circle r={5} cy={30} cx={30} stroke="#0095df" />
          </Annotation>
        ))}
      </StyledMap>
    </section>
  );
};

export default MapWidget;
