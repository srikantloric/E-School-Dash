import React from "react";
import './CardDashboard.scss'
import { Grid } from "@mui/material";


function CardDashboard({color,textColor,title,number,Icon}) {
  return (
    <>
      {/* <div className="cs-card" style={{backgroundColor:`${color}`}}>
          
      </div> */}

      <Grid item xs={12} md={4} lg={2} sx={{padding:'24px 0px 0px 24px'}}>
        <div className="cs-card" style={{ backgroundColor: `${color}` }}>
          <img src={Icon} alt="Employee"></img>
          <h6 style={{ color: `${textColor}` }}>{title}</h6>
          <h4 style={{ color: `${textColor}` }}>{number}</h4>
        </div>
      </Grid>
    </>
  );
}

export default CardDashboard;
