import requests
import base64

# Read and encode image
with open('./examples/spot1.jpg', 'rb') as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

# Prepare payload
payload = {
    'image': encoded_image
}

# Print waiting message
print('Waiting for response...')

# Send request to the Flask server
response = requests.post('http://localhost:5000/analyze', json=payload)

# Print response
print(response.json())
