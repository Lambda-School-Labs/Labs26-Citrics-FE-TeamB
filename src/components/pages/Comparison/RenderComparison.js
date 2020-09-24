import React, { Component } from "react";
import { Tabs } from "antd";
import LoadingComponent from "../../common/LoadingComponent.js";
import ComparisonCard from "./comparisonCard";
import Graph from "../../common/Graphs/renderGraph";

class RenderComparison extends Component {
  // puts state name in an array for easier acccess
  getUnemployRate = () => {
    const unemployRate = [];
    for (let id in this.props.citiesData) {
      unemployRate.push({
        name: this.props.citiesData[id].name,
        plotX: JSON.parse(this.props.citiesData[id].unemployRate.viz).data[0].x,
        plotY: JSON.parse(this.props.citiesData[id].unemployRate.viz).data[0].y,
        graphName: "Unemployment Rate",
        type: "line"
      });
    }
    return unemployRate;
  };
  // puts plot data  in an array for easier acccess
  getCityPop = () => {
    const cityPop = [];
    for (let id in this.props.citiesData) {
      cityPop.push({
        name: this.props.citiesData[id].name,
        plotX: JSON.parse(this.props.citiesData[id].population.viz).data[0].x,
        plotY: JSON.parse(this.props.citiesData[id].population.viz).data[0].y,
        graphName: "Population Trend",
        type: "bar"
      });
    }
    return cityPop;
  };

  render() {
    const { citiesData } = this.props;
    const { getCityPop, getUnemployRate } = this;
    if (citiesData.length === 0) {
      return <LoadingComponent message="Loading city data..." />;
    }
    return (
      <div className="comparison-container">
        <div className="card-container">
          {citiesData.map(city => {
            return (
              <ComparisonCard
                citiesData={city}
                key={city.population.data.total_pop}
              />
            );
          })}
        </div>

        {/* Renders the tabs for the user to navigate for different visuals */}
        <Tabs
          data-testid="ant-d-tabs"
          className="metrics-container"
          defaultActiveKey="1"
          centered="true"
          tabBarStyle={{
            color: "white"
          }}
        >
          <Tabs.TabPane className="graph-holder" tab="Population Trend" key="1">
            <Graph
              dataSet={getCityPop()[0]}
              dataSet2={getCityPop()[1]}
              dataSet3={getCityPop()[2]}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            className="graph-holder"
            tab="Unemployment Rate"
            key="2"
          >
            <Graph
              dataSet={getUnemployRate()[0]}
              dataSet2={getUnemployRate()[1]}
              dataSet3={getUnemployRate()[2]}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default RenderComparison;
