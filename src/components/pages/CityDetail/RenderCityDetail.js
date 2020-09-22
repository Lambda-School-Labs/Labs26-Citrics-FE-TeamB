import React from "react";
import Graph from "../../common/Graphs/renderGraph";

export default function RenderCityDetail({ city }) {
  return (
    <div>
      <h3 className="one-render-h3">
        City: {city.name}, {city.state}
      </h3>
      <p className="one-render-p">
        Population: {city.population.data.total_pop}
      </p>
      <p className="one-render-p">Rental Prices: ${city.rent}</p>
      <p className="one-render-p">Weather: {city.weather}</p>

      {/* Unemployment Graph */}
      <Graph
        dataSet={{
          state: city.state,
          plotX: city.unemployRate.x,
          plotY: city.unemployRate.y,
          graphName: "Unemployment Rate",
          type: "line"
        }}
      />
      {/* Population Graph */}
      <Graph
        dataSet={{
          state: city.state,
          plotX: JSON.parse(city.population.viz).data[0].x,
          plotY: JSON.parse(city.population.viz).data[0].y,
          graphName: "Population Trend",
          type: "bar"
        }}
      />
    </div>
  );
}
