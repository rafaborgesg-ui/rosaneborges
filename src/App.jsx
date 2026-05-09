import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from './components/layout/AppLayout';
import ProtectedSubscriptionRoute from './components/ProtectedSubscriptionRoute';
import Landing from './pages/Landing';
import AcceptInvite from './pages/AcceptInvite';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Dashboard from './pages/Dashboard';
import Comercial from './pages/Comercial';
import CaixaEntrada from './pages/CaixaEntrada';
import CaixaSaida from './pages/CaixaSaida';
import Metas from './pages/Metas';
import Relatorios from './pages/Relatorios';
import Equipe from './pages/Equipe';
import Fornecedores from './pages/Fornecedores';
import Projetos from './pages/Projetos';
import ProjetosExecucao from './pages/ProjetosExecucao';
import AgendaExecucao from './pages/AgendaExecucao';
import DetalheProjetoExecucao from './pages/DetalheProjetoExecucao';
import Clientes from './pages/Clientes';
import Sistema from './pages/Sistema';
import Contato from './pages/Contato';
import Produtos from './pages/Produtos';
import AdminLanding from './pages/AdminLanding';
import Pricing from './pages/Pricing';
import Agradecimento from './pages/Agradecimento';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermosDeServico from './pages/TermosDeServico';
import Login from './pages/Login';


const AuthenticatedApp = () => {
    const { isLoadingAuth, isAuthenticated } = useAuth();

    // Show loading spinner while checking auth
    if (isLoadingAuth) {
          return (
                  <div className="fixed inset-0 flex items-center justify-center bg-background">
                          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>div>
                  </div>div>
                );
    }
  
    // Always show landing first before checking auth
    return (
          <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/accept-invite" element={<AcceptInvite />} />
                <Route path="/sistema" element={<Sistema />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/agradecimento" element={<Agradecimento />} />
                <Route path="/privacidade" element={<PrivacyPolicy />} />
                <Route path="/termos" element={<TermosDeServico />} />
                <Route path="/admin" element={<AdminLanding />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route path="/login" element={<Login />} />
          
            {isAuthenticated && (
                    <>
                              <Route element={<AppLayout />}>
                                          <Route path="/dashboard" element={<ProtectedSubscriptionRoute><Dashboard /></ProtectedSubscriptionRoute>ProtectedSubscriptionRoute>} />
                                                      <Route path="/comercial" element={<Comercial />} />
                                                      <Route path="/clientes" element={<Clientes />} />
                                                      <Route path="/caixa-entrada" element={<CaixaEntrada />} />
                                                      <Route path="/caixa-saida" element={<CaixaSaida />} />
                                                      <Route path="/metas" element={<Metas />} />
                                                      <Route path="/relatorios" element={<Relatorios />} />
                                                      <Route path="/equipe" element={<Equipe />} />
                                                      <Route path="/fornecedores" element={<Fornecedores />} />
                                                      <Route path="/projetos" element={<Projetos />} />
                                                      <Route path="/projetos-execucao" element={<ProjetosExecucao />} />
                                                      <Route path="/projetos-execucao/:id" element={<DetalheProjetoExecucao />} />
                                                      <Route path="/agenda-execucao" element={<AgendaExecucao />} />
                                          </Route>Route>
                              </Route>>
                          )}
                          <Route path="*" element={<PageNotFound />} />
                    </>Routes>
            );
            };
          
          
          function App() {
            
              return (
              <AuthProvider>
                    <QueryClientProvider client={queryClientInstance}>
                            <Router>
                                      <AuthenticatedApp />
                            </Router>Router>
                            <Toaster />
                    </QueryClientProvider>QueryClientProvider>
              </AuthProvider>AuthProvider>
            )
            }
          
          export default App
          </></div>
