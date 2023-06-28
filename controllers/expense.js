const Expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    // Валидация
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "Все поля должны быть заполнены" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Сумма должна быть положительным числом" });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(200).json({ message: "Расходы успешно добавлены" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка при добавлении расходов" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка при получении расходов" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteExpense = await Expense.destroy({
      where: {
        id: id,
      },
    });
    if (deleteExpense) {
      res.status(200).json({ message: "Расходы успешно удалены" });
    } else {
      res.status(404).json({ message: "Расходы не найдены" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка при удалении расходов" });
  }
};
