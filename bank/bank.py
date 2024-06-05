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

addresses = requests.get('http://localhost:4100/address').json()
print(addresses)
for address in addresses:
    choose = random.randint(0, 10)
    
    if choose > 3:
        print('Escolhido!')
        value = random.randint(10, 200)
        
        print(f'Stackando {value} moedas em {address["address"]}')
        payload = {"address": address["address"], "value": value}
        print(payload)
        res = requests.put('http://localhost:4100/address', json=payload, headers={"Content-type": "application/json"})
        
        if res.status_code != 200 and res.status_code != 201:
            print(f'error {res.status_code}')
            break
        
        payload = {"address": address['address']}
        res = requests.post('http://localhost:4100/validator', json=payload, headers={"Content-type": "application/json"})
        
        if res.status_code != 200 and res.status_code != 201:
            print(f'error creating validator {res.status_code}')
            break