```python id="m7k4qy"
import requests

url = "http://localhost:3000/api/data"

for i in range(10):

    response = requests.post(
        url,
        json={
            "message": f"attack-{i}"
        }
    )

    print(i + 1, response.status_code)
```
