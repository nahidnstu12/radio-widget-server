const Station = require("../model/stationSchema");

exports.createStation = async (req, res) => {
  try {
    const newStation = new Station(req.body);
    const result = await newStation.save();
    res.status(201).json({ message: "Insert Successfully", result });
  } catch (err) {
    console.log(err);
    res.status(400).send(`<h1>${err.message}</h1>`);
  }
};

exports.fetchAllStation = async (req, res) => {
  try {
    const data = await Station.find().select({
      __v: 0,
    });
    res.status(200).json({ data, total: data.length });
  } catch (err) {
    console.log(err);
    res.status(500).send(`<h1>${err.message}</h1>`);
  }
};
exports.findSingleStation = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Station.find({ _id: id });
    if (result.length === 0)
      return res.status(404).json({ message: "Station Not Found" });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(`<h1>${err.message}</h1>`);
  }
};
exports.updateStation = async (req, res) => {
  try {
    const id = req.params.id;
    const station = await Station.find({ _id: id });
    if (!station) {
      return res.status(404).json({ message: "Station Not Found" });
    }
    // updata body
    station.stationName = req.body.stationName || station.stationName;
    station.frequency = req.body.frequency || station.frequency;

    const result = await Station.findByIdAndUpdate(
      { _id: id },
      { $set: { ...station } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(`<h1>${err.message}</h1>`);
  }
};
exports.deleteStation = async (req, res) => {
  try {
    const id = req.params.id;
    await Station.findByIdAndDelete({ _id: id });
    res.status(200).send("<h1>Deleted</h1>");
  } catch (err) {
    console.log(err);
    res.status(err.status).send(`<h1>${err.message}</h1>`);
  }
};
