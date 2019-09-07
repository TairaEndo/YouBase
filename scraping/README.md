# Scraping

## 欲しいjsonの形式
```json
{
    "gameDayInfo":{
        "year":2019,
        "month":8,
        "days":1
    },
    "pitchingData":{
        "inning":1,
        "topButtom":"表",
        "pitcher":"投手名",
        "batter":"打者名",
        "ballInfo":{
            "ballNumber":1,
            "typesOfBall":"スライダー",
            "speed":143,
            "result":"空振り"
        },{
            "ballNumber":2,
            "typesOfBall":"スライダー",
            "speed":141,
            "result":"左安打"
        },
        "result":{
            "name":"左安打",
            "type":"single"
        }
    },
    {
        "inning":1,
        "topButtom":"表",
        "pitcher":"投手名",
        "batter":"打者名",
        "ballInfo":{
            "ballNumber":1,
            "typesOfBall":"スライダー",
            "speed":143,
            "result":"空振り"
        },{
            "ballNumber":2,
            "typesOfBall":"スライダー",
            "speed":141,
            "result":"二ゴロ"
        },
        "result":{
            "name":"二ゴロ",
            "type":"ground_out"
        }
    }
}
```

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
