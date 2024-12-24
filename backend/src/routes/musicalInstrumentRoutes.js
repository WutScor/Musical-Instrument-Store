const express = require("express");
const router = express.Router();
const musicalInstrumentController = require("../controllers/musicalInstrumentController");

router.get("/", musicalInstrumentController.getMusicalInstruments);
router.post("/", musicalInstrumentController.insertMusicalInstrument);
router.delete("/:id", musicalInstrumentController.deleteMusicalInstrument);
router.put("/:id", musicalInstrumentController.updateMusicalInstrument);
router.get(
  "/:id/related",
  musicalInstrumentController.getRelatedMusicalInstruments
);

module.exports = router;
