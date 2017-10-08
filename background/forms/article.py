#!/usr/bin/env python
# -*- coding:utf-8 -*-

from django.core.exceptions import ValidationError
from django import forms as django_forms
from django.forms import fields as django_fields
from django.forms import widgets as django_widgets

from web import models


class MasterForm(django_forms.Form):
    sorting = django_fields.IntegerField(
        widget=django_widgets.NumberInput(attrs={'class': 'form-control', 'placeholder': '大师序号'}, ),
        label="大师序号",
    )
    avatar = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '大师头像'}),
        label='大师头像',

        # widget=django_widgets.
    )
    chinese_name = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '中文名', 'rows': '3'}),
        label='中文名',
    )
    actual_name = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '本名', }),
        label='本名',
    )
    field = django_fields.ChoiceField(
        widget=django_widgets.Select(attrs={'class': 'form-control',}),
        label='领域',
        # widget=django_widgets.Select(choices=((1,'上海'),(2,'北京'),))
    )
    nationality = django_fields.MultipleChoiceField(
        widget=django_widgets.Select(attrs={'class': 'form-control', }),
        label='国籍',
    )
    introduction = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '简介', 'rows': '3'}),
        label='简介',
    )
    content = django_fields.CharField(
        widget=django_widgets.Textarea(attrs={'class': 'kind-content'}),
        label='内容',
    )

    def __init__(self, *args, **kwargs):
        super(MasterForm, self).__init__(*args, **kwargs)
        self.fields['field'].choices = models.Field.objects.values_list()
        self.fields['nationality'].choices = models.Nationality.objects.values_list()



class FieldForm(django_forms.Form):
    field = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '领域', }),
    )


class NationalityForm(django_forms.Form):
    nationality = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '国籍', })
    )


class NewsForm(django_forms.Form):
    title = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '标题', }),
    )
    about = django_fields.CharField(
        widget=django_widgets.TextInput(attrs={'class': 'form-control', 'placeholder': '相关大师', }),
    )