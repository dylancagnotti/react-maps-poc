import "./App.css";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import WorldMap from "./assets/topoJson/ne_50m_admin_0_countries.json";
import Cities from "./assets/topoJson/ne_50m_populated_places_simple.json";
//import Roads from "./assets/topoJson/ne_10m_roads.json";
import styled from "@emotion/styled";

const StyledMap = styled(ComposableMap)`
  max-width: 1200px;
  height: 100%;
`;

function App() {
  return (
    <article style={{ width: "100%" }}>
      <h2> React simple maps</h2>

      <StyledMap
        projectionConfig={{
          center: [47, 29],
          scale: 6000,
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
        <Annotation
          subject={[45, 32]}
          dx={-30}
          dy={-30}
          connectorProps={{
            strokeWidth: 2,
            stroke: "#babfc1",
          }}
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#babfc1"
            stroke="transparent"
            fontSize="10"
          >
            {" "}
            Hello world{" "}
          </text>
        </Annotation>
      </StyledMap>
    </article>
  );
}

export default App;
