const express = require("express");
const router = express.Router();
const musicalInstrumentController = require("../controllers/musicalInstrumentController");
const { upload } = require("../config/supabase");

router.get("/", musicalInstrumentController.getMusicalInstruments);
router.post(
  "/",
  upload.single("image"),
  musicalInstrumentController.insertMusicalInstrument
);
router.delete("/:id", musicalInstrumentController.deleteMusicalInstrument);
router.put(
  "/:id",
  upload.single("image"),
  musicalInstrumentController.updateMusicalInstrument
);
router.get(
  "/:id/related",
  musicalInstrumentController.getRelatedMusicalInstruments
);

module.exports = router;
