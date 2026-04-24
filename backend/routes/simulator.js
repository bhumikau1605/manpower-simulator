const express = require('express');
const router  = express.Router();
const { simulate } = require('../controllers/simulatorController');
const Scenario = require('../models/Scenario');

// Run simulation (no save)
router.post('/simulate', (req, res) => {
  try {
    const { workers, stations, cycleTimes, shiftDuration } = req.body;
    const results = simulate({ workers, stations, cycleTimes, shiftDuration });
    res.json({ success: true, results });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Save scenario
router.post('/scenarios', async (req, res) => {
  try {
    const { name, workers, stations, cycleTimes, shiftDuration } = req.body;
    const results = simulate({ workers, stations, cycleTimes, shiftDuration });
    const scenario = new Scenario({ name, workers, stations, cycleTimes, shiftDuration, results });
    await scenario.save();
    res.json({ success: true, scenario });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Get all saved scenarios
router.get('/scenarios', async (req, res) => {
  try {
    const scenarios = await Scenario.find().sort({ createdAt: -1 });
    res.json({ success: true, scenarios });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Delete scenario
router.delete('/scenarios/:id', async (req, res) => {
  try {
    await Scenario.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

module.exports = router;
