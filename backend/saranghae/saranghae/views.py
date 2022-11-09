from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .api import test_tour_api
from .models import Test
from .serializer import TestSerializer

# tourAPI example
def index(request):
    res = test_tour_api()
    overview = res
    context = {'overview': overview} 
    return render(request, 'index.html', context)  

# privacy policy html
def privacy_policy(request):
    return render(request, 'privacy_policy.html')  

# get example
@api_view(['GET'])
def get_test(request):
    tests = Test.objects.all() # == select * from Test
    serailized_test= TestSerializer(tests, many=True)
    return Response(serailized_test.data)

# para example
@api_view(['GET'])
def get_para_test(request):
    title = request.GET.get('title')
    tests = Test.objects.filter(title=title)
    serailized_test= TestSerializer(tests, many=True)
    return Response(serailized_test.data)


# post example
@api_view(['POST'])
def post_test(request):
    if request.method == 'GET':
        return HttpResponse(status=200)
    if request.method == 'POST':
        serializer = TestSerializer(data = request.data, many=True)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data ,status=200)
        return Response(serializer.errors ,status=status.HTTP_400_BAD_REQUEST)
