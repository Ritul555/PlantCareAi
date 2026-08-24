import urllib.request
import json
import time

url = 'https://plantcareai-06fa.onrender.com/scan'
boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
image_data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xfc\xcf\xc0\x00\x00\x03\x01\x01\x00\x18\xdd\x8d\xb0\x00\x00\x00\x00IEND\xaeB\x60\x82' + b'A' * 100

body = (
    f'--{boundary}\r\n'
    f'Content-Disposition: form-data; name="image"; filename="test.png"\r\n'
    f'Content-Type: image/png\r\n\r\n'
).encode('utf-8') + image_data + f'\r\n--{boundary}--\r\n'.encode('utf-8')

req = urllib.request.Request(url, data=body, method='POST')
req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')

try:
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode())
        print('SUCCESS!')
        print(f'Plant Name: {result.get("plant_name")}')
        print(f'Health Status: {result.get("health_status")}')
        print(f'Explanation: {result.get("ai_explanation")}')
except urllib.error.HTTPError as e:
    print(f'HTTP Error: {e.code}')
    print(e.read().decode())
except Exception as e:
    print(f'Error: {e}')
