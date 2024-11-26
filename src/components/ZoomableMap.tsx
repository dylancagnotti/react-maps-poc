/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import WorldMap100 from "../assets/topoJson/countries-110m.json";
import WorldMap50 from "../assets/topoJson/ne_50m_admin_0_countries.json";
import Cities50 from "../assets/topoJson/ne_50m_populated_places_simple.json";
import WorldMap10 from "../assets/topoJson/ne_10m_admin_0_countries.json";
import Cities10 from "../assets/topoJson/ne_10m_populated_places_simple.json";
import Regions from "../assets/topoJson/ne_10m_admin_1_states_provinces_lines.json";
//import Roads from "../assets/topoJson/ne_10m_roads.json";
import styled from "@emotion/styled";
import { FC, useEffect, useMemo, useState } from "react";

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export type TAnnotation = {
  /** [latitude, longitude] */
  coordinates: [number, number];
  name: string;
  onClick: () => void;
};

export type TMapWidgetProps = {
  /** [latitude, longitude] */
  startPosition: [number, number];
  zoom: number;
  annotations: TAnnotation[];
  square?: boolean;
};

const ZoomableMap: FC<TMapWidgetProps> = (props) => {
  const StyledMap = useMemo(
    () => styled(ComposableMap)`
      max-width: 1200px;
      height: 100%;
      aspect-ratio: ${props.square ? "1" : undefined};
      border-radius: 5px;
    `,
    [props.square],
  );

  const [position, setPosition] = useState({
    coordinates: props.startPosition,
    zoom: props.zoom,
  });

  function handleMoveEnd(position: {
    coordinates: [number, number];
    zoom: number;
  }) {
    setPosition(position);
  }

  const sourceMap = useMemo(() => {
    /*if (position.zoom > 25) {
      return WorldMap10;
    } else */ if (position.zoom > 15) {
      return WorldMap50;
    } else {
      return WorldMap100;
    }
  }, [position]);

  const sourceCities = useMemo(() => {
    //if (position.zoom > 15) {
    //  return Cities10;
    //} else {
    //  return Cities50;
    //}

    return Cities50;
  }, [position]);

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <section style={{ width: "100%" }}>
      <StyledMap
      /*projectionConfig={{
          center: props.startPosition,
          scale: props.zoom * 50,
        }}*/
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={handleMoveEnd}
          maxZoom={100}
        >
          <Geographies geography={sourceMap}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2e3941"
                  stroke="#d1d1d1"
                  //inversionally proportional to zoom
                  strokeWidth={`${clamp(0.1 / position.zoom, 0, 0.03)}rem`}
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

          {position.zoom > 7 && (
            <Geographies geography={sourceCities}>
              {({ geographies }) => {
                console.log(geographies);
                return geographies.map((geo) => (
                  <Annotation
                    key={geo.rsmKey}
                    dx={0}
                    dy={0}
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
                      //inversionally proportional to zoom
                      fontSize={`${clamp(0.5 / position.zoom, 0.02, 0.5)}rem`}
                      fontWeight={"bold"}
                    >
                      {geo.properties.name}
                    </text>
                  </Annotation>
                ));
              }}
            </Geographies>
          )}

          {position.zoom > 20 && (
            <Geographies geography={Regions}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="transparent"
                    stroke="#babfc1"
                    strokeWidth={`${
                      clamp(0.1 / position.zoom, 0, 0.03) - 0.001
                    }rem`}
                  />
                ))
              }
            </Geographies>
          )}

          {props.annotations.map((annotation, index) => (
            <Annotation
              key={index}
              subject={annotation.coordinates}
              dx={-100}
              dy={-100}
              onClick={annotation.onClick}
              connectorProps={{
                strokeWidth: "0.5rem",
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
                fontSize="3rem"
                fontWeight={"bold"}
              >
                {annotation.name}
              </text>
              <circle
                r={"1rem"}
                cy={100}
                cx={100}
                stroke="#0095df"
                fill="#0095df"
              />
            </Annotation>
          ))}
        </ZoomableGroup>
      </StyledMap>
    </section>
  );
};

export default ZoomableMap;
