import sampleData from "./sampleData.js"; 
import  Listing  from "../src/models/listing.model.js"; // adjust path as needed

const seedListingsData = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleData);
    console.log("✅ Sample listings successfully inserted!");
  } catch (error) {
    console.error("❌ Error seeding listings:", error);
  }
};

export default seedListingsData;
