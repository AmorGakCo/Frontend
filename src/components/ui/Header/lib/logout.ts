import { fetchLogout } from "@/lib/fetchLogout"
import Cookies from "js-cookie";
export const logout = async () => {
  await fetchLogout();
  Cookies.remove('accessToken');
  window.location.replace('/');
}