from django.urls import path
from . import views

urlpatterns = [
    path('chatbot/', views.chatbot, name='chatbot'),
    path('query/', views.chatbot_query, name='chatbot_query'),
]