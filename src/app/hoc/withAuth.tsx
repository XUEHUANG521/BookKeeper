"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import axios from 'axios';

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = sessionStorage.getItem("token");
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (!token) {
          router.push("/auth/login");
          setLoading(false);
          return;
        } 

        try {
          await axiosInstance.post('/api/auth/validateToken', { token });
          setIsAuthenticated(true);
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 401 && refreshToken) {
            try {
              const response = await axiosInstance.post('/api/auth/refreshToken', { refreshToken });
              if (response.data.success) {
                sessionStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
              } else {
                router.push("/auth/login");
              }
            } catch (refreshError: unknown) {
              console.error('Refresh token failed:', refreshError);
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('refreshToken');
              router.push("/auth/login");
            }
          } else {
            router.push("/auth/login");
          }
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
		</div>
      )
    }

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
