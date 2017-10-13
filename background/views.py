#!/usr/bin/env python
# -*- coding:utf-8 -*-
import os
import json
import uuid
import time
from django.shortcuts import render
from django.shortcuts import HttpResponse, Http404
from django.shortcuts import redirect
from django.db import transaction
from django.urls import reverse

from background.forms.article import MasterForm, FieldForm, NationalityForm, NewsForm, HotNewsForm

from django.contrib.auth.decorators import login_required
from web import models
from utils.pagination import Pagination
from utils.xss import XSSFilter
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate, login as login_user, get_user_model


def ttt(request):
    return render(request, 'background/tttt.html')


def login(request):
    if request.method == 'GET':
        form = AuthenticationForm()
        return render(request, "background/login.html", {'obj': form})

    elif request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login_user(request, form.get_user())
            # print(form.get_user(), type(form.get_user()))
            if '?next=' in request.get_full_path():
                return redirect('{}'.format(request.get_full_path().lstrip('/login/?next=')))
            else:
                return redirect('/backend/index.html/')
        else:
            return render(request, "background/login.html", {'obj': form})
    else:
        return Http404


@login_required
def index(request):
    return render(request, 'background/backend_index.html')


@login_required
def field(request):
    data = models.Field.objects.all()
    return render(request, 'background/field.html', {'data': data})


@login_required
def news(request):
    data = models.News.objects.all()
    return render(request, 'background/news.html', {'data': data})


@login_required
def hotnews(request):
    data = models.HotNews.objects.all()
    path = 'background/include/hotnews.html'
    # TODO 将增删改集中到一个页面
    return render(request, 'background/hotnews.html', {'data': data, 'path': path})


@login_required
def nationality(request):
    data = models.Nationality.objects.all()
    return render(request, 'background/nationality.html', {'data': data})


@login_required
def base_info(request):
    """
    博主个人信息
    :param request:
    :return:
    """
    if request.method == 'GET':
        data = models.UserInfo.objects.filter(nid=request.session.get('user_info').get('nid')).values(
            'nickname',
            'blog__site',
            'blog__theme',
            'blog__title',
            'avatar'
        ).first()
        print(data)
        obj = UserInfoForm(initial={
            'nickname': data.get('nickname'),
            'site': data.get('blog__site'),
            'theme': data.get('blog__theme'),
            'title': data.get('blog__title')
        })
        return render(request, 'backend_base_info.html', {'obj': obj})
    elif request.method == 'POST':
        # 修改用户信息
        obj = UserInfoForm(request.POST)
        if obj.is_valid():
            print(obj.cleaned_data)
            print(request.session.get('user_info'))
            nid = request.session.get('user_info').get('nid')
            data = models.UserInfo.objects.filter(nid=nid).first()
            data.nickname = request.POST.get('nickname')
            try:
                data.blog.site = request.POST.get('site')
                data.blog.theme = request.POST.get('theme')
                data.blog.title = request.POST.get('title')
                data.blog.save()
                request.session['user_info']['blog__site'] = request.POST.get('site')
            except:
                blog = models.Blog.objects.create(user=data,
                                                  site=request.POST.get('site'),
                                                  theme=request.POST.get('theme'),
                                                  title=request.POST.get('title'))
                request.session['user_info']['blog__nid'] = blog.nid
                request.session['user_info']['blog__site'] = blog.site

            data.save()
            request.session['user_info']['nickname'] = request.POST.get('nickname')
        return render(request, 'backend_base_info.html', {'obj': obj})


@login_required
def upload_avatar(request):
    ret = {'status': False, 'data': None, 'message': None}
    if request.method == 'POST':
        file_obj = request.FILES.get('avatar_img')
        print(file_obj)
        if file_obj:
            file_name = str(uuid.uuid4())
            file_path = os.path.join('static/imgs/avatar', file_name)
            f = open(file_path, 'wb')
            for chunk in file_obj.chunks():
                f.write(chunk)
            f.close()
            ret['status'] = True
            ret['data'] = file_path
            obj = models.UserInfo.objects.filter(nid=request.session.get('user_info').get('nid')).first()
            obj.avatar = '/' + file_path
            obj.save()
            request.session['user_info']['avatar'] = '/' + file_path
    return HttpResponse(json.dumps(ret))


@login_required
def tag(request):
    blog_id = request.session.get('user_info').get('blog__nid')
    """
    博主个人标签管理
    :param request:
    :return:
    article, article2tag, blog, blog_id, nid, title
    """
    if request.method == 'GET':
        obj = models.Tag.objects.filter(blog_id=blog_id).all()
        return render(request, 'backend_tag.html', {'obj': obj})
    elif request.method == 'POST':
        # request.POST.get('func')
        # tag增【0】删【1】改【2】
        func = request.POST.get('func')
        if func == '0':
            # 增加
            models.Tag.objects.create(title=request.POST.get('title'),
                                      blog_id=blog_id)
            obj = models.Tag.objects.filter(blog_id=blog_id).all()
            return render(request, 'backend_tag.html', {'obj': obj})
        elif func == '1':
            # 删除
            nid = request.POST.get('nid')
            try:
                assert models.Tag.objects.filter(nid=nid).delete()[0]
                ret = 'ok'
            except Exception as e:
                ret = 'err'
            return HttpResponse(ret)
        elif func == '2':
            # 修改
            print(request.POST)
            nid = request.POST.get('nid')
            title = request.POST.get('title')
            models.Tag.objects.filter(nid=nid).update(title=title)
            return HttpResponse('ok')
        else:
            return Http404


@login_required
def category(request):
    """
    博主个人分类管理
    :param request:
    :return:
    """

    blog_id = request.session.get('user_info').get('blog__nid')

    if request.method == 'GET':
        obj = models.Category.objects.filter(blog_id=blog_id).all()
        return render(request, 'backend_category.html', {'obj': obj})
    elif request.method == 'POST':
        # request.POST.get('func')
        # tag增【0】删【1】改【2】
        func = request.POST.get('func')
        if func == '0':
            # 增加
            models.Category.objects.create(title=request.POST.get('title'),
                                           blog_id=blog_id)
            obj = models.Category.objects.filter(blog_id=blog_id).all()
            return render(request, 'backend_category.html', {'obj': obj})
        elif func == '1':
            # 删除
            nid = request.POST.get('nid')
            try:
                assert models.Category.objects.filter(nid=nid).delete()[0]
                ret = 'ok'
            except Exception as e:
                ret = 'err'
            return HttpResponse(ret)
        elif func == '2':
            # 修改
            print(request.POST)
            nid = request.POST.get('nid')
            title = request.POST.get('title')
            models.Category.objects.filter(nid=nid).update(title=title)
            return HttpResponse('ok')
        else:
            return Http404


@login_required
def article(request, *args, **kwargs):
    """
    博主个人文章管理
    :param request:
    :return:
    """
    # blog_id = request.session['user_info']['blog__nid']
    # condition = {}
    # for k, v in kwargs.items():
    #     if v == '0':
    #         pass
    #     else:
    #         condition[k] = v
    # condition['blog_id'] = blog_id
    # data_count = models.Article.objects.filter(**condition).count()
    # page = Pagination(request.GET.get('p', 1), data_count)
    # result = models.Article.objects.filter(**condition).order_by('-nid').only('nid', 'title', 'blog').select_related(
    #     'blog')[page.start:page.end]
    result = models.Master.objects.all()
    # page_str = page.page_str(reverse('article', kwargs=kwargs))
    # category_list = models.Category.objects.filter(blog_id=blog_id).values('nid', 'title')
    # type_list = map(lambda item: {'nid': item[0], 'title': item[1]}, models.Article.type_choices)
    # kwargs['p'] = page.current_page
    ret = {'result': result,
           # 'page_str': page_str,
           # 'category_list': category_list,
           # 'type_list': type_list,
           # 'arg_dict': kwargs,
           # 'data_count': data_count
           }
    # print(result)

    return render(request, 'background/backend_article.html', ret)


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def handle_uploaded_file(f):
    print(os.path.splitext(f._name)[1])
    print(BASE_DIR)
    file_name = time.strftime('%Y-%m-%d-%H%M%S', time.localtime(time.time()))
    last_name = os.path.splitext(f._name)[1]
    static_path = "static/testupfile/{}{}".format(file_name, last_name)
    path = os.path.join(BASE_DIR, static_path)
    print(path)
    with open(path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    print("file {} ok".format(path))
    return os.path.join('/', static_path)


@login_required
def add_article(request):
    """
    添加文章
    :param request:
    :return:
    """
    if request.method == 'GET':
        form = MasterForm()
        return render(request, 'background/backend_add_article.html', {'form': form})
    elif request.method == 'POST':
        print(request.POST)
        form = MasterForm(request.POST, request.FILES)
        # print(request.FILES.get('avatar'))

        if form.is_valid():
            print('oooo')
            # static_path = handle_uploaded_file(request.FILES.get('avatar'))
            print('ok')
            print(form.cleaned_data)
            # data = dict(form.cleaned_data)
            # data['field_id'] = data.pop('field')
            # data['nationality_id'] = data.pop('nationality')
            # print(data)
            # data['avatar'] = static_path
            # print(data)
            ret = models.Master.objects.create(**form.cleaned_data)
            print(ret)
            return redirect('/backend/article-0-0.html')
        else:
            print('err', form.errors)
            return render(request, 'background/backend_add_article.html', {'form': form})
    else:
        return redirect('/')


@login_required
def add_news(request):
    if request.method == 'GET':
        form = NewsForm()
        return render(request, 'background/backend_add_news.html', {'form': form})
    elif request.method == 'POST':
        print('post')
        print(request.POST)
        form = NewsForm(request.POST)
        if form.is_valid():

            about = form.cleaned_data.pop('about_id')
            print(form.cleaned_data)
            ret = models.News.objects.create(**form.cleaned_data)
            print(ret)
            return redirect('/backend/news.html')
        else:
            return render(request, 'background/backend_add_news.html', {'form': form})
    else:
        return redirect('/')


@login_required
def add_hotnews(request):
    print(request.path)
    if request.method == 'GET':
        form = HotNewsForm()
        return render(request, 'background/backend_add_news.html', {'form': form})
    elif request.method == 'POST':
        form = HotNewsForm(request.POST)
        if form.is_valid():
            ii = form.cleaned_data.get('new_id')
            print(ii, type(ii))
            models.HotNews.objects.create(**form.cleaned_data)
            return redirect('/backend/hotnews.html')
        else:
            return render(request, 'background/backend_add_news.html', {'form': form})
    else:
        return redirect('/')


@login_required
def add_field(request):
    if request.method == 'GET':
        form = FieldForm()
        return render(request, 'background/backend_add_field.html', {'form': form})
    elif request.method == 'POST':
        form = FieldForm(request.POST)
        if form.is_valid():
            ret = models.Field.objects.create(**form.cleaned_data)
            return redirect('/backend/field.html')
        else:
            return render(request, 'background/backend_add_field.html', {'form': form})
    else:
        return redirect('/')


@login_required
def add_nationality(request):
    if request.method == 'GET':
        form = NationalityForm()
        return render(request, 'background/backend_add_nationality.html', {'form': form})
    elif request.method == 'POST':
        form = NationalityForm(request.POST)
        if form.is_valid():
            ret = models.Nationality.objects.create(**form.cleaned_data)
            return redirect('/backend/nationality.html')
        else:
            return render(request, 'background/backend_add_nationality.html', {'form': form})
    else:
        return redirect('/')


@login_required
def edit_article(request, nid):
    if request.method == 'GET':
        obj = models.Master.objects.filter(id=nid).values().first()
        print(obj)
        if not obj:
            return render(request, 'background/backend_no_article.html')
        form = MasterForm(obj)
        return render(request, 'background/backend_edit_article.html', {'form': form, 'nid': nid})
    elif request.method == 'POST':
        form = MasterForm(data=request.POST)
        if form.is_valid():
            obj = models.Master.objects.filter(id=nid).values().first()
            if not obj:
                return render(request, 'background/backend_no_article.html')
            with transaction.atomic():
                # content = form.cleaned_data.pop('content')
                # content = XSSFilter().process(content)
                # tags = form.cleaned_data.pop('tags')
                models.Master.objects.filter(id=nid).update(**form.cleaned_data)
                # models.ArticleDetail.objects.filter(article=obj).update(content=content)
                # models.Article2Tag.objects.filter(article=obj).delete()
                # tag_list = []
                # for tag_id in tags:
                #     tag_id = int(tag_id)
                #     tag_list.append(models.Article2Tag(article_id=obj.nid, tag_id=tag_id))
                # models.Article2Tag.objects.bulk_create(tag_list)
            return redirect('/backend/article-0-0.html')
        else:
            print(form.errors)
            return render(request, 'background/backend_edit_article.html', {'form': form, 'nid': nid})
