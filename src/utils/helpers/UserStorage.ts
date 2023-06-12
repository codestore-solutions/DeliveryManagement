import { ApiContants } from "../../constants/ApiContants";
const setUser =  (userData: any) => {
  const data = JSON.stringify(userData);
  localStorage.setItem(ApiContants.user, data);
};

const getUser =  () => {
  const data = localStorage.getItem(ApiContants.user);
  console.log("data",data)
  return data ? JSON.parse(data)?.jwtToken : "";
};

function logout() {
  try {
    localStorage.removeItem(ApiContants.user);
    return true;
  } catch (error) {
    console.error('Error removing user from localStorage:', error);
    return false;
  }
}

function CheckTokenAndRedirect() {
  const jwtToken = getUser();
  return jwtToken || jwtToken !== null ? true: false;
}



export default {
  setUser,
  getUser,
  CheckTokenAndRedirect,
  logout
};
