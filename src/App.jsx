import { useState, useEffect } from 'react';
// Importa o cliente Storacha
import * as StorachaClient from '@storacha/client'; 
import UploadForm from './components/UploadForm';
import './App.css'; 

// 🎯 DID do Espaço Fixo: Garante que o DApp use este espaço.
// DID fornecido: did:key:z6MkrpuJgPW7kv5PfW3EvELkTE2MKPvnGaKbcPDbsjcyBnkq
const HARDCODED_SPACE_DID = 'did:key:z6MkrpuJgPW7kv5PfW3EvELkTE2MKPvnGaKbcPDbsjcyBnkq'; 

function App() {
  const [client, setClient] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Aguardando inicialização do cliente...');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 1. Inicializa o cliente Storacha uma vez
  useEffect(() => {
    async function initClient() {
      try {
        const clientInstance = await StorachaClient.create();
        setClient(clientInstance);
        setStatus('Cliente Storacha inicializado. Pronto para o login.');
      } catch (e) {
        setStatus('❌ Erro ao inicializar o cliente Storacha.', 'error');
        console.error('Initialization error:', e);
      }
    }
    initClient();
  }, []);

  // 2. Função de Login
  const handleLogin = async () => {
    if (!client || !email) {
      setStatus('Cliente Storacha não inicializado ou e-mail faltando.', 'error');
      return;
    }

    setStatus(`Enviando solicitação de login para ${email}... Verifique seu e-mail para autorização.`);
    
    try {
      const account = await client.login(email);
      
      // AQUI É O PONTO CRÍTICO: Espera o usuário validar o e-mail (UCAN delegation) no navegador.
      await account.plan.wait(); 

      // Define o DID específico como o espaço atual.
      await client.setCurrentSpace(HARDCODED_SPACE_DID);

      setStatus(`✅ Sucesso! Conectado e autorizado para usar o espaço DID: ${HARDCODED_SPACE_DID}`);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Erro no Login/Autorização:', error);
      
      const errorMessage = error.message.includes('timeout') 
        ? 'Erro de Timeout: Não foi possível validar o e-mail a tempo. Tente novamente e valide imediatamente.'
        : `Falha na autorização: ${error.message}`;

      setStatus(`❌ ${errorMessage}`);
      
    }
  };

  // 3. Renderização
  return (
    <div className="App">
      <h1>💾 Storacha Uploader DApp (React)</h1>

      <p>Status: {status}</p>

      {!isAuthenticated ? (
        <div className="auth-section">
          <h2>1. Entrar (Login)</h2>
          <input
            type="email"
            placeholder="seu_email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin} disabled={!client}>
            {client ? 'Entrar e Autorizar' : 'Carregando Cliente...'}
          </button>
          <small>
            **PASSO CRÍTICO:** Clique, vá ao e-mail e valide **rapidamente**!
          </small>
        </div>
      ) : (
        // Se autenticado, mostra o componente de Upload
        <UploadForm client={client} setStatus={setStatus} />
      )}
    </div>
  );
}

export default App;
