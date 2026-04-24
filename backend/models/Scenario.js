const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  name:          { type: String, default: 'Unnamed Scenario' },
  workers:       { type: Number, required: true },
  stations:      { type: Number, required: true },
  cycleTimes:    [{ type: Number }],
  shiftDuration: { type: Number, required: true },
  results: {
    bottleneckStation:   Number,
    bottleneckCycleTime: Number,
    effectiveCycleTime:  Number,
    unitsPerShift:       Number,
    workerUtilization:   Number,
    idleTimePerWorker:   Number,
    optimalWorkers:      Number,
    suggestions:         [String],
  }
}, { timestamps: true });

module.exports = mongoose.model('Scenario', scenarioSchema);
