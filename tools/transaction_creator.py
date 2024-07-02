import requests
import random
from datetime import datetime

addresses = requests.get('http://localhost:4100/address').json()

for i in range(0, 20):
    sender = addresses[random.randint(0, len(addresses) - 1)]["address"]
    while (receiver := addresses[random.randint(0, len(addresses) - 1)]["address"]) == sender:
        pass
    
    payload = {
        "remetente": sender,
        "recebedor": receiver,
        "valor": random.randint(0, 100),
        "horario": datetime.now().isoformat()
    }
    
    print(f"[{payload['horario']}] ({i}) - {sender} -> {receiver} | Mandando {payload['valor']} moedas")
    res = requests.post('http://localhost:4100/trans', json=payload, headers={"Content-type": "application/json"})