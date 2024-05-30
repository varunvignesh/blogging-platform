**Blogging platform Application**

**Setup**

* Copy .env.example to .env with corresponding values
for database

* Install the dependenices
```
npm install
```

* Create the database if not exists and do migrations

```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

* Run the applications

```
node index.js
```

* Run the tests

```
npm test
```

* Here's the link for Api Documentation

https://documenter.getpostman.com/view/27648946/2sA3Qv7qNK