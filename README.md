# funny

## Requirements

1. Node JS
2. MySQL

## Setup

1. Create a `.env` file. You can use the `.env.sample` file as reference. 
2. Install the sequelize cli with `npm install -g sequelize-cli`

Once complete run the commands below:

```
npm install
sequelize db:create
sequelize db:migrate
sequelize db:seeds:all
```