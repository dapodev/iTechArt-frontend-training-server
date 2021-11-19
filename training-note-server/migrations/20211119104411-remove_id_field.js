module.exports = {
  async up(db, client) {
    await db.collection('notes').updateMany({}, { $unset: { id: '' } });
  },

  async down(db, client) {
    // set id to _id? using $?
  },
};
