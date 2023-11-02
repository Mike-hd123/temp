import requests
import json
import datetime

urls = ('cny',
        'coin')

header = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763"}


texts = []

results = []


def GetCoin(coins):
    results.clear()
    for url in urls:
        res = requests.get(url='http://app.mike-hd123.tk/' +
                           url, headers=header)
        texts.append(json.loads(res.text))
        res.close()

    cny = texts[0]['data']['USDT']

    for tmp in texts[1]['data']['USDT']:
        for coin in coins:
            if (tmp['currency'] == coin[0]):
                results.append([coin[0], coin[1], round(tmp['c'], 2),
                                round(tmp['c']*coin[1]*float(cny), 2)])

    return results


def GetFund(info):
    results.clear()
    now = datetime.datetime.now()
    for temp in info:
        # =MAX((TODAY()-D2-3)*B2*(C2/365), 0)
        time = temp[3].split('-')
        old = datetime.datetime(int(time[0]), int(time[1]), int(time[2]))
        sy = round(max((now.__sub__(old).days-3) *
                   temp[1]*(temp[2]/36500), 0.00), 2)
        results.append(
            [temp[0], temp[1], temp[2], temp[3], sy])
    return results


def GetDk(info):
    results.clear()
    now = datetime.datetime.now()
    for temp in info:
        # =MAX((TODAY()-D2)*(C2/360)*B2,0)
        time = temp[3].split('-')
        old = datetime.datetime(int(time[0]), int(time[1]), int(time[2]))
        results.append(
            [temp[0], temp[1], temp[2], temp[3], round(max((now.__sub__(old).days)*temp[1]*(temp[2]/36000), 0.00), 2)])
    return results


coin = [['FIL', 5.93], ['LINK', 3.32], ['CHNG', 3.9]]

if __name__ == '__main__':
    print(GetCoin(coin))
