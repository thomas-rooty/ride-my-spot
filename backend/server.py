from flask import Flask, request, jsonify
from PIL import Image
import base64
from io import BytesIO
from transformers import AutoModel, AutoTokenizer
import torch

app = Flask(__name__)

# Check if CUDA is available
if torch.cuda.is_available():
    print('CUDA is available.')
    # Print CUDA version
    print(torch.version.cuda)
    # Print devices
    print(torch.cuda.get_device_name(0))
else:
    print('CUDA is not available.')

# Load model and tokenizer
model = AutoModel.from_pretrained('openbmb/MiniCPM-Llama3-V-2_5-int4', trust_remote_code=True)
tokenizer = AutoTokenizer.from_pretrained('openbmb/MiniCPM-Llama3-V-2_5-int4', trust_remote_code=True)
model.eval()

@app.route('/analyze', methods=['POST'])
def analyze_image():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    # Decode base64 image
    image_data = base64.b64decode(data['image'])
    image = Image.open(BytesIO(image_data)).convert('RGB')

    question = '''Please analyze the bicycle street trial sport potential of the following location based on the image. Identify and evaluate features like stairs, ledges, benches that are useful for performing street trial tricks. Provide a suitability rating for street trial riders based on how many structures are available. Don't hesitate to be critique as the rider already has a good level. Return the information in JSON format like this and nothing else :

    {
    stairs: boolean,
    benches: boolean,
    ledges: boolean,
    overall_score: float from 1 to 10
    }
    '''

    msgs = [{'role': 'user', 'content': question}]

    res = model.chat(
        image=image,
        msgs=msgs,
        tokenizer=tokenizer,
        sampling=True,
        temperature=0.7,
    )

    json_res = jsonify(res)
    return json_res


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
