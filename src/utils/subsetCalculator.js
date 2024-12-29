/**
 * Finds a subset of bills with the smallest number of bills such that:
 *   1. The sum(subset) <= budget
 *   2. No additional bill from outside the subset can be added without exceeding the budget
 *
 * @param {Array} bills Array of bills { id, amount, ... }
 * @param {number} budget
 * @returns {Array} array of bill IDs that meet the condition
 */

export function findMinimalSubset(bills, budget) {
    // We’ll do a backtracking approach:
    // 1. Generate all subsets that are <= budget.
    // 2. Among those, keep only subsets that cannot fit any leftover bill.
    // 3. From those, pick the one with minimal cardinality.
  
    const allSubsets = [];
    backtrack(bills, 0, [], 0, budget, allSubsets);
  
    // Filter out subsets that can fit at least one leftover bill
    const validSubsets = allSubsets.filter(subset => {
      const subsetSum = sumAmounts(subset);
      const leftover = bills.filter(b => !subset.includes(b));
      // Check if any leftover can be added
      const canAddMore = leftover.some(l => subsetSum + l.amount <= budget);
      return !canAddMore; // We only want subsets where we cannot add more
    });
  
    // Among valid subsets, pick the one with the minimal number of bills
    if (validSubsets.length === 0) {
      return [];
    }
  
    validSubsets.sort((a, b) => a.length - b.length); // sort by ascending length
    const minimalSubset = validSubsets[0];
  
    // Return array of IDs
    return minimalSubset.map(b => b.id);
  }
  
  function backtrack(bills, start, currentSubset, currentSum, budget, allSubsets) {
    // We have a valid subset
    allSubsets.push([...currentSubset]);
  
    for (let i = start; i < bills.length; i++) {
      const bill = bills[i];
      if (currentSum + bill.amount <= budget) {
        // Choose
        currentSubset.push(bill);
        backtrack(
          bills,
          i + 1,
          currentSubset,
          currentSum + bill.amount,
          budget,
          allSubsets
        );
        // Backtrack
        currentSubset.pop();
      }
    }
  }
  
  function sumAmounts(subset) {
    return subset.reduce((acc, bill) => acc + bill.amount, 0);
  }
  