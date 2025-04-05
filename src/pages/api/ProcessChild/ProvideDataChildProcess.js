import { spawn } from 'child_process';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { UserPublicKey } = req.body; // Dados enviados pelo cliente (via POST)

    // Verifique se a chave pública foi fornecida
    if (!UserPublicKey) {
        return res.status(400).json({ error: "UserPublicKey é obrigatório." });
    }

    // Caminho para o script Python
    const pythonScriptPath = 'src/pages/api/ProcessChild/CreatFolder.py';

    const pythonProcess = spawn('python', [pythonScriptPath, UserPublicKey]);

    let output = ""; // Armazena a saída do script

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Erro do script Python: ${data}`);
        res.status(500).send(`Erro do script Python: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Processo finalizado com código ${code}`);
        try {
            const result = JSON.parse(output); // Tenta converter a saída em JSON
            res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao processar a saída:", error);
            res.status(500).send("Erro ao processar a saída do script.");
        }
    });
}
