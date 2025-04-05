import mysql from "mysql2/promise";
import { spawn } from 'child_process';

export default async function AddUserMessage(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { NomeUser } = req.query;

  if (!NomeUser) {
    return res.status(400).json({ message: 'O parâmetro "NomeUser" é obrigatório' });
  }

  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "T6A9A6p7*",
      database: "test_nextjs_schema",
    });

    // Consulta ao banco de dados
    const [rows] = await connection.execute(
      'SELECT i_user_user FROM users WHERE s_nome_user = ?',
      [NomeUser]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ message: `Usuário "${NomeUser}" não encontrado` });
    }

    // Função para executar o script Python
    const executePython = (rows) => {
      return new Promise((resolve, reject) => {
      
          const pythonProcess = spawn('python', ['./src/pages/api/ProcessChild/CreatFolder.py']);
          
    
        // Envia os dados como JSON para o stdin do script Python
        pythonProcess.stdin.write(JSON.stringify(rows));
        pythonProcess.stdin.end();
    
        let resultado = '';
    
        pythonProcess.stdout.on('data', (data) => {
          resultado += data.toString();
        });
    
        pythonProcess.stderr.on('data', (data) => {
          console.error(`Erro no Python: ${data}`);
        });
    
        pythonProcess.on('close', (code) => {
          if (code === 0) {
            resolve(resultado.trim());
          } else {
            reject(new Error(`Processo Python terminou com código ${code}`));
          }
        });
      });
    };
    console.log('NomeUser recebido:', NomeUser);
    console.log('Dados retornados do banco de dados:', rows);


    // Executa o script Python e envia a resposta
    const resultado = await executePython();
    return res.status(200).json({ message: 'Executado com sucesso', resultado });

  } catch (error) {
    console.error('Erro ao conectar no banco de dados ou executar Python:', error);
    return res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
}
