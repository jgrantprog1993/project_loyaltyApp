import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

import {Container, Row, Col, Button} from 'reactstrap';
import { signOut } from 'firebase/auth';

const LoggedIn = () => {
  const { user, loading, register } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !user)
      router.push('/')
  }, [user, loading])

  return (
    <Container>
      // ...
      <Button >Sign out</Button>
      // ...
    </Container>
  )
}

export default LoggedIn;
