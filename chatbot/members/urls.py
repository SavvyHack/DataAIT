from django.urls import path
from . import views

urlpatterns = [
    path('chatbot/', views.chatbot, name='chatbot'),
    path('query/', views.chat, name='chat'),
    path('get-api-key/', views.get_api_key, name='get_api_key'),
]