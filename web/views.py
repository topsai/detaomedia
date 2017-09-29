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


def master(request):
    data = models.Master.objects.all()
    return render(request, 'master.html', {"data": data})


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
    return render(requesr, "news.html")


def new1(requesr):
    return render(requesr, "new1.html")


def maps(requesr):
    return render(requesr, "map.html")


import os
import time

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def handle_uploaded_file(f):
    f = f.get('avatar')
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
