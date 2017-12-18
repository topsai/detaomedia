#!/usr/bin/env python 
# -*- coding: utf-8 -*- 


from django.contrib.auth.models import User, Group
from rest_framework import serializers
from web import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Master
        fields = ('id', 'chinese_name')


class EnterpriseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Enterprise
        fields = '__all__'


class MasterSerializer(serializers.ModelSerializer):
    # field = serializers.CharField(source='field.field')
    # nationality = serializers.CharField(source='nationality.nationality')

    class Meta:
        model = models.Master
        fields = '__all__'


class FeildSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Field
        fields = '__all__'


class NationalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Nationality
        fields = '__all__'
