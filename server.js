const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const ParkReview = require("./models/parkReviewModel");
const ParkID = require("./models/parkIDModel");

app.use(express.json());
app.use(cors());

const PORT = 3000;

mongoose.connect("mongodb+srv://ismohamu:MoneyMaker@parkreviewcluster.j5u5sam.mongodb.net/")
  .then(() => {
      console.log("successfully connected to MongoDB!");
      app.listen(PORT, () => {
          console.log(`Node API app is running on port ${PORT}`);
      });
  })
  .catch((error) => {
    console.log(error);
  });



//Accesses all park reviews
app.get("/parks/:parkId/reviews", async (req, res) => {
  try {
    const { parkId } = req.params;
    const reviews = await ParkReview.find({ parkId });
    res.status(200).json(reviews);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
});

// Accesses specific review for specific park based on userName
app.get("/parks/:parkId/reviews/:userName", async (req, res) => {
  try {
    const { parkId, userName } = req.params;
    const review = await ParkReview.findOne({ parkId, userName });

    if (!review) {
      return res.status(404).json({ message: `Cannot find review with userName ${userName}` });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Allow user to update specific review using userName
app.put("/parks/:parkId/reviews/:userName", async (req, res) => {
  try {
    const { parkId, userName } = req.params;
    const review = await ParkReview.findOneAndUpdate({ parkId, userName }, req.body, { new: true });

    if (!review) {
      return res.status(404).json({ message: `Cannot find review with userName ${userName}` });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Create/post reviews for a specific park 
app.post("/parks/:parkId/reviews", async (req, res) => {
  try {
    const { parkId } = req.params;
    const { userName, Description, rating, timeOfVisit, keyWords } = req.body;

    const reviewData = {
      parkId : parkId,
      userName,
      Description,
      rating,
      timeOfVisit,
      keyWords,
    };

    const review = await ParkReview.create(reviewData);
    res.status(200).json(review);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete specific review in park based on userName
app.delete("/parks/:parkId/reviews/:userName", async (req, res) => {
  try {
    const { parkId, userName } = req.params;
    const review = await ParkReview.findOneAndDelete({ parkId, userName });

    if (!review) {
      return res.status(404).json({ message: `Cannot find review with userName ${userName}` });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Get Park Data
app.get('/parks', async (req, res) => {
  try {
    const parks = await ParkID.find({});
    res.status(200).json(parks);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
});

// Get a Single Park By ID
app.get('/parks/:parkId', async(req, res) => {
  try {
    const {parkId} = req.params;
    const park = await ParkID.findById(parkId);
    res.status(200).json(park);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
});

// Modify Parks
app.put('/parks/:parkId', async(req, res) => {
  try {
    const {parkId} = req.params;
    const park = await ParkID.findByIdAndUpdate(parkId, req.body);

    if (!park) {
      return res.status(404).json(
        {message: `Cannot find product with ID ${parkId}`}
      );
    }

    const updatedPark = await ParkID.findById(parkId);
    res.status(200).json(updatedPark);

  } catch(error) {
    res.status(500).json({message: error.message});
  }
});

// Post Park Data
app.post('/parks', async (req, res) => {
  try {
    const park = await ParkID.create(req.body);
    res.status(200).json(park);

  } catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message});

  }
});

// Delete A Park
app.delete('/parks/:parkId', async (req, res) => {
  try {

    const {parkId} = req.params;
    const park = await ParkID.findByIdAndDelete(parkId);

    if(!park) {
      return res.status(404).json({message: `Cannot find Park with ID ${parkId}`});
    }
    res.status(200).json(park);

  } catch(error) {
    res.status(500).json({message: error.message});
  }
});