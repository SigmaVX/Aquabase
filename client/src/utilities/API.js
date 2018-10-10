import axios from "axios";

export default {
    getRecentReports: function(query){
        return axios.get("/api/reports/recent", {params: query})
    },
    getResetData: function(){
        return axios.get("/auth/reset")
    },
    // Get & Update All Counts
    updateCounts: function(query) {
        return axios.get("/api/counts/add", {params: query})
    },
    // Get & Update All Counts
    reduceCounts: function(query) {
        return axios.get("/api/counts/reduce", {params: query})
    },
    // Get Recap of Gams, Systems, Cheats, & Cheaters Sorted
    getRecapCounts: function() {
        return axios.get("/api/counts/recap")
    },
    // get forum list based (list of chatrooms)
    getForumList: function() {
      return axios.get(`/api/forum`);
    },
    // Get Chat Forum
    getChatForum: function(id) {
      return axios.get(`/api/forum/${id}`)
    },
    // post chat
    postChat: function(id, postInfo) {
      return axios.post(`/api/chats/${id}`, postInfo);
    },
    // Delete Chat
    deleteChat: function(id) {
      return axios.delete(`/api/chats/${id}`)
    },
    getUsers: function() {
      return axios.get("/api/users");
    },
    // Post User
    postUsers: function(postInfo) {
      return axios.post("/api/users", postInfo)
    },
    // Edit Users
    putUsers: function(id, body) {
      return axios.put(`/api/users/${id}`, body)
    },
    // Delete User
    deleteUsers: function(id) {
      return axios.delete(`/api/users/${id}`)
    },

    // Get All Reports
    getReports: function() {
        return axios.get("/api/reports")
    },
    // Get All Reports By IGN
    getReportsByIGN: function(cheaterIGN) {
        return axios.get("/api/reports/ign", {params: cheaterIGN})
    },
    // Get All Cheats
    getCheats: function() {
        return axios.get("/api/cheats")
    },
    // Get All Cheaters
    getCheaters: function() {
        return axios.get("/api/cheaters")
    },
    // Get All Systems
    getSystems: function() {
        return axios.get("/api/systems")
    },
    // Get All Games
    getGames: function() {
        return axios.get("/api/games")
    },
    // Get All Videos
    getVideos: function() {
        return axios.get("/api/videos")
    },
    // Get All Forum
    getForum: function() {
        return axios.get("/api/forum")
    },
    // Post Report 
    postReport: function(postInfo) {
        return axios.post("/api/reports", postInfo)
    },
    // Post Cheat 
    postCheats: function(postInfo) {
        return axios.post("/api/cheats", postInfo)
    },
    // Post Cheater 
    postCheater: function(postInfo) {
        return axios.post("/api/cheaters", postInfo)
    },
    // Post Game 
    postGames: function(postInfo) {
        return axios.post("/api/games", postInfo)
    },
    // Post Cheater 
    postSystems: function(postInfo) {
        return axios.post("/api/systems", postInfo)
    },
    // Post Video 
    postVideo: function(postInfo) {
        return axios.post("/api/videos", postInfo)
    },
    // Post Forum 
    postForum: function(postInfo) {
        return axios.post("/api/forum", postInfo)
    },
    // Edit Report
    putReport: function(id, body) {
        return axios.put(`/api/reports/byid/${id}`, body)
    },
    // Edit Cheats
    putCheat: function(id, body) {
        return axios.put(`/api/cheats/${id}`, body)
    },
    // Edit Cheats
    putCommentsAndVideos: function(id, body) {
        return axios.put(`/api/reports/commentsandvideo/${id}`, body)
    },
    // Edit Cheater
    putCheater: function(id, body) {
        return axios.put(`/api/cheaters/${id}`, body)
    },
    // Edit Game
    putGame: function(id, body) {
        return axios.put(`/api/games/${id}`, body)
    },
    // Edit System
    putSystem: function(id, body) {
        return axios.put(`/api/systems/${id}`, body)
    },
    // Edit Video
    putVideo: function(id, body) {
        return axios.put(`/api/videos/${id}`, body)
    },
    // Edit Forum
    putForum: function(id, body) {
        return axios.put(`/api/forum/${id}`, body)
    },
    // Delete Report
    deleteReport: function(id) {
        return axios.delete("/api/reports/id", {params:id})
    },
    // Delete Cheat
    deleteCheat: function(id) {
        return axios.delete(`/api/cheat/${id}`)
    },
    // Delete Cheater
    deleteCheater: function(id) {
        return axios.delete(`/api/cheaters/${id}`)
    },
    // Delete Game
    deleteGame: function(id) {
        return axios.delete(`/api/games/${id}`)
    },
    // Delete System
    deleteSystem: function(id) {
        return axios.delete(`/api/systems/${id}`)
    },
    // Delete Video
    deleteVideo: function(id) {
        return axios.delete(`/api/videos/${id}`)
    },
    // Delete Forum
    deleteForum: function(id) {
        return axios.delete(`/api/forum/${id}`)
    }
}