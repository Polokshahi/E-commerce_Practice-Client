import axios from "axios";

const axiosInstantce = axios.create({
     baseURL: "http://localhost:5000"
})

export default axiosInstantce;