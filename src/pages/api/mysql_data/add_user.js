import mysql from "mysql2/promise";


export default async function handler(req, res) {
 
  if (req.method === "POST") {
    // Desestruturando os dados enviados no corpo da requisição
    const { s_nome_user, email_user , senha_user , position_latitude , position_longitude, concurso, primeiro_login_date,primeiro_login_hour } = req.body;

    if (!s_nome_user || !email_user || !senha_user) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    try {
      // Conexão com o banco de dados
      const connection = await mysql.createConnection({
        host: "127.0.0.1", // Endereço do banco
        port: 3306, // Porta do banco
        user: "root", // Usuário
        password: "T6A9A6p7*", // Senha
        database: "test_nextjs_schema", // Nome do banco
      });

      // Inserção de dados no banco
      const [result] = await connection.execute(
        "INSERT INTO users (s_nome_user, email_user , senha_user , position_latitude , position_longitude, concurso, primeiro_login_date,primeiro_login_hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [s_nome_user, email_user , senha_user , position_latitude , position_longitude, concurso, primeiro_login_date,primeiro_login_hour]
      );

      // Fechando conexão
      await connection.end();

      
      // Resposta de sucesso
      res.status(200).json({
        id: result.insertId,
        s_nome_user,
        email_user ,
        senha_user ,
        position_latitude ,
        position_longitude, 
        concurso, 
        primeiro_login_date,
        primeiro_login_hour
      });
    } catch (error) {
      console.error("Erro ao conectar ao banco: ", error.message);
      res.status(500).json({ error: "Erro ao salvar os dados" });
    }
  } else {
    // Método não permitido
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
