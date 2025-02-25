from django.shortcuts import render
from django.http import JsonResponse
from transformers import AutoModelForCausalLM, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")


# Function to chat with the model
def chat(input_text):
    # Encode the input and add EOS token (end of sentence)
    new_user_input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt')

    # Generate a response from the model
    bot_input_ids = new_user_input_ids
    chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    # Decode the model's response and return
    bot_response = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)

    return bot_response

def chatbot_query(request):
    query = request.GET['query']
    res = chat(query)
    return JsonResponse(res, safe=False)

def chatbot(request):
    return render(request, 'chatbot.html')
    # Create your views here.

