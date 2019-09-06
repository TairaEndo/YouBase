const client = require('cheerio-httpcli')
// const fs = require('fs')
// const moment = require('moment')

function getData() {
    
    // client.fetch('https://baseball.sports.smt.docomo.ne.jp/result/games/live_{year}{days}{gameNumber}_{inning}{topButtom}{battingNum}.html#liveArea', function (err, $, res, body) {
    client.fetch('https://baseball.sports.smt.docomo.ne.jp/result/games/live_2019080101_02102.html', function (err, $, res, body) {
        const BatterName = $(`#liveArea > div.player_area.batter > div.wrapper_player.clearfix > div.player_oneball.clearfix > div.player_box > div > div.name > a`).text()
        const PitcherName = $(`#liveArea > div:nth-child(1) > div > div.player_oneball.clearfix > div.player_box > div > div.name > a`).text()
        // const BallSpeed = $(`#main_column > section.pitch_archive > div > table > tbody > tr:nth-child(1) > td.batting`).text()
        console.log(BatterName,PitcherName)

    })
}
getData()