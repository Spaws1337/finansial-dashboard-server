const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    // Валидация
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "Все поля должны быть заполнены" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "Сумма должна быть положительным числом" });
    }

    const income = await Income.create({
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(200).json({ message: "Доходы успешно добавлены" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка при добавлении доходов" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка при получении доходов" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteIncome = await Income.destroy({
      where: {
        id: id,
      },
    });
    if (deleteIncome) {
      res.status(200).json({ message: "Доходы успешно удалены" });
    } else {
      res.status(404).json({ message: "Доходы не найдены" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Произошла ошибка при удалении доходов" });
  }
};
