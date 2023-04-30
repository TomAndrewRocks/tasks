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

interface StateInitialProps {
  isUserAuth: boolean;
  loading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

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
  const [isUserAuth, setUserAuth] =
    useState<boolean>(false);
  const [loading, setIsLoading] = useState(false);
  const [formType, setFormType] = useState('Sign In');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

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
          alert('ERROR');
          console.log(err);
        });
    } catch (error) {
      alert('SERVER ERROR');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
