const { DataTypes, Sequelize } = require('sequelize-cockroachdb');
const sequelize = new Sequelize('postgresql://spaws1337:mh7cGfcKrVIYU5j8cNOK3A@financial-dashboard-8549.8nj.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const Expense = sequelize.define('Expense', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
            len: [1, 50]
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        trim: true,
        validate: {
            isFloat: true
        }
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: "expense"
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        trim: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = Expense;

sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync({ force: false }); // force: false означает, что таблица не будет пересоздаваться, если она уже существует
  })
  .then(() => {
    console.log('Миграции выполнены');
  })
  .catch((error) => {
    console.error('Ошибка выполнения миграций:', error);
  });