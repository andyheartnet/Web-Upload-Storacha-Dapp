import { useState, useEffect } from 'react';

const GATEWAY_HOST = 'storacha.link'; // Gateway oficial

function UploadForm({ client, setStatus }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploads, setUploads] = useState([]);

  // Função para listar uploads anteriores (Bônus)
  const listUploads = async () => {
    try {
      // Usa client.capability.upload.list para listar os uploads do espaço
      const result = await client.capability.upload.list({ size: 10 }); 
      
      setUploads(
        result.results.map(upload => ({
          cid: upload.root.toString(),
          did: upload.commitedBy,
          // Não temos o nome original do arquivo diretamente aqui, usamos o CID
        }))
      );
    } catch (error) {
      console.error('Erro ao listar uploads:', error);
      setStatus('Falha ao carregar lista de uploads.', 'error');
    }
  };
  
  // Lista uploads na montagem do componente
  useEffect(() => {
    listUploads();
  }, [client]);


  // Função de Upload
  const handleUpload = async () => {
    if (!file) {
      setStatus('Selecione um arquivo para upload.', 'error');
      return;
    }

    setIsUploading(true);
    setStatus(`📤 Enviando arquivo: ${file.name}...`);

    try {
      // O cliente Storacha aceita o objeto File do navegador
      const rootCid = await client.uploadFile(file);
      const cidString = rootCid.toString();

      setStatus(`🎉 Upload COMPLETO! CID: ${cidString}`);
      
      // Adiciona o novo upload à lista
      setUploads(prev => [{
        cid: cidString, 
        did: 'Agente Atual', 
        name: file.name // Adiciona o nome do arquivo para melhor visualização
      }, ...prev]);

      setFile(null); // Limpa o input
      document.getElementById('file-input').value = null;

    } catch (error) {
      console.error('Erro no Upload:', error);
      setStatus(`❌ Falha no upload: ${error.message}`, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>2. Upload de Arquivo</h2>
      <input 
        type="file" 
        id="file-input"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={isUploading}
      />
      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? 'Enviando...' : 'Upload para o Storacha'}
      </button>

      <hr />

      <h2>3. Arquivos Enviados</h2>
      <ul className="upload-list">
        {uploads.length === 0 ? (
          <li>{isUploading ? 'Carregando...' : 'Nenhum arquivo encontrado neste espaço.'}</li>
        ) : (
          uploads.map((upload, index) => (
            <li key={index} className="upload-item">
              <strong>Nome:</strong> {upload.name || upload.cid.substring(0, 10) + '...'}
              <br/>
              <strong>CID:</strong> {upload.cid}
              <br/>
              {/* Link do Gateway para compartilhamento */}
              <a 
                href={`https://${upload.cid}.ipfs.${GATEWAY_HOST}/${upload.name || ''}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                🔗 Compartilhar Link do Gateway
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UploadForm;