import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

BASE_URL = "https://plant-care-ai-kappa.vercel.app"

def test_health():
    print("\n--- 1. Testing GET / ---")
    req = urllib.request.Request(f"{BASE_URL}/")
    with urllib.request.urlopen(req, context=ctx) as response:
        status = response.getcode()
        body = response.read().decode()
        print(f"Status: {status}")
        print(f"Body: {body}")
        assert status == 200

def test_register():
    print("\n--- 2. Testing POST /auth/register ---")
    payload = json.dumps({
        "full_name": "Test User",
        "email": f"test_{int(10000)}@example.com",
        "password": "Password123!"
    }).encode('utf-8')
    
    req = urllib.request.Request(
        f"{BASE_URL}/auth/register",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, context=ctx) as response:
        status = response.getcode()
        body = json.loads(response.read().decode())
        print(f"Status: {status}")
        print(f"Token: {body.get('access_token')[:25]}...")
        print(f"User: {body.get('user')}")
        assert status == 201
        return body.get('access_token')

def test_login(token):
    print("\n--- 3. Testing POST /auth/login ---")
    payload = json.dumps({
        "email": f"test_{int(10000)}@example.com",
        "password": "Password123!"
    }).encode('utf-8')
    
    req = urllib.request.Request(
        f"{BASE_URL}/auth/login",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, context=ctx) as response:
        status = response.getcode()
        body = json.loads(response.read().decode())
        print(f"Status: {status}")
        print(f"Token: {body.get('access_token')[:25]}...")
        assert status == 200

def test_plants(token):
    print("\n--- 4. Testing POST /plants & GET /plants ---")
    payload = json.dumps({
        "name": "Monstera Deliciosa",
        "plant_type": "Indoor Foliage",
        "scientific_name": "Monstera deliciosa",
        "description": "Swiss Cheese Plant in living room",
        "location": "Living Room Window",
        "category": "Tropical"
    }).encode('utf-8')

    req = urllib.request.Request(
        f"{BASE_URL}/plants",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }
    )
    with urllib.request.urlopen(req, context=ctx) as response:
        status = response.getcode()
        body = json.loads(response.read().decode())
        print(f"Created Plant Status: {status}")
        print(f"Created Plant: {body}")
        assert status == 201
        plant_id = body.get('id')

    # Get dashboard
    req_dash = urllib.request.Request(
        f"{BASE_URL}/plants/dashboard",
        headers={"Authorization": f"Bearer {token}"}
    )
    with urllib.request.urlopen(req_dash, context=ctx) as response:
        print(f"Dashboard: {response.read().decode()}")

if __name__ == "__main__":
    try:
        test_health()
        token = test_register()
        test_login(token)
        test_plants(token)
        print("\n ALL LIVE API TESTS PASSED SUCCESSFULLY!")
    except Exception as e:
        print(f"\n❌ Error during test: {e}")
