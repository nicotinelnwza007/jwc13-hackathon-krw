"use client";

import { useState, useEffect } from "react";
import { creditCardData } from "@/app/hero/mockData";
import creditcard from "@/app/hero/Creditcard.png";
import creditcard2 from "@/app/hero/Creditcard2.png";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import Image from "next/image";

const recommendCard = (amount, creditCards) => {
  const suitableCards = creditCards.filter(
    (card) => card.creditLimit >= amount
  );

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
  const [recommendation, setRecommendation] = useState("");
  const [availableMoney, setAvailableMoney] = useState(0);
  const [percentage, setPercentage] = useState(20);
  const [maxDebt, setMaxDebt] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");

  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
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
      setExpenses([
        ...expenses,
        { description: expenseDescription, amount: Number(expenseAmount) },
      ]);
      setExpenseDescription("");
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

    const closingDay1 = 25;
    const closingDay2 = 20;

    let daysUntilClosing1 = closingDay1 - dayOfPurchase;
    let daysUntilClosing2 = closingDay2 - dayOfPurchase;

    if (daysUntilClosing1 < 0) {
      daysUntilClosing1 += new Date(
        purchase.getFullYear(),
        purchase.getMonth() + 1,
        0
      ).getDate();
    }

    if (daysUntilClosing2 < 0) {
      daysUntilClosing2 += new Date(
        purchase.getFullYear(),
        purchase.getMonth() + 1,
        0
      ).getDate();
    }

    if (daysUntilClosing1 < daysUntilClosing2) {
      setRecommendation(
        "You should use the card with a closing date on the 25th."
      );
    } else {
      setRecommendation(
        "You should use the card with a closing date on the 20th."
      );
    }
  };

  return (
    <div>
      <nav className="bg-teal-500 shadow-md p-8 flex justify-between items-center">
        <div className="text-4xl text-white font-bold">Credit Buddy</div>
        <ul className="flex space-x-6">
          <li className="nav-item">
            <a href="/" className="text-white text-lg">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/calculate" className="text-white text-lg">
              Calculate
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="text-white text-lg">
              About us
            </a>
          </li>
          <li className="nav-item">
            <a href="/policy" className="text-white text-lg">
              Policy
            </a>
          </li>
        </ul>
        <div className="text-white text-lg">Login</div>
      </nav>
      <div className="bg-[#575757] text-white">
        <div className="flex gap-[8px] p-12 justify-center items-center">
          <Image src={creditcard} width={400} height={400} alt="Credit Card" />
          <Image src={creditcard2} width={400} height={400} alt="Credit Card" />
        </div>
        <div className="border-t-4 border-yellow-500 p-4 w-4/5 mx-auto flex justify-center items-center">
          {" "}
        </div>

        <div className="bg-[#575757] p-6 rounded-lg shadow-lg w-4/5 mx-auto mt-10 text-white">
  <Typography
    variant="h5"
    gutterBottom
    className="mt-10 mb-4 text-3xl font-bold"
  >
    Your info
  </Typography>
  <Box component="form" noValidate autoComplete="off">
    <div className="text-[24px] text-white">Salary</div>
    <TextField
      type="number"
      value={salary}
      onChange={(e) => setSalary(Number(e.target.value))}
      fullWidth
      margin="normal"
      className="bg-white rounded-lg"
    />
    <div className="text-[24px] text-white">
      Max Debt for credit card
    </div>
    <TextField
      type="number"
      value={percentage}
      onChange={(e) => setPercentage(Number(e.target.value))}
      fullWidth
      margin="normal"
      className="bg-white rounded-lg"
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleRecommendation}
      className="mt-6"
    >
      Get Our Suggestion
    </Button>
  </Box>
</div>

<div className="flex gap-4 mt-10">
  <div className="bg-[#575757] p-6 rounded-lg shadow-lg w-full md:w-1/2 text-white">
    <Typography variant="h5" gutterBottom className="text-xl font-bold">
      Expenses
    </Typography>
    <Box component="form" noValidate autoComplete="off">
      <TextField
        label="Expense Description"
        type="text"
        value={expenseDescription}
        onChange={(e) => setExpenseDescription(e.target.value)}
        fullWidth
        margin="normal"
        className="bg-white rounded-lg"
      />
      <div className="text-[24px] text-white">Outcome</div>
      <TextField
        type="number"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(Number(e.target.value))}
        fullWidth
        margin="normal"
        className="bg-white rounded-lg"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
        className="mt-6"
      >
        Add Expense
      </Button>
    </Box>
    <List className="mt-6">
      {expenses.map((expense, index) => (
        <ListItem
          key={index}
          className="flex justify-between bg-gray-800 rounded-lg p-4 mb-2"
        >
          <ListItemText primary={`${expense.description}: ${expense.amount}`} />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleRemoveExpense(index)}
          >
            Remove
          </Button>
        </ListItem>
      ))}
    </List>
  </div>

  <div className="bg-[#575757] p-6 rounded-lg shadow-lg w-full md:w-1/2 text-white">
    <Typography variant="h5" gutterBottom className="text-xl font-bold">
      Available Money
    </Typography>
    <Typography className="mb-6">{availableMoney}</Typography>

    <Typography variant="h5" gutterBottom className="text-xl font-bold">
      Max Debt ({percentage}% of Salary)
    </Typography>
    <Typography className="mb-6">{maxDebt}</Typography>

    <Typography variant="h5" gutterBottom className="text-xl font-bold">
      Purchase Recommendation
    </Typography>
    <Typography className="mb-6">{recommendation}</Typography>
  </div>
</div>

<div className="bg-[#575757] p-6 rounded-lg shadow-lg w-4/5 mx-auto mt-10 text-white">
  <Typography variant="h5" gutterBottom className="mt-10 mb-4 text-xl">
    Card Recommendation by Date
  </Typography>
  <Box component="form" noValidate autoComplete="off">
    <TextField
      label="Purchase Date"
      type="text"
      value={purchaseDate}
      onChange={(e) => setPurchaseDate(e.target.value)}
      fullWidth
      margin="normal"
      className="bg-white rounded-lg"
    />
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const dayOfPurchase = new Date(purchaseDate).getDate();
        if (dayOfPurchase <= 15) {
          setRecommendation("You should use Card 1 for this purchase.");
        } else {
          setRecommendation("You should use Card 2 for this purchase.");
        }
      }}
      className="mt-6"
    >
      Calculate Best Card
    </Button>
  </Box>
</div>
</div>
      </div>

  );
};

export default App;
