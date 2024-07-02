## Bank that send the transactions
import requests
import random

validators = requests.get('http://localhost:4100/seletor/validadores').json()
for validator in validators:
    choose = random.randint(0, 10)
    
    if choose > 3:
        print('Escolhido!')
        value = random.randint(10, 200)
        
        print(f'Stackando {value} moedas em {validator["validator_id"]}')
        payload = {"validator_id": validator["validator_id"], "value": value}
        print(payload)
        res = requests.put('http://localhost:4100/validator', json=payload, headers={"Content-type": "application/json"})
        
        if res.status_code != 200 and res.status_code != 201:
            print(f'error {res.status_code}')
            break

addresses = requests.get('http://localhost:4100/address').json()
for address in addresses:
    choose = random.randint(0, 10)
    
    if choose > 3:
        print('Escolhido!')
        value = random.randint(10, 10000)
        
        print(f'Alocando {value} moedas em endereço {address["address"]}')
        payload = {"address": address["address"], "value": value}
        print(payload)
        res = requests.put('http://localhost:4100/address', json=payload, headers={"Content-type": "application/json"})
        
        if res.status_code != 200 and res.status_code != 201:
            print(f'error {res.status_code}')
            break