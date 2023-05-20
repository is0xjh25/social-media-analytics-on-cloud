import React, {Component} from 'react';
import { MapContainer, GeoJSON,TileLayer} from "react-leaflet";
import geoJSON from "./../data/sal_geojson.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { scaleLinear } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';
const happinessData = [
{ SAL_CODE21: '10001', happiness_score: 5.938533 },
{ SAL_CODE21: '10015', happiness_score: 5.942823 },
{ SAL_CODE21: '10021', happiness_score: 5.909556 },
{ SAL_CODE21: '10027', happiness_score: 5.845677 },
{ SAL_CODE21: '10029', happiness_score: 5.893832 },
{ SAL_CODE21: '10041', happiness_score: 5.898545 },
{ SAL_CODE21: '10045', happiness_score: 5.930195 },
{ SAL_CODE21: '10046', happiness_score: 5.872638 },
// Add more happiness score data here
];
const GeoPandasMap2 = () => {

  const minScore = Math.min(...happinessData.map((item) => item.happiness_score));
  const maxScore = Math.max(...happinessData.map((item) => item.happiness_score));
  
  // Determine the color based on the happiness score
  const colorScale = scaleLinear().domain([minScore, maxScore]).range([0, 3]);

  const getColor = (score) => {
    const colorValue = colorScale(score);
    return interpolateBlues(colorValue);
  };

  const style = (feature) => {
    const salCode = feature.properties.SAL_CODE21;
    const happinessScore = happinessData.find((data) => data.SAL_CODE21 === salCode)?.happiness_score;
    const color = happinessScore ? getColor(happinessScore) : 'gray';

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };


  return (
    <MapContainer center={[-25.2744, 133.7751]} zoom={4} style={{ height: '60vh', width: '115vh' }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
      <GeoJSON
        data={geoJSON}
        style={style}
        onEachFeature={(feature, layer) => {
          const salCode = feature.properties.SAL_CODE21;
          const happinessScore = happinessData.find((data) => data.SAL_CODE21 === salCode)?.happiness_score;
          layer.bindPopup(`SAL Code: ${salCode}<br/>Happiness Score: ${happinessScore}`);
        }}
      />
    </MapContainer>
  );
};

export default GeoPandasMap2;

  