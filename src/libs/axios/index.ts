import axios from "axios";

export const api = axios.create({
	baseURL: "https://the-movie-network.vercel.app/api",
});
