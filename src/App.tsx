import "./App.css";
import Card from "./components/Card";
import MapWidget from "./components/MapWidget";

function App() {
  return (
    <article style={{ width: "100%" }}>
      <h2> React simple maps</h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Card
          title="Custom Name"
          tags={["well-1", "well-2", "well-3"]}
          description="Wells that I need to see everyday!"
          size="large"
          mapdata={{
            annotations: [
              {
                coordinates: [49.56261559320028, 29.99923757515128],
                name: "Well 1",
                onClick: () => alert("Well 1"),
              },
              {
                coordinates: [49.56261559320028, 29.29923757515128],
                name: "Well 2",
                onClick: () => alert("Well 2"),
              },
              {
                coordinates: [49.26261559320028, 29.10923757515128],
                name: "Well 3",
                onClick: () => alert("Well 3"),
              },
            ],
            startPosition: [48, 29.5],
            zoom: 100,
          }}
        />
        <div style={{ width: "200px" }}>
          <MapWidget
            annotations={[]}
            startPosition={[48, 29.5]}
            zoom={100}
            square
          />
        </div>
      </div>
      <div style={{ width: "1000px" }}>
        <MapWidget
          startPosition={[47, 29]}
          zoom={25}
          annotations={[]}
          enableDrag
          enableZoom
        />
      </div>
    </article>
  );
}

export default App;
