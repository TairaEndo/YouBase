# Scraping


## URLの形式



```Javascript
URL = 'https://baseball.sports.smt.docomo.ne.jp/result/games/live_{year}{days}{gameNumber}_{inning}{topButtom}{battingNum}.html#liveArea'

year = '2019'
days ='0801'
//球場の優先順位: 読売>ヤクルト>横浜>中日>阪神>広島
gameNumver ='01'
inning='01'
//表が1裏が2
topButtom='2'
//そのイニングの何番目の打者か
battingNum='1'
```
