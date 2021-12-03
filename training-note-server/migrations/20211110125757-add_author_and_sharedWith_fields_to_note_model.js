module.exports = {
  async up(db) {
    await db.collection('notes').updateMany(
      {},
      {
        $set: {
          sharedWith: [],
        },
      }
    );

    const userList = await db.collection('users').find().toArray();

    userList.forEach((user) => {
      if (user.notes.length) {
        user.notes.forEach((_id) => {
          db.collection('notes').updateOne(
            { _id: _id },
            {
              $set: {
                author: user._id,
              },
            }
          );
        });
      }
    });
  },

  async down(db) {
    await db
      .collection('notes')
      .updateMany({}, { $unset: { sharedWith: '', author: '' } });
  },
};
