import axios from "axios";

const baseURL: string = "https://quizzywebapi.azurewebsites.net/api";

const ApiClient = axios.create({ baseURL });

export default ApiClient;
