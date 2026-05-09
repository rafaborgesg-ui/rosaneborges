import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
    const { isAuthenticated, isLoadingAuth } = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
        if (!isLoadingAuth && isAuthenticated) {
                navigate("/dashboard");
        }
  }, [isAuthenticated, isLoadingAuth, navigate]);

  return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
              <div className="text-center">
                      <div className="w-12 h-12 border-4 border-[#276a4d]/20 border-t-[#276a4d] rounded-full animate-spin mx-auto mb-4"></div>div>
                      <h2 className="font-serif text-xl text-[#1a3d2b]">Autenticando...</h2>h2>
                      <p className="text-stone-500 text-sm mt-2">Aguarde um momento enquanto preparamos seu acesso.</p>p>
              </div>div>
        </div>div>
      );
}</div>
