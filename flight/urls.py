from django.urls import path
from . import views

urlpatterns = [
    path("query/places/<str:q>", views.query, name="query"),
    path("flight", views.flight, name="flight"),
    path("booking", views.book, name="book"),
    path("payment", views.payment, name="payment"),
    path("result", views.result, name="result"),
    path('success/', views.success, name='success'),



]
