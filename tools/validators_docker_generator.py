pat_str = """
  validator_server_{num}:
    build: './validator_server/dockerfile'
    ports:
      - '41{num}:4101'
    environment:
      - HOST="validator_server_{num}:41{num}"
"""

for i in range(2, 20):
    print(pat_str.format(num=f'{i:02}'))