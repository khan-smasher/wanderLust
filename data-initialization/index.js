import sampleData from "./sampleData.js";
import Listing from "../src/models/listing.model.js";
import User from "../src/models/user.model.js"; // Make sure this path is correct

const seedListingsData = async () => {
  try {
    const ownerId = "688a26faf79a03ade5b3a996";

    // Check if the owner exists in the database
    const user = await User.findById(ownerId);

    if (!user) {
      throw new Error(`
🚫 Owner user not found!

ℹ️ To seed the listings properly, you need to create a user first.
➡️ Tip: Register a user and replace the hardcoded owner ID in 'seedListingsData.js' with the newly created user's ID.

📍 Current Owner ID: ${ownerId}
      `);
    }

    await Listing.deleteMany();

    const dataWithOwner = sampleData.map((obj) => ({
      ...obj,
      owner: ownerId,
    }));

    await Listing.insertMany(dataWithOwner);

    console.log("✅ Sample listings successfully inserted!");
  } catch (error) {
    console.error("❌ Error seeding listings:\n", error.message);
  }
};

export default seedListingsData;
