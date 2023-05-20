import React, {Component} from 'react';
import { MapContainer, GeoJSON,TileLayer} from "react-leaflet";
import geoJSON from "./../data/gcc_geojson.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import { scaleLinear } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';
const happinessData = [
{ GCC_CODE21: '1GSYD', happiness_score: 5.938533 },
{ GCC_CODE21: '1RNSW', happiness_score: 5.942823 },
{ GCC_CODE21: '2GMEL', happiness_score: 5.909556 },
{ GCC_CODE21: '2RVIC', happiness_score: 5.845677 },
{ GCC_CODE21: '3GBRI', happiness_score: 5.893832 },
{ GCC_CODE21: '3RQLD', happiness_score: 5.898545 },
{ GCC_CODE21: '4GADE', happiness_score: 5.930195 },
{ GCC_CODE21: '4RSAU', happiness_score: 5.872638 },
{ GCC_CODE21: '5GPER', happiness_score: 5.892053 },
{ GCC_CODE21: '5RWAU', happiness_score: 5.873453 },
{ GCC_CODE21: '6RTAS', happiness_score: 5.973764 },
{ GCC_CODE21: '6GHOB', happiness_score: 5.911383 },
{ GCC_CODE21: '7GDAR', happiness_score: 5.863090 },
{ GCC_CODE21: '7RNTE', happiness_score: 6.022706 },
{ GCC_CODE21: '8ACTE', happiness_score: 5.936749 },
// Add more happiness score data here
];
const GeoPandasMap = () => {

  const minScore = Math.min(...happinessData.map((item) => item.happiness_score));
  const maxScore = Math.max(...happinessData.map((item) => item.happiness_score));
  
  // Determine the color based on the happiness score
  const colorScale = scaleLinear().domain([minScore, maxScore]).range([0, 3]);

  const getColor = (score) => {
    const colorValue = colorScale(score);
    return interpolateBlues(colorValue);
  };

  const style = (feature) => {
    const gccCode = feature.properties.GCC_CODE21;
    const happinessScore = happinessData.find((data) => data.GCC_CODE21 === gccCode)?.happiness_score;
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
          const gccCode = feature.properties.GCC_CODE21;
          const happinessScore = happinessData.find((data) => data.GCC_CODE21 === gccCode)?.happiness_score;
          layer.bindPopup(`GCC Code: ${gccCode}<br/>Happiness Score: ${happinessScore}`);
        }}
      />
    </MapContainer>
  );
};

export default GeoPandasMap;

  