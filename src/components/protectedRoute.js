import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";


// @ts-ignore
const ProtectedRoute = ( children ) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [router, currentUser]);

  return <>{currentUser ? children : null}</>;
};

export default ProtectedRoute;