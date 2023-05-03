import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ITask } from '../interfaces/ITask';
import { useUsersStore } from './userStore';
import { ToastAlert } from '../components/Toast';
import { AlertColor } from '@mui/material';

interface StateInitialProps {
  isUserAuth: boolean;
  loading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  tasks: ITask[];
  errorMessage: string;
  fetchData: () => void;
  handleLogin: () => void;
  handleRegister: () => void;
  handleLogout: () => void;
  formType: string;
  handleFormType: () => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const initialState: StateInitialProps = {
  isUserAuth: false,
  loading: false,
  errorMessage: '',
  tasks: [],
  fetchData: () => {
    ('');
  },
  setIsLoading: () => {
    ('');
  },
  handleLogin: () => {
    ('');
  },
  handleRegister: () => {
    ('');
  },
  handleLogout: () => {
    ('');
  },
  formType: '',
  handleFormType: () => {
    ('');
  },
  email: '',
  setEmail: () => {
    ('');
  },
  password: '',
  setPassword: () => {
    ('');
  },
};

type ContextProps = PropsWithChildren<{
  children: ReactNode;
}>;

export const AuthContext = createContext(initialState);

export const AuthProvider = ({
  children,
}: ContextProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [isUserAuth, setUserAuth] =
    useState<boolean>(false);
  const [loading, setIsLoading] = useState(false);
  const [formType, setFormType] = useState('Sign In');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [toastSeverity, setToastLevel] =
    useState<AlertColor>('info');
  const [toastMsg, setToastMsg] = useState('');
  const { auth, setEmailUser } = useUsersStore();

  const navigate = useNavigate();

  const closePopUp = () => {
    setOpenToast(false);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(
        `/user/${auth.userEmail}`,
      );
      setTasks(response.data.user.tasks);
    } catch (error) {
      navigate('/app');
      console.log(error);
    }
  };

  const handleLogin = () => {
    try {
      api
        .post('/login', { email, password })
        .then(() => {
          setUserAuth(true);
          setEmailUser(email);
          setOpenToast(true);
          setToastLevel('success');
          setToastMsg('Successfully logging you in!');
          setTimeout(() => {
            navigate('/dashboard');
            setEmail('');
            setPassword('');
          }, 1500);
        })
        .catch((err) => {
          if (err) {
            setErrorMessage(err.response.data.message);
          }
          if (!err) {
            setErrorMessage('');
          }
        });
    } catch (error) {
      console.log('SERVER ERROR');
      setOpenToast(true);
      setToastLevel('error');
      setToastMsg('500 Internal Server');
    }
  };

  const handleRegister = () => {
    try {
      api
        .post('/register', { email, password })
        .then(() => {
          setFormType('Sign In');
          setOpenToast(true);
          setToastLevel('success');
          setToastMsg('Email successfully registered!');
          setEmail('');
          setPassword('');
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setOpenToast(true);
    setToastLevel('info');
    setToastMsg('Logging out!');
    setTimeout(() => {
      setUserAuth(false);
      localStorage.removeItem('auth-store');
      navigate('/app');
    }, 1500);
  };

  const handleFormType = () => {
    setErrorMessage('');

    if (formType === 'Sign In') {
      setFormType('Sign Up');
    }
    if (formType === 'Sign Up') {
      setFormType('Sign In');
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        tasks,
        fetchData,
        isUserAuth,
        loading,
        setIsLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        formType,
        handleFormType,
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
      }}
    >
      <ToastAlert
        open={openToast}
        onClose={closePopUp}
        severity={toastSeverity}
        message={toastMsg}
      />
      {children}
    </AuthContext.Provider>
  );
};
