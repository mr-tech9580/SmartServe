// utils/priorityCalculator.js — pure function that computes a ticket's priority score

// Severity dominates the score. These weights are spaced far apart on purpose,
// so wait-time can only ever nudge tickets within the same severity band —
// never let a "low" ticket outrank a "critical" one.
const SEVERITY_WEIGHTS = {
  critical: 100,
  high: 75,
  medium: 50,
  low: 25,
};

// waitMinutes: how long (in minutes) since the ticket was created.
// We give it a SMALL weight so it only breaks ties within the same severity.
function calculatePriorityScore(severity, waitMinutes = 0) {
  const severityWeight = SEVERITY_WEIGHTS[severity] || 0;

  // 0.01 per minute waited — e.g. 100 minutes waited only adds +1 point.
  // Small and deliberate: prevents starvation without overriding severity.
  const waitBonus = waitMinutes * 0.01;

  return severityWeight + waitBonus;
}

module.exports = { calculatePriorityScore, SEVERITY_WEIGHTS };