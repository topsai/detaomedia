from django.shortcuts import render, HttpResponse
import subprocess
from web import models


# Create your views here.
def index(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


import json


def test(request):
    if request.method == "GET":
        return render(request, 'test.html')
    else:
        print(request.POST)
        print(request.FILES)
        ret = handle_uploaded_file(request.FILES)
        date = {"status": "ok", "data": ret}
        return HttpResponse(json.dumps(date))


from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core import serializers


def master_getitems(request):
    # data = serializers.serialize("json", SomeModel.objects.all())
    # data1 = serializers.serialize("json", SomeModel.objects.filter(myfield1=myvalue))
    page = request.GET.get('page')
    try:
        page = int(page)
    except:
        page = 1
    page += page
    start = (page-1)*6
    end = page*6
    # 0-6, 6-12, 12-18
    data = models.Master.objects.all().values_list(
        'id', 'chinese_name', 'actual_name', 'introduction', 'avatar'
    )[start:end]
    data = list(data)
    print(data)
    return HttpResponse(json.dumps(data))


def master(request):
    data = models.Master.objects.all()[:6]
    field = models.Field.objects.all()
    nationality = models.Nationality.objects.all()
    # paginator = Paginator(data, 6)  # Show 25 contacts per page
    # page = request.GET.get('page', 1)
    # try:
    #     contacts = paginator.page(page)
    # except PageNotAnInteger:
    #     # If page is not an integer, deliver first page.
    #     contacts = paginator.page(1)
    # except EmptyPage:
    #     # If page is out of range (e.g. 9999), deliver last page of results.
    #     contacts = paginator.page(paginator.num_pages)

    return render(request, 'master.html',
                  {"data": data, 'field': field, 'nationality': nationality, })


def resume(request, mid):
    print(mid)
    data = models.Master.objects.get(id=mid)
    return render(request, 'resume.html', {"data": data})


def product(request, i):
    if not i:
        i = '1'
    if i in ['1', '2', '3', '4', '5']:
        return render(request, 'product{}.html'.format(i))


def update(request):
    if request.method == 'POST':
        # github的钩子被触发了
        data = request.POST
        # log.debug(data)
        p = subprocess.Popen('. /Arduino/conf/update', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        p.stdout.encoding = 'utf8'
        # if p.stdout:
        #     log.debug('更新成功', p.stdout.read())
        # else:
        #     log.debug('更新失败', p.stderr.read())


def partner(requesr):
    return render(requesr, "partner.html")


def joinus(requesr):
    return render(requesr, "joinus.html")


def data(requesr):
    return render(requesr, "data.html")


def contact(requesr):
    return render(requesr, "contact.html")


def news(requesr):
    data = models.News.objects.all()
    return render(requesr, "news.html", {'obj': data})


def news_detail(requesr, id):
    data = models.News.objects.get(id=id)
    return render(requesr, "new1.html", {'obj': data})


def maps(requesr):
    return render(requesr, "map.html")


import os
import time

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def handle_uploaded_file(f):
    f = f.get('images')
    # for i in dir(f):
    #     try:
    #         print(i, getattr(f, i))
    #     except:
    #         pass
    print(os.path.splitext(f.name)[1])
    print(BASE_DIR)

    file_name = time.strftime('%Y-%m-%d-%H%M%S', time.localtime(time.time()))
    last_name = os.path.splitext(f.name)[1]
    static_path = "static/testupfile/{}{}".format(file_name, last_name)
    path = os.path.join(BASE_DIR, static_path)
    print(path)
    with open(path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    print("file {} ok".format(path))
    return os.path.join('/', static_path)
