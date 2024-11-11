import "./App.css";
import MapWidget from "./components/MapWidget";

function App() {
  return (
    <article style={{ width: "100%" }}>
      <h2> React simple maps</h2>
      <MapWidget
        annotations={[
          {
            coordinates: [49.56261559320028, 29.99923757515128],
            name: "Well",
            onClick: () => alert("Well"),
          },
        ]}
        startPosition={[47, 29]}
        zoom={6}
      ></MapWidget>
    </article>
  );
}

export default App;
