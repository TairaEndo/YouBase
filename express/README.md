## ローカル側
### psql起動方法
`brew services start postgresql`
### psql停止方法
`brew services stop postgresql`

→ローカルのpsqlにデータを入れていく
`psql -f ../test.sql -d vb-db `
→expressにて`node index.js` `heroku local web`を実行してテスト
→良さそうならherokuへ

## heroku側
`heroku addons`してAdd-onの名前を確認
→`cat example.sql | heroku pg:psql postgresql-curved-26605 --app vb-sql`
でheroku側にexample.sqlに記載したtableが作られたりデータが入る

(`heroku pg:psql postgresql-curved-26605 --app vb-sql`
でheroku側のデータベースに入れる)

### herokuにpush
`heroku git:remote -a vb-sql`

`git add .`

`git commit -m "init"`

`git push heroku master`

これで
`https://vb-sql.herokuapp.com/~~~~`
にアクセスするとresponseが得られるk
