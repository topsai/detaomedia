from django.db import models


# Create your models here.

class Master(models.Model):
    # 大师编号，用于排序
    sorting = models.IntegerField(verbose_name="大师编号", )
    # 头像
    # avatar = models.CharField(max_length=256)
    avatar = models.ImageField(upload_to='img')
    # 中文名
    chinese_name = models.CharField(max_length=256)
    # 本名
    actual_name = models.CharField(max_length=256)
    field = models.ForeignKey("Field")
    nationality = models.ForeignKey("Nationality")
    # 简介
    introduction = models.CharField(max_length=256)
    content = models.CharField(max_length=10000)


class Field(models.Model):
    field = models.CharField(max_length=256)


class Nationality(models.Model):
    nationality = models.CharField(max_length=256)


class News(models.Model):
    title = models.CharField(max_length=256)
    time = models.TimeField(auto_now_add=True)
    # 相关大师
    about = models.ManyToManyField("Master")
    contant = models.CharField(max_length=10000)
