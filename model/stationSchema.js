const { default: mongoose } = require("mongoose");

const stationSchema = mongoose.Schema(
  {
    stationName: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);
/**
 * Station is a Model
 */
const Station = new mongoose.model("Station", stationSchema);
module.exports = Station;
