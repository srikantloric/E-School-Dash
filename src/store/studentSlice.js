import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, auth, storageRef } from "../firebase";
import firebase from "../firebase"

import { Alert } from "../components/Utils/Alert";
import Swal from "sweetalert2";

// import{addDoc,setDoc,} from "firebase/firebase-firestore"

export const addstudent = createAsyncThunk(
  "add-students/addstudent",
  async ({ studentData, studentProfile }) => {
    let parts = String(studentData.dateOfBirth).split("-").reverse().join("");
    let dbRef = db.collection("STUDENTS");


    auth.createUserWithEmailAndPassword(studentData.email, parts)
      .then((snap) => {
        console.log(snap.user.uid)

        ///now add student to db
        // dbRef.add(studentData).then((s))
      
      }).catch((error) => {
        console.log(error)
    })


    // try {
    //   let result = await dbRef.add(studentData);
    //   console.log(result.id)
    //     const fileRef=storageRef.child(`images/${result.id}`)
    //     const uploadTask=fileRef.put(studentProfile)
    //     uploadTask.on("state_changed",
    //     function(){
    //       fileRef.getDownloadURL().then((url) => {
    //         console.log(url)
    //       let fData={
    //         profil_url:url,
    //         time_stamp:firebase.firestore.FieldValue.serverTimestamp()
    //       }
    //       db.collection("STUDENTS").doc(result.id).update(fData).
    //       then(()=>{
    //         console.log("Image url Update successfully")
                
    //     auth
    //     .createUserWithEmailAndPassword(studentData.Email, parts)
    //     .then((user) => {
    //       Alert("Student register Successfully");
    //     })
    //     .catch((e) => {
    //       dbRef.doc(result.id).delete();
    //       console.log(e);
    //     });
    //       })
    //       })
    //     }
    //     )
      
      
    // } catch (error) {
    //   console.log("error :" ,error)
    // }
    
    return studentData;
  }
);
//FETCH STUDENT
export const fetchstudent = createAsyncThunk(
  "student/fetchstudent",
  async (classes) => {
    const students = [];

    await db
      .collection("STUDENTS")

      .where("class", "==", classes || "")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          students.push({ ...doc.data(), id: doc.id });
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return students;
  }
);
//Delete data
export const deleltedata = createAsyncThunk(
  "student/deletestudent",
  async (id) => {
    // for (var i = 0; i <= id.length; i++) {
    //   console.log(id[i]);
    // }
    console.log(id);
    db.collection("STUDENTS")
      .doc(id)
      .delete()
      .then(() => {
        
        Alert("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    return id;
  }
);
//update data
export const updatedatastudent = createAsyncThunk(
  "student/updatestudent",
  async ({ studentdata, imageupdate }) => {
    db.collection("STUDENTS")
      .doc(studentdata.id)
      .set(studentdata)
      .then(() => {
        storageRef.child(`images/${studentdata.Email}`)
          .put(imageupdate)
          .then((snapshot) => {
            console.log("Uploaded a blob or file!");
            console.log(snapshot);
          });
        Alert("Update Successfully");
      });
    return studentdata;
  }
);

const studentslice = createSlice({
  name: "student",
  initialState: {
    studentarray: [],
    loading: false,
    error: null,
  },
  // reducers:{

  // },
  extraReducers: {
    [addstudent.pending]: (state) => {
      state.loading = true;
    },
    [addstudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentarray.push(action.payload);
    },
    [addstudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchstudent.pending]: (state) => {
      state.loading = true;
    },
    [fetchstudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentarray = action.payload;
    },
    [fetchstudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleltedata.pending]: (state) => {
      state.loading = true;
    },
    [deleltedata.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentarray = state.studentarray.filter(
        (student) => student.id !== action.payload
      );
    },
    [deleltedata.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatedatastudent.pending]: (state) => {
      state.loading = true;
    },
    [updatedatastudent.fulfilled]: (state, action) => {
      state.loading = false;
      const { id, student } = action.payload;
      const studentindex = state.studentarray.findIndex(
        (student) => student.id === id
      );
      if (studentindex !== -1) {
        state.studentarray[studentindex] = { id: id, student };
      }
    },
    [updatedatastudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addstudent.fulfilled, (state, action) => {
  //       state.studentarray.push(action.payload);
  //     })
  //     .addCase(fetchstudent.fulfilled, (state, action) => {
  //       state.studentarray = action.payload;
  //     });
  // },
});
console.log(studentslice.actions);
export default studentslice.reducer;
