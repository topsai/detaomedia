#!/usr/bin/env python 
# -*- coding: utf-8 -*- 
import wave
from pyaudio import PyAudio, paInt16

framerate = 16000
NUM_SAMPLES = 2000
channels = 1
sampwidth = 2
TIME = 2


def save_wave_file(filename, data):
    '''save the date to the wavfile'''
    wf = wave.open(filename, 'wb')
    wf.setnchannels(channels)  # 声道
    wf.setsampwidth(sampwidth)  # 采样字节 1 or 2
    wf.setframerate(framerate)  # 采样频率 8000 or 16000
    wf.writeframes(b"".join(
        data))
    # https://stackoverflow.com/questions/32071536/typeerror-sequence-item-0-expected-str-instance-bytes-found
    wf.close()


def my_record():
    pa = PyAudio()
    stream = pa.open(format=paInt16, channels=1,
                     rate=framerate, input=True,
                     frames_per_buffer=NUM_SAMPLES)
    my_buf = []
    count = 0
    print("action")
    while count < TIME * 5:  # 控制录音时间
        string_audio_data = stream.read(NUM_SAMPLES)  # 一次性录音采样字节大小
        my_buf.append(string_audio_data)
        count += 1
        print('.')
    save_wave_file('01.wav', my_buf)
    stream.close()
    print("ok")
my_record()
