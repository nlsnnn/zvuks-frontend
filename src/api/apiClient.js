import axios from "axios";
import { baseURL } from "../config/constants";

export const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

