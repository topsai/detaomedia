from django.shortcuts import render
import subprocess

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