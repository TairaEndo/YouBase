## ローカル側
### psql起動方法
`brew services start postgresql`
### psql停止方法
`brew services stop postgresql`

→ローカルのpsqlにデータを入れていく
→expressにて`node index.js` `heroku local web`を実行してテスト
→良さそうならherokuへ

## heroku側
`heroku addons`してAdd-onの名前を確認
→`cat example.sql | heroku pg:psql postgresql-octagonal-49562 --app vb-node-api`
でheroku側にexample.sqlに記載したtableが作られたりデータが入る

(`heroku pg:psql postgresql-octagonal-49562 --app vb-node-api`
でheroku側のデータベースに入れる)

### herokuにpush
`heroku git:remote -a vb-node-api`

`git add .`

`git commit -m "init"`

`git push heroku master`

これで
`https://vb-node-api.herokuapp.com/~~~~`
にアクセスするとresponseが得られる