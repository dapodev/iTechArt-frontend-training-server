module.exports = {
  async up(db, client) {
    await db
      .collection('users')
      .updateMany(
        { refreshToken: { $exists: false } },
        { $set: { refreshToken: null } }
      );
  },

  async down(db, client) {
    await db
      .collection('users')
      .updateMany({}, { $unset: { refreshToken: '' } });
  },
};
