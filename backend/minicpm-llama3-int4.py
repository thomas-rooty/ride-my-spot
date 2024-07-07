from PIL import Image
from transformers import AutoModel, AutoTokenizer

# Load model and tokenizer
model = AutoModel.from_pretrained('openbmb/MiniCPM-Llama3-V-2_5-int4', trust_remote_code=True)
tokenizer = AutoTokenizer.from_pretrained('openbmb/MiniCPM-Llama3-V-2_5-int4', trust_remote_code=True)
model.eval()

# Load and process image
image_path = './examples/spot1.jpg'  # Update the path as needed
image = Image.open(image_path).convert('RGB')
question = '''Please analyze the bicycle street trial sport potential of the following location based on the image. Identify and evaluate features like stairs, ledges, benches that are useful for performing street trial tricks. Provide a suitability rating for street trial riders based on how many structures are available. Don't hesitate to be critique as the rider already has a good level. Return the information in JSON format like this and nothing else :

{
stairs: boolean,
benches: boolean,
ledges: boolean,
overall_score: float from 1 to 10
}
'''

msgs = [{'role': 'user', 'content': question}]

# Use synchronous method for chat
res = model.chat(
    image=image,
    msgs=msgs,
    tokenizer=tokenizer,
    sampling=True,
    temperature=0.7,
)
print(res)
