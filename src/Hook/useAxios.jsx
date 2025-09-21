import axios from "axios";

const axiosInstantce = axios.create({
     baseURL: "http://localhost:3000"
})

export default axiosInstantce;