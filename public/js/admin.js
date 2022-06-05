/* eslint-disable */


import axios from "axios";
import { showAlert } from "./alerts";

export const manageTour =  async(tourId)=>{
    try {

        const res = await axios({
          method: "DELETE",
          url: `/api/tour/${tourId}`,
        });
        
        if ((res.status = "204 No Content")) {
            console.log(res.status);
        showAlert("success", `tour has been deleted succesfully`);
        location.reload(true);    
        // location.assign("/overview");
        }
      } catch (err) {
        
        console.log(err.response);
        showAlert("error", err.response.data.message);
      }
  };

 
  export const manageUser =  async(userId)=>{
    try {

        const res = await axios({
          method: "DELETE",
          url: `/api/user/${userId}`,
        });
        
        if ((res.status = "204 No Content")) {
            console.log(res.status);
        showAlert("success", `user has been deleted succesfully`);
        location.reload(true);    
        // location.assign("/overview");
        }
      } catch (err) {
        
        console.log(err.response);
        showAlert("error", err.response.data.message);
      }
  };

  export const manageBooking =  async(bookingId)=>{
    try {

        const res = await axios({
          method: "DELETE",
          url: `/api/bookings/${bookingId}`,
        });
        
        if ((res.status = "204 No Content")) {
        showAlert("success", `booking has been deleted succesfully`);
        location.reload(true);    
        // location.assign("/overview");
        }
      } catch (err) {
        
        console.log(err.response);
        showAlert("error", err.response.data.message);
      }
  };

  