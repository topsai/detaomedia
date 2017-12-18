#!/usr/bin/env python 
# -*- coding: utf-8 -*- 


from aip import AipSpeech

""" 你的 APPID AK SK """
APP_ID = '10212694'
API_KEY = 'xGjfH2uRq8F5khYuvxcbAxpS'
SECRET_KEY = 'c8ee8401bd62c1c7ef1d11c0da0c383b'
aipSpeech = AipSpeech(APP_ID, API_KEY, SECRET_KEY)
# C:\Users\john\Documents\Sound recordings
# 识别本地文件

# 读取文件

hello = "C:/Users/john/Desktop/login.wav"
ybkj = "C:/Users/john/Desktop/ybkj.wav"
test = "C:/Users/john/Desktop/detaomedia/01.wav"


def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()


ret = aipSpeech.asr(get_file_content(test), 'wav', 16000, {
    'lan': 'zh',
})
print(ret)
