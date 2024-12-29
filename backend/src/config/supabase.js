const { createClient } = require("@supabase/supabase-js");
const multer = require("multer");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = {
  supabase,
  upload,
};
