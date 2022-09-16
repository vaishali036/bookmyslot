
import instance from "./axios";

// const baseURL = `http://localhost:8070/api/v1/`;

export const userService =  'user-service/api/v1/';
export const interviewerService = 'interviewer-service/api/v1/';
export const tagService = 'tag-service/api/v1/';
export const emailService = 'email-service/api/v1/' ;
export const authenticationService = 'authentication-service/api/v1/';

//get interview slot by tech tracks
const getSlotByTechTracks = (techTrack) => {
  // return instance.get(`slot/interview/slot/${techTrack}`);
  return instance.get(`${interviewerService}interviews/techtrach/${techTrack}`);
};
//get tag team dashboard data
const getTagDashboardData = () => {
  return instance.get("slot");
};
//book slot by tag team
const bookSlotByTagTeam = (slotData) => {
  return instance.post(`${tagService}interview/slot`, slotData);
 // return axios.post(`${baseURL}interview/slot`,slotData);
};
//get all slots by tagteam email id
const getAllSlotsByTagTeam = (tagTeamEmailId) => {
  //return axios.get(`${baseURL}interview/tag/slot/${tagTeamEmailId}`);
  return instance.get(`${tagService}interview/tag/slot/${tagTeamEmailId}`);
};
//get slots of interviewer by interviewer email id
const getAllSlotsByInterviewer = (interviewerEmailId) => {
 // return axios.get(`${baseURL}interview/slot/${interviewerEmailId}`);
   return instance.get(`${tagService}interview/slot/${interviewerEmailId}`);
};
//update slot status by tag team
const updateSlotStatusByTagTeam = (bookedSlotId,status) => {
   return instance.put(`${tagService}interview/slot/status/${bookedSlotId}`,{bookedStatus : status });
  // return axios.put(`http://localhost:8070/api/v1/interview/slot/status/${bookedSlotId}`,{bookedStatus : status });
};
//update slot status by interviewer
const updateSlotStatusbyInterviewer = (slotId,status) => {
  //return axios.put(`http://localhost:8097/api/v1/slot/status/${slotId}`,{bookedStatus : status });
  return instance.put(`${interviewerService}slot/status/${slotId}`,{bookedStatus : status });
};
const getInterviewerHomeData = (interviewerEmailId,date)=>{
  return instance.get(`${interviewerService}interviewer/interviewerEmailId/${interviewerEmailId}/date/${date}`);
}
//get user data
const getUserData = (userEmailId)=>{
//  return axios.get(`http://localhost:8090/api/v1/user/${userEmailId}`);
   return instance.get(`${userService}user/${userEmailId}`);
}
// send email notification when slot booked by tag team
const emailOnSlotBooking =(data)=>{
  //return axios.post(`http://localhost:8075/api/v1/sendemail/booked`,data)
  return instance.post(`${emailService}sendemail/booked`,data)
}
//send email notification when slot canceled by interviewer
const emailOnSlotCancel=(data)=>{
 // return axios.post(`http://localhost:8075/api/v1/sendemail/cancel`,data)
  return instance.post(`${emailService}sendemail/cancel`,data);
}
export {
  getSlotByTechTracks,
  getTagDashboardData,
  bookSlotByTagTeam,
  getAllSlotsByTagTeam,
  getAllSlotsByInterviewer,
  updateSlotStatusByTagTeam,
  updateSlotStatusbyInterviewer,
  getInterviewerHomeData,
  emailOnSlotBooking,
  emailOnSlotCancel,
  getUserData
};