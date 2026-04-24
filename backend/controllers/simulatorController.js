/**
 * Core Manpower Optimization Algorithm
 *
 * Logic:
 * 1. Bottleneck = station with highest cycle time (limits throughput)
 * 2. Effective cycle time = bottleneck cycle time (system speed = slowest station)
 * 3. Units per shift = shiftDuration (mins) * 60 / effectiveCycleTime (secs)
 * 4. Total work content = sum of all cycle times
 * 5. Theoretical min workers = ceil(totalWorkContent / effectiveCycleTime)
 * 6. Worker utilization = (totalWorkContent / (workers * effectiveCycleTime)) * 100
 * 7. Idle time per worker = effectiveCycleTime - (totalWorkContent / workers)
 */

function simulate({ workers, stations, cycleTimes, shiftDuration }) {
  // Validate
  if (!cycleTimes || cycleTimes.length !== stations)
    throw new Error('cycleTimes array length must match number of stations');

  const shiftSeconds = shiftDuration * 60;

  // 1. Bottleneck
  const bottleneckCycleTime = Math.max(...cycleTimes);
  const bottleneckStation   = cycleTimes.indexOf(bottleneckCycleTime) + 1;

  // 2. Effective cycle time = bottleneck
  const effectiveCycleTime = bottleneckCycleTime;

  // 3. Units per shift
  const unitsPerShift = Math.floor(shiftSeconds / effectiveCycleTime);

  // 4. Total work content
  const totalWorkContent = cycleTimes.reduce((a, b) => a + b, 0);

  // 5. Optimal workers
  const optimalWorkers = Math.ceil(totalWorkContent / effectiveCycleTime);

  // 6. Worker utilization
  const workerUtilization = Math.min(
    100,
    ((totalWorkContent / (workers * effectiveCycleTime)) * 100)
  ).toFixed(1);

  // 7. Idle time per worker (seconds)
  const idleTimePerWorker = (
    effectiveCycleTime - totalWorkContent / workers
  ).toFixed(2);

  // 8. Suggestions
  const suggestions = [];
  if (workers > optimalWorkers)
    suggestions.push(`Reduce workers from ${workers} to ${optimalWorkers} to eliminate idle time.`);
  if (workers < optimalWorkers)
    suggestions.push(`Add ${optimalWorkers - workers} more worker(s) to meet optimal throughput.`);
  if (workers === optimalWorkers)
    suggestions.push('Worker count is optimal for this configuration.');
  suggestions.push(`Station ${bottleneckStation} is the bottleneck (${bottleneckCycleTime}s). Reducing its cycle time will increase throughput.`);

  const minCycleTime = Math.min(...cycleTimes);
  if (bottleneckCycleTime > minCycleTime * 1.5)
    suggestions.push(`High imbalance detected. Consider redistributing tasks from Station ${bottleneckStation}.`);

  return {
    bottleneckStation,
    bottleneckCycleTime,
    effectiveCycleTime,
    unitsPerShift,
    workerUtilization: parseFloat(workerUtilization),
    idleTimePerWorker: parseFloat(idleTimePerWorker),
    optimalWorkers,
    suggestions,
  };
}

module.exports = { simulate };
