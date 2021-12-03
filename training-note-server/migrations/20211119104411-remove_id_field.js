module.exports = {
  async up(db, client) {
    await db.collection('notes').updateMany({}, { $unset: { id: '' } });
  },

  async down(db, client) {
    await db.collection('notes').updateMany({}, { $set: { id: '$_id' } });
  },
};
