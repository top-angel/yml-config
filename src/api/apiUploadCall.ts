// General api to access data
import axios from "axios";

import { API_URI } from "./auth";

export default async function apiUploadCall(
  path: string = "",
  data: any = null,
  method: any = "GET",
  token: string = ""
) {
  let url = path;

  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  return axios
    .request({
      url,
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      [dataOrParams]: data,
    })
    .then((resp) => {
      return resp;
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      throw error.response.data;
    });
}
