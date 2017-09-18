from django.db import models


# Create your models here.

class Master(models.Model):
    # 大师编号，用于排序
    sorting = models.IntegerField()
    # 头像
    avatar = models.CharField(max_length=256)
    # 中文名
    chinese_name = models.CharField(max_length=256)
    # 本名
    actual_name = models.CharField(max_length=256)
    # 简介
    introduction = models.CharField(max_length=256)
    content = models.CharField(max_length=10000)

