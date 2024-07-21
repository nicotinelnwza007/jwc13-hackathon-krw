"use client";

import { useState, useEffect } from 'react';
import { creditCardData } from './mockData';

const recommendCard = (amount, creditCards) => {
  const suitableCards = creditCards.filter(card => card.creditLimit >= amount);

  if (suitableCards.length === 0) {
    return "No card has enough credit limit to make this purchase.";
  }

  const recommendedCard = suitableCards.reduce((bestCard, currentCard) => {
    const getDateNumber = (cycle) => parseInt(cycle.split(" ")[0], 10);
    const today = new Date().getDate();

    const bestCardBillingCycle = getDateNumber(bestCard.billingCycle);
    const currentCardBillingCycle = getDateNumber(currentCard.billingCycle);

    const bestCardDaysLeft = (bestCardBillingCycle - today + 30) % 30;
    const currentCardDaysLeft = (currentCardBillingCycle - today + 30) % 30;

    return currentCardDaysLeft < bestCardDaysLeft ? currentCard : bestCard;
  });

  return `You should use ${recommendedCard.cardName} for this purchase.`;
};

const Hero = () => {
  const [salary, setSalary] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [availableMoney, setAvailableMoney] = useState(0);
  const [percentage, setPercentage] = useState(20); 
  const [maxDebt, setMaxDebt] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setAvailableMoney(salary - totalExpenses);
  }, [salary, expenses]);

  useEffect(() => {
    setMaxDebt((salary * percentage) / 100);
  }, [salary, percentage]);

  const handleRecommendation = () => {
    const recommendation = recommendCard(purchaseAmount, creditCardData);
    setRecommendation(recommendation);
  };

  const handleAddExpense = () => {
    if (expenseDescription && expenseAmount > 0) {
      setExpenses([...expenses, { description: expenseDescription, amount: Number(expenseAmount) }]);
      setExpenseDescription('');
      setExpenseAmount(0);
    }
  };

  const handleRemoveExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  return (
    <div className="flex justify-center">
      {/* <h1>Credit Card Information</h1>
      {creditCardData.map((card, index) => (
        <div key={index}>
          <p><strong>Card Name:</strong> {card.cardName}</p>
          <p><strong>Billing Cycle:</strong> {card.billingCycle}</p>
          <p><strong>Credit Limit:</strong> {card.creditLimit}</p>
        </div>
      ))} */}

      <h2>User Financial Information</h2>
      <div>
        <label>
          Salary:
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Purchase Amount:
          <input
            type="number"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Percentage for Max Debt:
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleRecommendation}>Get Recommendation</button>

      <h2>Expenses</h2>
      <div>
        <label>
          Expense Description:
          <input
            type="text"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
          />
        </label>
        <label>
          Expense Amount:
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
          />
        </label>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description}: {expense.amount}
            <button onClick={() => handleRemoveExpense(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Available Money</h2>
      <p>{availableMoney}</p>

      <h2>Max Debt ({percentage}% of Salary)</h2>
      <p>{maxDebt}</p>

      <h2>Purchase Recommendation</h2>
      <p>{recommendation}</p>
    </div>
  );
};

export default Hero;
