
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
  getAuth
} from "@firebase/auth";
import {auth} from '../utils/firebase'
//const auth = getAuth();
type AuthContextType = {
  user: User | null; //I'm not sure what can be stored in User value, currently you have there only `null`
  //it's unclear what return type `createUserWithEmailAndPassword` function has. I gues it's something like UserCredential, basing on documentation: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword  
  register: (email: string, password: string) => Promise<UserCredential | void>
}
const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<UserCredential>;
}>({
  user: null,
  loading: true,
  login: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),
  logout: () => Promise.resolve(),
  register: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);

    return await signOut(auth);
  };

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider value={{ loading, user, login, logout, register }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};