import { useSelector } from "react-redux";
import { RootState } from "redux/store";

function useAuth() {
  const state = useSelector((state: RootState) => state.auth);

  return { isAuth: !!state?.user?.email };
}

export default useAuth;
