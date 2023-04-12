import SignUpForm from '../components/Forms/SignUpForm';
import StartPageWrapper from '../layouts/StartPageWrapper/StartPageWrapper';
import { useLocation } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <StartPageWrapper>
      <SignUpForm />
    </StartPageWrapper>
  );
};

export default RegisterPage;
