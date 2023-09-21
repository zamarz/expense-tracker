import { authFire } from "../firebaseConfig";

export const getCurrentUserId = () => {
  return authFire.currentUser.uid;
};
