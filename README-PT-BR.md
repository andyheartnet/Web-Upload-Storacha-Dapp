# 🇧🇷 Storacha CLI — Guia de Instalação e Uso (PT-BR)

O **Storacha CLI** é a ferramenta oficial de linha de comando para interagir com a **Storacha Network** — uma rede descentralizada de armazenamento construída sobre IPFS e Filecoin.  
Com ele, você pode enviar, listar, recuperar e gerenciar arquivos de forma segura, rápida e livre de intermediários.

---

## 🚀 Instalação

### 🧰 Pré-requisitos

Antes de instalar, verifique se você possui:

- **Node.js** (versão 18 ou superior)  
  👉 [Baixar Node.js](https://nodejs.org/)
- **npm** ou **pnpm** (gerenciador de pacotes)

### 💾 Instalação global

```bash
npm install -g @storacha/cli
```

> 💡 Dica: em sistemas Linux ou macOS, pode ser necessário usar `sudo`:
> ```bash
> sudo npm install -g @storacha/cli
> ```

---

## ⚙️ Verificação da instalação

Após a instalação, verifique se o CLI foi reconhecido corretamente:

```bash
storacha --version
```

Para exibir a ajuda completa:

```bash
storacha --help
```

---

## 🔐 Autenticação e configuração inicial

Autentique seu agente com um e-mail válido para receber as permissões delegadas:

```bash
storacha login seuemail@exemplo.com
```

Você também pode gerar tokens UCAN para integração com outros serviços:

```bash
storacha bridge generate-tokens did:key:z6MkhE4Z6c4jfRP3SLK7GxVxLVSWS
```

> Esses tokens permitem que seu agente interaja com a rede Storacha de forma **descentralizada e verificável**, sem depender de servidores centrais.

---

## 📤 Enviando arquivos

Envie um arquivo ou diretório para a Storacha Network:

```bash
storacha up ./meu_arquivo.txt
```

ou

```bash
storacha up ./minha_pasta
```

Após o upload, o CLI exibirá um **CID** (Content Identifier), que representa seu arquivo de forma única e imutável.

---

## 🔍 Recuperando arquivos

Recupere ou visualize um arquivo armazenado pelo seu CID:

```bash
storacha open bafybeibv4yj2n...
```

ou baixe o conteúdo diretamente:

```bash
storacha get bafybeibv4yj2n...
```

---

## 🧩 Comandos disponíveis

| Comando | Descrição |
|----------|------------|
| **login** | Autentica este agente com seu e-mail para acessar as capacidades delegadas. |
| **plan get** | Exibe o plano atual da conta. |
| **account ls** | Lista as contas autorizadas para este agente. |
| **up** | Envia e armazena um ou mais arquivos no serviço. |
| **open** | Abre um CID no navegador via [https://storacha.link](https://storacha.link). |
| **ls** | Lista uploads no espaço atual. |
| **rm** | Remove um upload da listagem. |
| **whoami** | Mostra informações sobre o agente atual. |
| **space create** | Cria um novo espaço (*space*). |
| **space recover** | Restaura um espaço com uma chave de recuperação. |
| **space provision** | Associa um espaço a uma conta de faturamento. |
| **space add** | Importa um espaço a partir de uma prova (UCAN codificado em CAR). |
| **space ls** | Lista espaços conhecidos pelo agente. |
| **space info** | Mostra informações detalhadas de um espaço. |
| **space use** | Define o espaço em uso atual. |
| **coupon create** | Cria um cupom (para créditos ou testes). |
| **bridge generate-tokens** | Gera tokens UCAN para autenticação e integração. |
| **delegation create** | Cria uma delegação UCAN para outro agente. |
| **delegation ls** | Lista delegações criadas por este agente. |
| **delegation revoke** | Revoga uma delegação via CID. |
| **proof add** | Adiciona uma prova delegada a este agente. |
| **proof ls** | Lista as provas de capacidades delegadas. |
| **usage report** | Exibe relatório de uso do espaço em bytes. |
| **can access claim** | Reivindica capacidades delegadas à conta autorizada. |
| **can blob add** | Armazena um *blob* no serviço. |
| **can blob ls** | Lista *blobs* do espaço atual. |
| **can blob rm** | Remove um *blob* do armazenamento via multihash. |
| **can index add** | Registra um índice no serviço. |
| **can upload add** | Registra um upload (DAG com raiz CID) em shards CAR. |
| **can upload ls** | Lista uploads no espaço atual. |
| **can upload rm** | Remove um upload da listagem. |
| **can filecoin info** | Exibe informações do Filecoin para um `PieceCid`. |
| **key create** | Gera um novo par de chaves ed25519. |
| **reset** | Remove todas as provas/delegações, mantendo o DID do agente. |
| **help** | Exibe a ajuda geral. |

---

## ⚙️ Opções Globais

| Opção | Descrição |
|--------|------------|
| `-v, --version` | Mostra a versão atual do Storacha CLI. |
| `-h, --help` | Exibe a mensagem de ajuda. |

---

## 💡 Exemplos práticos

```bash
# Fazer login
storacha login usuario@exemplo.com

# Fazer upload de arquivos
storacha up ./documentos

# Abrir um arquivo pelo CID
storacha open bafybeibv4yj2n...

# Ver informações do agente
storacha whoami

# Listar espaços
storacha space ls
```

---

## 🧠 Dica avançada

Para obter ajuda detalhada sobre qualquer comando:

```bash
storacha <comando> --help
```

Exemplo:

```bash
storacha up --help
```

---

## 🔗 Recursos oficiais

- 🌐 Site: [https://storacha.network](https://storacha.network)  
- 📚 Documentação: [https://docs.storacha.network](https://docs.storacha.network)  
- 💻 Repositório: [https://github.com/storacha](https://github.com/storacha)  
- 🧑‍💻 Comunidade: [https://discord.gg/storacha](https://discord.gg/storacha)

---

Feito com 💙 pela comunidade Storacha.  
Tradução PT-BR — contribuição da comunidade 🇧🇷
