"""detaomedia URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from web.views import *
from background.views import login, ttt

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', index),
    url(r'^about/$', about),
    url(r'^test/$', test),
    url(r'^master/$', master),
    url(r'^master/get_items$', master_getitems),
    url(r'^master/(\d+)/$', resume),
    url(r'^product/(\d?)', product),
    url(r'^partner/$', partner),
    url(r'^joinus/$', joinus),
    url(r'^data/$', data),
    url(r'^contact/$', contact),
    url(r'^news/$', news),
    url(r'^news/(\d+)/$', news_detail),
    url(r'^map/$', maps),
    url(r'^login/$', login),
    url(r'^ttt/$', ttt),
    url(r'^backend/', include('background.urls')),
]
