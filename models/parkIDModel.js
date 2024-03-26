const mongoose = require("mongoose");

const ParkIDSchema = mongoose.Schema(
    {
      parkId: {
        type: String,
        required: true,
        unique: true,
      },
  
      parkName: {
        type: String,
        required: [true, "Please enter the park name"],
      },
  
      parkLocation: {
        type: String, 
        required: true,
      },
      parkOpenings: {
        type: String,
        required: false,
      },
    },
  );

  const ParkID = mongoose.model("ParkID", ParkIDSchema);

module.exports = ParkID;