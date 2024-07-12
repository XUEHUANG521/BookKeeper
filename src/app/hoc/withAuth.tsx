"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent =  (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);
    if (!isAuthenticated) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}; 
export default withAuth