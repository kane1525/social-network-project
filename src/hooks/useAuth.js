import { useSelector } from 'react-redux';

function useAuth() {
  const state = useSelector((state) => state.auth);

  // return { user, isLoading, error, token, isAuth: !!user };
  return { isAuth: !!state?.user?.email };
}

export default useAuth;
