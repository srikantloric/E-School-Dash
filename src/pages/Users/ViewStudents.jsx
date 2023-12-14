import React from "react";
import PageContainer from "../../components/Utils/PageContainer";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Styles from "./ViewStudents.module.scss";
import GrainIcon from "@mui/icons-material/Grain";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleltedata, fetchstudent } from "../../store/studentSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import MaterialTable from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function ViewStudents() {
  const data = useSelector((state) => state.student.studentarray);

  const loading = useSelector((state) => state.student);

  const dipatch = useDispatch();

  const [classes, setclass] = useState(1);

  useEffect(() => {
    dipatch(fetchstudent(classes.classes));
  }, [dipatch, classes]);

  const deletestudent = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dipatch(deleltedata(data.id));
      }
    });
  };
  const navigate = useNavigate();
  const updatestudent = (student) => {
    navigate(`/update-student/${student.id}`);
  };

  //column for material table
  const columnMat = [
    { field: "classRoll", title: "ID" },
    { field: "Name", title: "Name" },
    { field: "class", title: "Class" },
    { field: "classRoll", title: "Roll" },
    { field: "dateOfBirth", title: "DOB" },
    { field: "gender", title: "Gender" },
    { field: "Email", title: "Email" },
    { field: "Contactnumber", title: " Contact number" },
    { field: "Religion", title: " Religion" },
    { field: "addmissiondate", title: "DOA" },
    { field: "City", title: "City" },
    { field: "State", title: "State" },
    { field: "Address", title: "Address" },
    { field: "PostalCode", title: "Postalcode" },
  ];

  return (
    <PageContainer className={Styles.page}>
      <Navbar />
      <LSPage>
        <Paper
          sx={{ padding: "5px 10px", width: "100%" }}
          className={Styles.viewStudentHeader}
        >
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
              <PersonIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              Students
            </a>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
            >
              <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              View Students
            </Typography>
          </Breadcrumbs>

          <div>
            <FormControl
              variant="standard"
              sx={{ mr: 2, padding: 0, minWidth: 150, background: "#fff" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Select session
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="session"
              >
                <MenuItem value={1}>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="2023/23">2022-23</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              sx={{ mr: 2, padding: 0, minWidth: 150, background: "#fff" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Select class
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="select class"
                onChange={(e) =>
                  setclass((prev) => ({
                    ...prev,
                    classes: e.target.value,
                  }))
                }
              >
                <MenuItem value={1}>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Second</MenuItem>
                <MenuItem value={3}>Third</MenuItem>
                <MenuItem value={4}>Fourth</MenuItem>
                <MenuItem value={5}>Fifth</MenuItem>
                <MenuItem value={6}>Sixth</MenuItem>
                <MenuItem value={7}>Seventh</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 0, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Select section
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Class"
                onChange={(e) =>
                  setclass((prev) => ({
                    ...prev,
                    classes: e.target.value,
                  }))
                }
              >
                <MenuItem value={1}>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Second</MenuItem>
                <MenuItem value={3}>Third</MenuItem>
                <MenuItem value={4}>Fourth</MenuItem>
                <MenuItem value={5}>Fifth</MenuItem>
                <MenuItem value={6}>Sixth</MenuItem>
                <MenuItem value={7}>Seventh</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Paper>
        <br />

        <MaterialTable
          style={{ display: "grid" }}
          columns={columnMat}
          data={data}
          title="Students Data"
          options={{
            grouping: true,
            headerStyle: {
              backgroundColor: "#5d87ff",
              color: "#FFF",
            },
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) =>
                  ExportPdf(cols, datas, "myPdfFileName"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "myCsvFileName"),
              },
            ],
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <EditIcon />,
              tooltip: "Edit Row",
              onClick: (event, rowData) => {
                updatestudent(rowData);
              },
            },

            {
              icon: () => <DeleteForeverIcon />,
              tooltip: "Delete Student",

              onClick: (event, rowData) => {
                deletestudent(rowData);
              },
            },
          ]}
        />
      </LSPage>
    </PageContainer>
  );
}

export default ViewStudents;
