const pool = require('./db');

exports.getAllSeats = async () => {
  const result = await pool.query('SELECT * FROM seats ORDER BY id ASC');
  return result.rows;
};

exports.bookSeats = async (seatIds, userId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const id of seatIds) {
      await client.query('UPDATE seats SET booked_by = $1 WHERE id = $2 AND booked_by IS NULL', [userId, id]);
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.resetSeats = async () => {
  await pool.query('UPDATE seats SET booked_by = NULL');
};
