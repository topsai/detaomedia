from rest_framework import routers
from django.conf.urls import url, include
from django.contrib import admin
from web.views import *
from background.views import login, ttt




# 使用自动URL路由连接我们的API。
# 另外，我们还包括支持浏览器浏览API的登录URL。
router = routers.DefaultRouter()
router.register(r'enterprise', EnterpriseViewSet)
router.register(r'master', MasterViewSet)
router.register(r'field', FeildViewSet)
router.register(r'nationality', NationalityViewSet)
# router.register(r'groups', views.GroupViewSet)
from django.views.generic import TemplateView
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    url(r'^$', index),
    url(r'^about/$', about),
    url(r'^test/$', TemplateView.as_view(template_name="testvue.html")),
    url(r'^master/$', master),
    url(r'^master/get_items$', master_getitems),
    url(r'^master/get_filter$', master_getfilter),
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
