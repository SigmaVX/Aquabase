import axios from "axios";

// Sign Up Object Format: 
//  userInfo = {
//    email: "alex@example.com" 
//    username: "alex",
//    password: 12345Password!,
//    pswrdConfirmation: 12345Password!
// }

export default {
    // checks on session existence on backend
    adminCheck: function() {
      return axios.get("/auth/isadmin")
    },
    // path to logout
    forgot: function(email) {
      return axios.post("/auth/forgot", email)
    },
    // credentials: {username: "uname", password: "12345"}
    login: function(credentials) {
      return axios.post("/auth/login", credentials)
    },
    // checks on session existence on backend
    loginCheck: function() {
      return axios.get("/auth/login")
    },
    // path to logout
    logout: function() {
      return axios.get("/auth/logout")
    },
    signup: function(userInfo) {
      console.log(userInfo);
      return axios.post("/auth/signup", userInfo)
    },
    updatePassword: function(userInfo) {
      return axios.post("/auth/reset", userInfo)
    }
}
 