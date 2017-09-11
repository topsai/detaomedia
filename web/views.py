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
