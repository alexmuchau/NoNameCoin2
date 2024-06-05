## Bank that send the transactions
import requests
import json
import random

# payload = {
#     "transaction": {
#         "by": '134gas143ygvaa',
#         "to": '21t4gabxzc4316',
#         "value": 250.0
#     }
# }

# headers = {
#     'Content-type': 'application/json'
# }

# res = requests.post('http://localhost/selector', json=payload, headers=headers)

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