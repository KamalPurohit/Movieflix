import React from 'react';

export default function Insights({ budget, expenses, goals }) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const goalStatus = goals.length > 0 ? (remainingBudget >= goals[0].amount ? 'Goal Achieved' : 'Goal Not Achieved') : '';

  return (
    <div>
      <h2>Insights:</h2>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Remaining Budget: ${remainingBudget}</p>
      {goals.length > 0 && (
        <p>Goal: ${goals[0].amount}</p>
      )}
      {goalStatus && <p>{goalStatus}</p>}
    </div>
  );
}


