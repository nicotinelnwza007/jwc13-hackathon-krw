"use client";

import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';



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

const App = () => {
  const [salary, setSalary] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [availableMoney, setAvailableMoney] = useState(0);
  const [percentage, setPercentage] = useState(20);
  const [maxDebt, setMaxDebt] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState('');

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

  const calculateBestCard = () => {
    const purchase = new Date(purchaseDate);
    const dayOfPurchase = purchase.getDate();

    const closingDay1 = 25; // Closing date 25
    const closingDay2 = 20; // Closing date 20

    // Get days until next closing dates
    let daysUntilClosing1 = closingDay1 - dayOfPurchase;
    let daysUntilClosing2 = closingDay2 - dayOfPurchase;

    // Adjust days for month boundary
    if (daysUntilClosing1 < 0) {
      daysUntilClosing1 += new Date(purchase.getFullYear(), purchase.getMonth() + 1, 0).getDate(); // days in current month
    }

    if (daysUntilClosing2 < 0) {
      daysUntilClosing2 += new Date(purchase.getFullYear(), purchase.getMonth() + 1, 0).getDate(); // days in current month
    }

    // Recommend card based on closest closing date
    if (daysUntilClosing1 < daysUntilClosing2) {
      setRecommendation('You should use the card with a closing date on the 25th.');
    } else {
      setRecommendation('You should use the card with a closing date on the 20th.');
    }
  };

  return (
  <div>
     <nav className="bg-[#46A8A7] shadow-md p-8 flex justify-between">
        <div className='text-[36px] text-white font-bold'>Credit Buddy</div>
        <ul className="flex justify-around gap-[24px]">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              Caculate
            </a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-link">
              About us
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Policy
            </a>
          </li>
        </ul>
        <div> Login </div>
      </nav>
      <Typography className=''>User Financial Information</Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Purchase Amount"
          type="number"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Percentage for Max Debt"
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleRecommendation} style={{ marginTop: 20 }}>
          Get Recommendation
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom style={{ marginTop: 40 }}>Expenses</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Expense Description"
          type="text"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Expense Amount"
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddExpense} style={{ marginTop: 20 }}>
          Add Expense
        </Button>
      </Box>
      <List>
        {expenses.map((expense, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${expense.description}: ${expense.amount}`} />
            <Button variant="outlined" color="secondary" onClick={() => handleRemoveExpense(index)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" gutterBottom style={{ marginTop: 40 }}>Available Money</Typography>
      <Typography>{availableMoney}</Typography>

      <Typography variant="h5" gutterBottom>Max Debt ({percentage}% of Salary)</Typography>
      <Typography>{maxDebt}</Typography>

      <Typography variant="h5" gutterBottom>Purchase Recommendation</Typography>
      <Typography>{recommendation}</Typography>

      <Typography variant="h5" gutterBottom style={{ marginTop: 40 }}>Card Recommendation by Date</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Purchase Date"
          type="text"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={calculateBestCard} style={{ marginTop: 20 }}>
          Calculate Best Card
        </Button>
      </Box>
     </div>
  );
};

export default App;
