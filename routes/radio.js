const express = require("express");
const {
  createStation,
  fetchAllStation,
  findSingleStation,
  updateStation,
  deleteStation,
} = require("../controller/radioController");

const router = express.Router();
// const { checkLogin, checkAuthorize } = require("../middleware/common");

router.get("/health", async (req, res) => {
  try {
    res.status(200).send("<h1>Hello Nahid</h1>");
  } catch (err) {
    console.log(err);
    res.status(err.status).send(`<h1>${err.message}</h1>`);
  }
});

// 2. create routing
/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Add a new radio station
 *     parameters:
 *      - in: body
 *        name: Radio Station
 *        description: New Radio Station
 *        schema:
 *          type: object
 *          properties:
 *            stationName:
 *              type: string
 *            frequency:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createStation);
/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: Get All radio station
 *     description: All Stations
 *     responses:
 *       200:
 *         description: Returns all the Stations
 */
router.get("/", fetchAllStation);
/**
 * @swagger
 * /api/stations/{id}:
 *   get:
 *     summary: Get single radio station
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The radio station ID.
 *     description: Get a radio station by id
 *     responses:
 *       200:
 *         description: Returns the requested radio station
 */
router.get("/:id", findSingleStation);
/**
 * @swagger
 * /api/stations/{id}:
 *   patch:
 *     summary: Update radio station
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The catchphrase ID.
 *      - in: body
 *        name: station
 *        description: Update radio station
 *        schema:
 *          type: object
 *          properties:
 *            stationName:
 *              type: string
 *            frequency:
 *              type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.patch("/:id", updateStation);
router.put("/:id", updateStation);
/**
 * @swagger
 * /api/stations/{id}:
 *   delete:
 *     summary: Delete radio station
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The radio station ID.
 *     description: Delete a radio station by id
 *     responses:
 *       200:
 *         description: Returns the requested radio station
 */
router.delete("/:id", deleteStation);

module.exports = router;
