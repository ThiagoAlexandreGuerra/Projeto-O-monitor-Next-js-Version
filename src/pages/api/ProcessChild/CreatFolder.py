import sys
import json
from pathlib import Path

# Lê os dados do stdin
try:
    input_data = sys.stdin.read()
    data = json.loads(input_data)  # Converte o JSON recebido para um objeto Python
    user_public_key = data[0]['i_user_user']  # Adapta ao formato esperado
except Exception as e:
    print(f"Erro ao processar entrada: {e}")
    sys.exit(1)

def creatDirectoryToUser(FolderContentName):
    base_directory = Path("C:/Users/thiag/OneDrive/Documentos/Aprendendo_nextjs/aprendendo_next_js/src/MensageUsers")
    full_path = base_directory / FolderContentName

    if not full_path.exists():
        full_path.mkdir(parents=True)
        print(f"Pasta '{FolderContentName}' criada com sucesso.")
    else:
        print(f"Pasta '{FolderContentName}' já existe.")

    subfolders = ["MensageRecevied", "MensageSend", "ImageUser"]
    for subfolder in subfolders:
        subfolder_path = full_path / subfolder
        if not subfolder_path.exists():
            subfolder_path.mkdir()
            print(f"Subpasta '{subfolder}' criada com sucesso.")
        else:
            print(f"Subpasta '{subfolder}' já existe.")

try:
    creatDirectoryToUser(user_public_key)
    print("Diretório criado com sucesso.")
    sys.exit(0)
except Exception as e:
    print(f"Erro ao criar diretório: {e}")
    sys.exit(1)
