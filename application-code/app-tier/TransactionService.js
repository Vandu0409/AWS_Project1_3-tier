// TransactionService.js
const { Pool } = require('pg');

// Create a connection pool to PostgreSQL RDS
const pool = new Pool({
    host: 'my-rds.chwoe4yo8i3j.ap-south-1.rds.amazonaws.com', // RDS endpoint
    user: 'postgres',   // DB username
    password: 'your_password', // DB password
    database: 'postgres',  // DB name
    port: 5432
});

module.exports = {
    addTransaction: async (amount, desc) => {
        try {
            const result = await pool.query(
                'INSERT INTO transactions (amount, description) VALUES ($1, $2) RETURNING id',
                [amount, desc]
            );
            return 200;
        } catch (err) {
            console.error('Error adding transaction:', err);
            throw err;
        }
    },

    getAllTransactions: async (callback) => {
        try {
            const result = await pool.query('SELECT * FROM transactions');
            callback(result.rows);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            throw err;
        }
    },

    deleteAllTransactions: async (callback) => {
        try {
            await pool.query('DELETE FROM transactions');
            callback(true);
        } catch (err) {
            console.error('Error deleting all transactions:', err);
            throw err;
        }
    },

    deleteTransactionById: async (id, callback) => {
        try {
            await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
            callback(true);
        } catch (err) {
            console.error('Error deleting transaction by ID:', err);
            throw err;
        }
    },

    findTransactionById: async (id, callback) => {
        try {
            const result = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);
            callback(result.rows);
        } catch (err) {
            console.error('Error finding transaction by ID:', err);
            throw err;
        }
    }
};
