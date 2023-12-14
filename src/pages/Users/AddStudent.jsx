import React, { useRef, useState } from "react";
import PageContainer from "../../components/Utils/PageContainer";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./AddStudent.module.scss";
import { IconPrinter } from "@tabler/icons-react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GrainIcon from "@mui/icons-material/Grain";
import ReactToPrint from "react-to-print";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addstudent } from "../../store/studentSlice";
import { PhotoCamera } from "@mui/icons-material";

function AddStudent() {
  const printRef = useRef();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const [formData, setFormData] = useState({
    Name: "",
    classRoll: "",
    admissionno: "",
    dateOfBirth: "",
    addmissiondate: "",
    gender: "",
    Bloodgroup: "",
    Religion: "",
    class: "",
    Email: "",
    Cast: "",
    Religion: "",
    Fathername: "",
    fatheroccupation: "",
    fatherQualification: "",
    Mothername: "",
    motherqualifiation: "",
    motheroccupation: "",
    City: "",
    State: "",
    PostalCode: "",
    Address: "",
    Contactnumber: "",
    AlternateNumber: "",
  });

  const handleImageUpload = () => {
    // TODO: Implement image upload logic here
    console.log("Image uploaded:", selectedImage);
  };

  // function nextButton(e) {
  //   e.preventDefault()
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedImage);

    if (selectedImage == null) {
      setError("Please select profile image.");
    } else {
      dispatch(
        addstudent({ studentData: formData, studentProfile: selectedImage })
      );
    }
  };

  return (
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
            <PersonAddIcon sx={{ mr: 0.3 }} fontSize="inherit" />
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
        <br />
        <Paper
          sx={{ padding: "10px 30px", margin: "0px 10px " }}
          className={Styles.paper}
        >
          <div className={Styles.pageHeader}>
            <h3>Add Student Form</h3>
            <ReactToPrint
              content={() => printRef.current}
              copyStyles={true}
              trigger={() => <IconPrinter size={45} />}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <span className={Styles.inputSeperator}>Personal Details</span>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Name"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Name: e.target.value,
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Class"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        class: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value={1}>STD - I</MenuItem>
                    <MenuItem value={2}>STD - II</MenuItem>
                    <MenuItem value={3}>STD - III</MenuItem>
                    <MenuItem value={4}>STD - IV</MenuItem>
                    <MenuItem value={5}>STD - V</MenuItem>
                    <MenuItem value={6}>STD - VI</MenuItem>
                    <MenuItem value={7}>STD - VII</MenuItem>
                    <MenuItem value={8}>STD - VIII</MenuItem>
                    <MenuItem value={9}>STD - IX</MenuItem>
                    <MenuItem value={10}>STD - X</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Class Roll No"
                  type="number"
                  variant="outlined"
                  value={formData.classRoll}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      classRoll: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="DOB"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                  type="date"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Admission Date"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      addmissiondate: e.target.value,
                    }))
                  }
                  type="date"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Blood Group"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Bloodgroup: e.target.value,
                    }))
                  }
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Religion"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Religion: e.target.value,
                    }))
                  }
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Cast"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Cast: e.target.value,
                    }))
                  }
                  variant="outlined"
                  type="text"
                />
              </Grid>
            </Grid>
            {/* Family Details */}
            <br />
            <br />
            <span className={Styles.inputSeperator}>Family Details</span>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Father's Name"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Fathername: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Occupation"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fatheroccupation: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Qualification"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fatherQualification: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Mother's Name"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Mothername: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Occupation"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motheroccupation: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Qualification"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motherqualifiation: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>

            {/* Correspondance */}
            <br />
            <br />
            <span className={Styles.inputSeperator}>Contact Details</span>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Contact Number"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Contactnumber: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Contact Alternate"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      AlternateNumber: e.target.value,
                    }))
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Email: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Address Full"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Address: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="City"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      City: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="State"
                  variant="outlined"
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      State: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Postal Code"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      PostalCode: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              {/* <IconButton color="primary" aria-label="upload picture" component="span">
      <PhotoCamera />
    </IconButton> */}
              <Typography
                variant="h6"
                marginLeft="1rem"
                width="100%"
                sx={{ mt: 3 }}
                gutterBottom
              >
                Profile Image Upload
              </Typography>
              <br></br>

              <input
                type="file"
                accept="image/png ,image/jpeg"
                style={{ display: "none" }}
                id="imageInput"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}
              <br></br>
              <label htmlFor="imageInput">
                <Button
                  component="span"
                  variant="outlined"
                  style={{ marginTop: "10px", marginLeft: "1rem" }}
                >
                  Choose Image
                </Button>
              </label>
              {/* <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={handleImageUpload}
        >
          Upload Image
        </Button> */}
            </Grid>
            <br />
            <FormGroup>
              <FormControlLabel
                required
                control={<Checkbox />}
                label="I here by confirm that above details provided are correct and only used for official purpose."
              />
            </FormGroup>
            <br />
            <p style={{ color: "red", display: "flex" }}>{error}</p>
            <Grid md={12} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                sx={{
                  height: "3em",
                  background: "var(--bs-secondary)",
                }}
                variant="contained"
                disableElevation
              >
                Reset
              </Button>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "1rem",
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
              {/* <ReactToPrint
                content={() => printRef.current}
                copyStyles={true}
                trigger={() => (
                  <Button variant="outlined" sx={{ margin: "0px 10px" }}>
                    Print Form
                  </Button>
                )}
              /> */}
              {/* <Button
                sx={{ height: "3em" ,marginLeft:"1rem"}}
                variant="contained"
                disableElevation={true}
                // onClick={nextButton}
              >
                Next
              </Button> */}
            </Grid>
            <br></br>
          </form>
        </Paper>
      </LSPage>
    </PageContainer>
  );
}

export default AddStudent;
