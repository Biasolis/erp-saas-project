import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMainDatabase } from './database';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rota de teste
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'API principal do ERP está funcionando!',
    timestamp: new Date().toISOString(),
  });
});

// Função para iniciar o servidor
const startServer = async () => {
  // Conecta ao banco de dados principal de controle
  await connectToMainDatabase();
  
  app.listen(PORT, () => {
    console.log(`[Server] Servidor rodando na porta ${PORT}`);
    console.log(`[Server] Acesse http://localhost:${PORT}/api/health para testar.`);
  });
};

startServer();