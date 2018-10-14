import axios from "axios";

export default {
    // Checks If User Is Admin
    adminCheck: function() {
      return axios.get("/auth/isadmin")
    },
    // Path to Forgot For Reset
    forgot: function(email) {
      return axios.post("/auth/forgot", email)
    },
    // Login - credentials: {email: "email@123.com", password: "12345"}
    login: function(credentials) {
      return axios.post("/auth/login", credentials)
    },
    // Checks on session existence on backend
    loginCheck: function() {
      return axios.get("/auth/login")
    },
    // Path to logout
    logout: function() {
      return axios.get("/auth/logout")
    },
    // Add Crew To DB
    signup: function(userInfo) {
      return axios.post("/auth/signup", userInfo)
    },
    // Updates Password
    updatePassword: function(userInfo) {
      return axios.post("/auth/reset", userInfo)
    }
}
 