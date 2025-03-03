import axios from "axios";

export const checkAuth = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials: true });
    return response.data;
  } catch (error) {
    return { isAuthenticated: false };
  }
};
