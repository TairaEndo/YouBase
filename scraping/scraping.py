#coding: UTF-8
import csv
from urllib.request import urlopen
from bs4 import BeautifulSoup



def getData(url):
    html = urlopen(url)
    bsObj = BeautifulSoup(html, "html.parser")
    
    pitcherName = bsObj.findAll("div", {"class": "name"})[0].get_text()
    batterName = bsObj.findAll("div", {"class": "name"})[1].get_text()
    inning = bsObj.find("div", {"class": "inning"}).get_text()
    print(inning)
    print(pitcherName,batterName)

    ballTable = bsObj.find("table", {"class": "pitch_archive_table"})
    rows = ballTable.findAll("tr")
    for row in rows:
        csvRow = []
        for cell in row.findAll(['td', 'th']):
            csvRow.append(cell.get_text())
        print(csvRow)
    
    #アウトカウント表示するやつ
    # countTable = bsObj.find("table", {"class": "inning_count"})
    # outCount = countTable.find("tr",{"class": "out"}).findAll("td")
    # if(len(outCount[3].get("class"))==2):
    #     print("3out")
    # elif (len(outCount[2].get("class"))==2):
    #     print("2out")
    # elif (len(outCount[1].get("class"))==2):
    #     print("1out")
    # else:
    #     print("0out")

    isNext = bsObj.findAll("p", {"class": "next"})
    if(len(isNext)==1):
        nextURL = 'https://baseball.sports.smt.docomo.ne.jp/result/games/'+isNext[0].find("a").get("href")
        getData(nextURL)
    else:
        #ここでCSV書き出しとかする
        print("END!")

# Initialize
if __name__ == '__main__':
    year = '2019'
    days = '0801'
    gameNum = '01'
    details = '01101'
    getData(f"https://baseball.sports.smt.docomo.ne.jp/result/games/live_{year}{days}{gameNum}_{details}.html#liveArea")