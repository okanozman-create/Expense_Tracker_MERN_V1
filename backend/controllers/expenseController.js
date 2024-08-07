const Expense = require('../models/Expense');

// Get all expenses for the logged-in user
const getAllExpenses = async (req, res) => {
    try {
        console.log('User ID:', req.user.id);
        const expenses = await Expense.find({ user: req.user.id });
        console.log('Expenses:', expenses);
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a single expense by ID
const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new expense
const createExpense = async (req, res) => {
    const { description, amount, date } = req.body;
    const userId = req.user.id;

    try {
        if (!description || !amount || !date) {
            return res.status(400).json({ message: 'Description, amount, and date are required.' });
        }

        const newExpense = new Expense({ description, amount, date, user: userId });
        await newExpense.save();
        console.log('New expense added:', newExpense);
        res.json(newExpense);
    } catch (error) {
        console.error('Error saving expense:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update an expense
const updateExpense = async (req, res) => {
    const { description, amount, date } = req.body;

    try {
        const expense = await Expense.findById(req.params.id);
        if (expense) {
            expense.description = description || expense.description;
            expense.amount = amount || expense.amount;
            expense.date = date || expense.date;
            const updatedExpense = await expense.save();
            res.json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (expense) {
            res.json({ message: 'Expense removed' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllExpensesForAdmin = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('user', 'email'); // Populate user details
        res.json(expenses);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    getAllExpensesForAdmin
};
