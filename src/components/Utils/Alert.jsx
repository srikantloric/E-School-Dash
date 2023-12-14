import React from 'react'
import Swal from "sweetalert2";

export const Alert = (message) => {
  Swal.fire({
   position: "center",
   icon: "success",
    title: message,
    showConfirmButton: false,
 timer: 1500,
    });             
  
}
