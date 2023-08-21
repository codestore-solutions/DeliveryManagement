import { ApiConstants } from "../../constants/ApiConstants";
const setUser = (userData: any) => {
  const data = JSON.stringify(userData);
  localStorage.setItem(ApiConstants.user, data);
};

const getUser = () => {
  const data = localStorage.getItem(ApiConstants.user);
  // console.log("data",data)
  return data ? JSON.parse(data)?.jwtToken : null;
};

const getUserDetails = () => {
  const data = localStorage.getItem(ApiConstants.user);
  // console.log("data",data)
  return data ? JSON.parse(data) : null;
};

function logout() {
  try {
    localStorage.removeItem(ApiConstants.user);
    return true;
  } catch (error) {
    // console.error('Error removing user from localStorage:', error);
    return false;
  }
}

function CheckTokenAndRedirect() {
  const jwtToken = getUser();
  return jwtToken || jwtToken !== null ? true : false;
}



export default {
  setUser,
  getUser,
  CheckTokenAndRedirect,
  logout,
  getUserDetails
};
