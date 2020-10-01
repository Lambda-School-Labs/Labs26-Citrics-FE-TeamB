import React, { Component } from "react";
import { Tabs } from "antd";
import LoadingComponent from "../../common/LoadingComponent.js";
import ComparisonCard from "./comparisonCard";
import Graph from "../../common/Graphs/renderGraph";
import Plot from "plotly.js";
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

  getRentals = () => {
    const rentals = [];
    for (let id in this.props.citiesData) {
      rentals.push({
        name: this.props.citiesData[id].name,
        plotY: ["Studio", "1BR", "2BR", "3BR", "4BR"],
        plotX: [
          this.props.citiesData[id].rent.studio,
          this.props.citiesData[id].rent["1br"],
          this.props.citiesData[id].rent["2br"],
          this.props.citiesData[id].rent["3br"],
          this.props.citiesData[id].rent["4br"]
        ],
        graphName: "Apartment Prices",
        type: "bar",
        orientation: "h"
      });
    }
    return rentals;
  };

  getJobs = () => {
    const jobs = [];
    for (let id in this.props.citiesData) {
      jobs.push({
        name: this.props.citiesData[id].name,
        labels: JSON.parse(this.props.citiesData[id].jobs.viz).data[0].labels,
        values: JSON.parse(this.props.citiesData[id].jobs.viz).data[0].values,
        type: "pie"
      });
    }
    return jobs;
  };

  render() {
    const { citiesData } = this.props;
    const { getCityPop, getUnemployRate, getRentals, getJobs } = this;
    const { TabPane } = Tabs;
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

        <div className="graph-container">
          {/* Renders the tabs for the user to navigate for different visuals */}
          <Tabs
            data-testid="ant-d-tabs"
            className="metrics-container graphs"
            defaultActiveKey="1"
            centered="true"
            tabBarStyle={{
              color: "white"
            }}
          >
            <TabPane className="graph-holder" tab="Population Trend" key="2">
              <Graph
                dataSet={getCityPop()[0]}
                dataSet2={getCityPop()[1]}
                dataSet3={getCityPop()[2]}
              />
            </TabPane>
            <TabPane className="graph-holder" tab="Apartment Prices" key="1">
              <Graph
                dataSet={getRentals()[0]}
                dataSet2={getRentals()[1]}
                dataSet3={getRentals()[2]}
              />
            </TabPane>
            <TabPane className="graph-holder" tab="Unemployment Rate" key="3">
              <Graph
                dataSet={getUnemployRate()[0]}
                dataSet2={getUnemployRate()[1]}
                dataSet3={getUnemployRate()[2]}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default RenderComparison;
