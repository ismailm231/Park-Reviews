const mongoose = require("mongoose");

// Park Review Schema
const parkReviewSchema = mongoose.Schema(
  {
   parkId: {
      type: String
   },
    
    userName: {
      type: String,
      //required: [true, "Please enter your name"],
    },
    Description: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: true,
    },
    timeOfVisit: {
      type: String,
      required: [true, "Please specify what season you visited the park"],
    },
    keyWords: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ParkReview = mongoose.model("ParkReview", parkReviewSchema);

module.exports = ParkReview;
