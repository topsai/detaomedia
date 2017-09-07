from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def test(request):
    return render(request, 'test.html')


def master(request):
    return render(request, 'master.html')


def product(request):
    return render(request, 'product.html')
