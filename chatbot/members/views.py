from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from transformers import AutoModelForCausalLM, AutoTokenizer
import json
import os

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# Function to chat with the model
def chat(request):
    input_text = request.GET.get('query')

    if not input_text:
        return JsonResponse({"error": "No input provided"}, status=400)

    # Encode the input and add EOS token (end of sentence)
    new_user_input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt')

    # Generate a response from the model
    chat_history_ids = model.generate(new_user_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    # Decode the model's response
    bot_response = tokenizer.decode(chat_history_ids[:, new_user_input_ids.shape[-1]:][0], skip_special_tokens=True)

    # Return the response as JSON
    return JsonResponse({"response": bot_response})

def get_api_key(request):
    try:
        # Load the api_key.json file
        with open(os.path.join(settings.BASE_DIR, 'secrets', 'api_key.json'), 'r') as f:
            data = json.load(f)
            api_key = data.get('api_key')
            return JsonResponse({'apiKey': api_key})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def chatbot(request):
    return render(request, 'chatbot.html')
    # Create your views here.