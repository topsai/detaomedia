#!/usr/bin/env python 
# -*- coding: utf-8 -*- 


import requests
url = "http://localhost:8080/api/master/"
json_data = {
    "sorting": 12312,
    "avatar": "aasdsad",
    "chinese_name": "asd",
    "actual_name": "asdasd",
    "introduction": "asdasd",
    "content": "asdasd",
    "field": 1,
    "nationality": 1
}
d1 = {'actual_name': "asfasf",
      "avatar": "/static/testupfile/dc54564e9258d1099816ec72db58ccbf6d814d7c.jpg",
      "chinese_name": "fasf",
      "content": "<p>asfasfasfa</p>",
      "field": 1,
      "introduction": "asfasf",
      "nationality": 1,
      "sorting": 12312123123, }


r = requests.post(url, data=d1)
print(r.text)
