require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');


describe('MongoDB Integration', () => {
  it('connects to MongoDB using MONGO_URI', async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
    await mongoose.disconnect();
  });
});
