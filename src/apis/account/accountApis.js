import { instance } from "../utils/instance";

export const changePasswordRequest = async (data) => {
  try {
    const response = await instance.post("/account/change/password", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const sendmailRequest = async (data) => {
  try {
    const response = await instance.post("/mail/send", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
