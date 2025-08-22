import { jsonInstance } from "../utils/instance";

export const getPostRequest = async (postId) => {
  try {
    const response = await jsonInstance.get(`/posts/${postId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
