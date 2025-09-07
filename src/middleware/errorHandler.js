// Global error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // TypeORM validation errors
    if (err.name === 'QueryFailedError') {
        // Handle database constraint violations
        if (err.code === '23505') { // Unique constraint violation
            return res.status(409).json({ error: 'Duplicate entry. This record already exists.' });
        }
        if (err.code === '23503') { // Foreign key constraint violation
            return res.status(400).json({ error: 'Referenced record does not exist.' });
        }
        if (err.code === '23502') { // Not null constraint violation
            return res.status(400).json({ error: 'Required field is missing.' });
        }
    }

    // JSON parsing errors
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON format' });
    }

    // Default error response
    res.status(500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
};

module.exports = errorHandler;
