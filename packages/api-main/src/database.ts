import mongoose from 'mongoose';

// Função para conectar a um banco de dados específico
// Esta será a base da nossa estratégia multi-tenant
export const connectToDatabase = async (dbName: string) => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI não foi definida no arquivo .env');
  }

  // A Mongoose mantém um pool de conexões. Criamos uma nova conexão por tenant.
  // A URI é modificada para apontar para o banco de dados do tenant específico.
  const uri = process.env.MONGO_URI.replace('/main_control_db', `/${dbName}`);

  try {
    const connection = await mongoose.createConnection(uri).asPromise();
    console.log(`[Database] Conectado com sucesso ao banco de dados: ${dbName}`);
    return connection;
  } catch (error) {
    console.error(`[Database] Erro ao conectar ao banco de dados ${dbName}:`, error);
    process.exit(1);
  }
};

// Conexão principal (opcional, mas útil para o superadmin ou controle)
export const connectToMainDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI não foi definida no arquivo .env');
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[Database] Conexão principal estabelecida com sucesso.');
    } catch (error) {
        console.error('[Database] Erro na conexão principal:', error);
        process.exit(1); // Encerra a aplicação se não conseguir conectar
    }
};