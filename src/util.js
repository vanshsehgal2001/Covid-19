import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const chart = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortFunc = (data) => {
  const myData = [...data];

  myData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return myData;
};

export const showData = (data, casesType = "cases") => {
  // console.log(data);
  return data.map((country) => {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={chart[casesType].hex}
        fillColor={chart[casesType].hex}
        radius={Math.sqrt(country[casesType]) * chart[casesType].multiplier}
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />
            <div className="info-name">{country.country}</div>
            <div className="info-cases">
              Cases:{numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered:{numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths:{numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
};

export const prettyPrint = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
