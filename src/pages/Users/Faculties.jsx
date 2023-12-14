import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import PageContainer from "../../components/Utils/PageContainer";
import SchoolIcon from '@mui/icons-material/School';
import GrainIcon from "@mui/icons-material/Grain"
import Card from "../../components/Card/Card";
import { Breadcrumbs, Typography } from "@mui/material";
function Faculties() {
  return (
    <>
      <PageContainer>
        <Navbar />
        <LSPage>
        <Breadcrumbs aria-label="breadcrumb">
            <a
              style={{
                textDecoration: "none",
                color: "#343a40",
                display: "flex",
                alignItems: "center",
              }}
              href="/"
            >
              <SchoolIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              Faculty
            </a>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
            >
              <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              All Faculties
            </Typography>
          </Breadcrumbs>
          <div style={{ display: "flex",flexWrap:'wrap' }}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </LSPage>
      </PageContainer>
    </>
  );
}

export default Faculties;
