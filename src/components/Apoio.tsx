const pythonProcess = spawn('python', ['./src/pages/api/ProcessChild/CreatFolder.py']);

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
  