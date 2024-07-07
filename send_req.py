import requests
import base64
import re

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

# Extract JSON part using regular expressions
json_match = re.search(r'\{[^}]+\}', response.text)

if json_match:
    json_string = json_match.group()
    # Format it nicely
    json_string = json_string.replace('},', '},\n')
    print(json_string)
else:
    print("No JSON found in the response.")
