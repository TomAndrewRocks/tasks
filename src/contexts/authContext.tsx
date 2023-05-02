import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ITask } from '../interfaces/ITask';

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

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    try {
      api
        .post('/login', { email, password })
        .then(() => {
          setUserAuth(true);
          setTimeout(() => {
            navigate('/dashboard');
            setEmail('');
            setPassword('');
          }, 750);
        })
        .catch((err) => {
          if (err) {
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
          } 
          if(!err) {
            setErrorMessage('')
          }
        });
    } catch (error) {
      console.log('SERVER ERROR');
    }
  };

  const handleRegister = () => {
    try {
      api
        .post('/register', { email, password })
        .then(() => {
          setFormType('Sign In');
          setEmail('');
          setPassword('');
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setTimeout(() => {
      setUserAuth(false);
    }, 750);
  };

  const handleFormType = () => {
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
      {children}
    </AuthContext.Provider>
  );
};
