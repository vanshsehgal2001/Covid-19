import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const InfoBox = ({
  helper,
  title,
  isActive,
  isRed,
  todayCases,
  totalCases,
}) => {
  return (
    <Card
      style={{
        backgroundColor: `${
          isActive ? (isRed ? "rgba(256,0,0,0.2)" : "rgba(0,256,0,0.2)") : ""
        } `,
      }}
      onClick={helper}
      className={`infobox ${isActive && "infobox--isActive"} ${
        isRed && "infobox--red"
      }`}
    >
      <CardContent>
        <Typography
          className="infobox__title"
          style={{
            marginBottom: "3px",
            fontWeight: "bolder",
            fontSize: "30px",
          }}
          color="textSecondary"
        >
          {title}
        </Typography>
        <h2 className="infobox__currentCases" style={{ marginBottom: "3px" }}>
          {todayCases}{" "}
          <span style={{ color: "black", fontSize: "20px" }}>Today</span>
        </h2>
        <Typography className="infobox__totalCases" color="textSecondary">
          {totalCases}{" "}
          <span style={{ color: "black", fontSize: "15px" }}>Total</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
