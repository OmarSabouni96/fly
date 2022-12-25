# from datetime import datetime
from datetime import datetime, timedelta, date

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import *

    
from django.urls import reverse

import iyzipay
import json
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.http import require_http_methods

# Create your views here.


@csrf_exempt

def index(request):
    min_date = f"{datetime.now().date().year}-{datetime.now().date().month}-{datetime.now().date().day}"
    depart_date = request.POST.get('DepartDate')

    if request.method == 'POST':
        depart_date = request.POST.get('DepartDate')

    else:
        return render(request, 'index.html', {
                    'depart_date': depart_date,
                })



def query(request, q):
    places = Place.objects.all()
    filters = []
    q = q.lower()
    # print(q)
    # print(places)
    for place in places:
        if (q in place.city.lower()) or (q in place.airport.lower()) or (q in place.code.lower()) or (q in place.country.lower()):
            filters.append(place)
    return JsonResponse([{'code':place.code, 'city':place.city, 'country': place.country} for place in filters], safe=False)


def flight(request):

    from_user = request.GET.get('Origin')
    from_data = Place.objects.get(code=from_user.upper())

    to_user = request.GET.get('Destination')
    to_data = Place.objects.get(code=to_user.upper())

    dep_date_user = request.GET.get('DepartDate')
    depart_date_user = datetime.strptime(dep_date_user, "%Y-%m-%d")
    # depart_date_user = datetime.strptime(dep_date_user, "%d-%m-%Y")

    return_date_user = None
    ret_date_user = None
    flight_info_return = None

    trip_type = request.GET.get('TripType')

    adult_num = int(request.GET.get('Adult'))
    child_num = int(request.GET.get('Child'))
    infant_num = int(request.GET.get('Infant'))
    total_passengers = adult_num + child_num + infant_num


    min_date = f"{datetime.now().date().year}-{datetime.now().date().month}-{datetime.now().date().day}"


    today = date.today()
    d1 = today.strftime("%Y-%m-%d")


    if d1 <= dep_date_user:
        # flight_info = Flight.objects.filter(origin=from_data, destination=to_data, depart_date__range= [min_date, depart_date_user])
        flight_info = Flight.objects.filter(origin=from_data, destination=to_data, depart_date=  depart_date_user)
    else:
        flight_info = None
        

    base = datetime.today().date()
    date_list = [base + timedelta(days=x) for x in range(15)]


    flight_info_bar = []
    flight_info_return_bar = []


    for i in range(15):
        try:
            c = Flight.objects.get(origin=from_data, destination=to_data, depart_date = date_list[i] )
            flight_info_bar.append(c)

        except:
            a = Flight.objects.filter(origin=from_data, destination=to_data, depart_date = date_list[i]).order_by("economy_fare").first()
            flight_info_bar.append(a)


        
    if trip_type == '2':
        ret_date_user = request.GET.get('ReturnDate')
        return_date_user = datetime.strptime(ret_date_user, "%Y-%m-%d")

        date_return_list = [depart_date_user + timedelta(days=x) for x in range(15)]

        for i in range(15):

            try:
                c = Flight.objects.get(origin=to_data, destination=from_data, depart_date = date_return_list[i] )
                flight_info_return_bar.append(c)

            except:
                a = Flight.objects.filter(origin=to_data, destination=from_data, depart_date = date_return_list[i]).order_by("economy_fare").first()
                flight_info_return_bar.append(a)

        if dep_date_user <= ret_date_user:
            flight_info_return = Flight.objects.filter(origin=to_data, destination=from_data, depart_date = return_date_user)

        else:
            flight_info_return = None





    flight_data = {
        "from_data":from_data,
        "to_data":to_data,
        "depart_date_user":depart_date_user,
        "trip_type":trip_type,
        "return_date_user":return_date_user,
        "flight_info":flight_info,
        "adult_num":adult_num,
        "child_num":child_num,
        "infant_num":infant_num,
        "flight_info_return":flight_info_return,
        "flight_info_bar":flight_info_bar,
        "total_passengers":total_passengers,
        "ret_date_user":ret_date_user,
        "flight_info_return_bar":flight_info_return_bar,
        "dep_date_user":dep_date_user,
        }



    return render(request, "flight/search.html",flight_data)


def book(request):
    if request.method == 'GET':
        flight_id_origin = request.GET.get('FlightID_origin')
        x = flight_id_origin.split("|")
        flight_id_origin = x[0]
        chosen_price = int(float(x[1]))
        flight_origin = Flight.objects.get(id=flight_id_origin)
        flight_destination = None

        adult_num = int(request.GET.get('Adult_num'))
        adult_list = list(range(0,adult_num))

        child_num = int(request.GET.get('Child_num'))
        child_list = list(range(0,child_num))

        infant_num = int(request.GET.get('Infant_num'))
        infant_list = list(range(0,infant_num))

        chosen_price = chosen_price*adult_num

        if request.GET.get('FlightID_destination'):
            flight_id_destination = request.GET.get('FlightID_destination')
            
            try:
                y = flight_id_destination.split("|")
                flight_id_destination = y[0]
                chosen_price_return = int(float(y[1]))
                flight_destination = Flight.objects.get(id=flight_id_destination)
            except:
                flight_destination = None
                chosen_price_return = 0

            chosen_price_return = chosen_price_return*adult_num
            chosen_price += chosen_price_return


        return render(request, "flight/booking.html", {
            'flight_origin': flight_origin,
            'flight_destination': flight_destination,
            'adult_list': adult_list,
            'child_list': child_list,
            'infant_list': infant_list,

            'chosen_price': chosen_price,

            })



# def payment(request):
#     # from booking page

#     return render(request, "flight/payment.html")
api_key = 'sandbox-IjWAOjhx9eUOom8xvQFfHCOKugoJG0ka'
secret_key = 'sandbox-9O38pqagREHXQMZj2D26irV9FzR9eRsk'
base_url = 'sandbox-api.iyzipay.com'


options = {
    'api_key': api_key,
    'secret_key': secret_key,
    'base_url': base_url
}
sozlukToken = list()



# @require_http_methods(['POST'])
@csrf_exempt
def payment(request):
    context = dict()
    
    price = request.POST.get('price')
    print(price)
    print("0000000-----")
    buyer={
        'id': 'BY789',
        'name': 'John',
        'surname': 'Doe',
        'gsmNumber': '+905350000000',
        'email': 'email@email.com',
        'identityNumber': '74300864791',
        'lastLoginDate': '2015-10-05 12:43:35',
        'registrationDate': '2013-04-21 15:12:09',
        'registrationAddress': 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        'ip': '85.34.78.112',
        'city': 'Istanbul',
        'country': 'Turkey',
        'zipCode': '34732'
    }

    address={
        'contactName': 'Jane Doe',
        'city': 'Istanbul',
        'country': 'Turkey',
        'address': 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        'zipCode': '34732'
    }

    basket_items=[
        {
            'id': 'BI101',
            'name': 'Binocular',
            'category1': 'Collectibles',
            'category2': 'Accessories',
            'itemType': 'PHYSICAL',
            'price': '0.3'
        },
        {
            'id': 'BI102',
            'name': 'Game code',
            'category1': 'Game',
            'category2': 'Online Game Items',
            'itemType': 'VIRTUAL',
            'price': '0.5'
        },
        {
            'id': 'BI103',
            'name': 'Usb',
            'category1': 'Electronics',
            'category2': 'Usb / Cable',
            'itemType': 'PHYSICAL',
            'price': '0.2'
        }
    ]

    request={
        'locale': 'EN',
        'conversationId': '123456789',
        'price': '1',
        'paidPrice': price,
        'currency': 'USD',
        'basketId': 'B67832',
        'paymentGroup': 'PRODUCT',
        "callbackUrl": "http://127.0.0.1:8000/result",     
        # "callbackUrl": "flight/result.html", 

        # "enabledInstallments": ['2', '3', '6', '9'],
        'buyer': buyer,
        'shippingAddress': address,
        'billingAddress': address,
        'basketItems': basket_items,
        # 'debitCardAllowed': True,
    }

    checkout_form_initialize = iyzipay.CheckoutFormInitialize().create(request, options)

    #print(checkout_form_initialize.read().decode('utf-8'))
    page = checkout_form_initialize
    header = {'Content-Type': 'application/json'}
    content = checkout_form_initialize.read().decode('utf-8')
    json_content = json.loads(content)
    print(type(json_content))
    print(json_content["checkoutFormContent"])
    print("************************")
    print(json_content["token"])
    print("************************")
    sozlukToken.append(json_content["token"])
    return HttpResponse(json_content["checkoutFormContent"])



@csrf_exempt
def result(request):
    context = dict()

    url = request.META.get('index')

    request = {
        'locale': 'En',
        'conversationId': '123456789',
        'token': sozlukToken[0]
    }
    checkout_form_result = iyzipay.CheckoutForm().retrieve(request, options)
    print("************************")
    print(type(checkout_form_result))
    result = checkout_form_result.read().decode('utf-8')
    print("************************")
    print(sozlukToken[0])   # Form oluşturulduğunda
    print("************************")
    print("************************")
    sonuc = json.loads(result, object_pairs_hook=list)
    #print(sonuc[0][1])  # İşlem sonuç Durumu dönüyor
    #print(sonuc[5][1])   # Test ödeme tutarı
    print("************************")
    for i in sonuc:
        print(i)
    print("************************")
    print(sozlukToken)
    print("************************")
    if sonuc[0][1] == 'success':
        context['success'] = 'Success, Well done baby'
        return HttpResponseRedirect(reverse('success'), context)

    elif sonuc[0][1] == 'failure':
        context['failure'] = 'Başarısız'
        return HttpResponseRedirect(reverse('failure'), context)

    return HttpResponse(url)


@csrf_exempt
def success(request):
    context = dict()
    context['success'] = 'Success, Well done baby'

    template = 'ok.html'
    return render(request, template, context)

@csrf_exempt
def fail(request):
    context = dict()
    context['fail'] = 'İşlem Başarısız'

    template = 'fail.html'
    return render(request, template, context)



