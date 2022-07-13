import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import "../Header.css";
import axios from "axios";
import "../InfoBox.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { Card, CardContent } from "@material-ui/core";
import { prettyPrint, sortFunc } from "../util";
import StatsGraph from "./StatsGraph";
import "leaflet/dist/leaflet.css";

const Header = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [center, setCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [zoom, setZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetchCountryInfo(country);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const response = await axios.get(
      "https://disease.sh/v3/covid-19/countries"
    );
    // console.log(response);
    const countries = response.data.map((country) => {
      return {
        name: country.country,
        code: country.countryInfo.iso3,
      };
    });
    setMapCountries(response.data);
    setCountries(countries);
    const sortedData = sortFunc(response.data);
    setTableData(sortedData);
    // console.log(response.data);
  };

  const onChange = (e) => {
    const code = e.target.value;
    setCountry(code);
    fetchCountryInfo(code);
  };

  const fetchCountryInfo = async (code) => {
    const url =
      code === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${code}`;
    const response = await axios.get(url);
    // console.log(response);
    setCountryInfo(response.data);
    if (code !== "worldwide") {
      setCenter([
        response.data.countryInfo.lat,
        response.data.countryInfo.long,
      ]);
    }
    setZoom(3);
  };

  return (
    <Fragment>
      <div className="app__left">
        <div className="app__header">
          <h1 className="gradient-text" style={{ marginBottom: "20px" }}>
            Covid Tracker
          </h1>
          <FormControl className="app__dropdown">
            <Select value={country} onChange={onChange} variant="outlined">
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem key={country.name} value={country.code}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            isActive={casesType === "cases"}
            helper={() => setCasesType("cases")}
            title="Cases"
            todayCases={prettyPrint(countryInfo.todayCases)}
            totalCases={prettyPrint(countryInfo.cases)}
          />
          <InfoBox
            isActive={casesType === "recovered"}
            helper={() => setCasesType("recovered")}
            title="Recovered"
            todayCases={prettyPrint(countryInfo.todayRecovered)}
            totalCases={prettyPrint(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            isActive={casesType === "deaths"}
            helper={() => setCasesType("deaths")}
            title="Deaths"
            todayCases={prettyPrint(countryInfo.todayDeaths)}
            totalCases={prettyPrint(countryInfo.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          center={center}
          zoom={zoom}
          countries={mapCountries}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: "20px",
            }}
          >
            WorldWide Stats - {casesType.toUpperCase()}
          </h3>
          <StatsGraph className="app__graph" casesType={casesType} />
          <h3
            style={{
              marginBottom: "30px",
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            Cases by Country
          </h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Header;
