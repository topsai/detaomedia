#!/usr/bin/env python 
# -*- coding: utf-8 -*- 


import requests
import threading


def down():
    while True:
        print("downloading with requests")
        url = 'http://mirrors.163.com/ubuntu-releases/17.04/ubuntu-17.04-desktop-amd64.iso'
        r = requests.get(url)
        with open("demo3.zip", "wb") as code:
            r.content


for i in range(10):
    t = threading.Thread(target=down)
    t.start()
