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
import plus from "@/app/hero/plus.png";
import logo from "@/app/hero/logo.png";

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
        <div className="text-4xl text-white font-bold">
          <Image src={logo} width={130} height={130} alt="Credit Card" />
        </div>
        <ul className="flex space-x-6">
          <li className="nav-item">
            <a href="/" className="text-white text-lg hover:text-yellow-400">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/calculate"
              className="text-white text-lg hover:text-yellow-400"
            >
              คำนวณ
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/about"
              className="text-white text-lg hover:text-yellow-400"
            >
              เกี่ยวกับ
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/policy"
              className="text-white text-lg hover:text-yellow-400"
            >
              นโยบาย
            </a>
          </li>
        </ul>

        <div className="text-white text-2xl font-bold">Login</div>
      </nav>
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
        <div className="flex gap-[8px] p-12 justify-center items-center">
          <Image src={creditcard} width={400} height={400} alt="Credit Card" />
          <Image src={creditcard2} width={400} height={400} alt="Credit Card" />
          <Image src={plus} width={100} height={100} alt="Add Card" />
        </div>
        <div className="border-t-4 border-yellow-500 p-4 w-4/5 mx-auto flex justify-center items-center">
          {" "}
        </div>

        <div className="flex gap-4 mt-10 p-8">
          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg w-full md:w-1/2 text-white">
            <Typography
              variant="h5"
              gutterBottom
              className=" mb-4 text-3xl font-bold"
            >
              รายได้ทั้งหมด (เดือน)
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                fullWidth
                margin="normal"
                className="bg-white rounded-lg"
              />
              <Typography
                variant="h5"
                gutterBottom
                className="text-[24px] text-white mt-6"
              >
                สัดส่วนภาระหนี้ยัตรเครดิตที่รับได้(เดือน)
              </Typography>
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
                รับคำแนะนำจากเรา
              </Button>
            </Box>
          </div>
          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg w-full md:w-1/2 text-white">
            <Typography variant="h5" gutterBottom className="text-[24px] text-white">
              ใช้จ่ายกับ
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="รายละเอียดค่าใช้จ่าย"
                type="text"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                fullWidth
                margin="normal"
                className="bg-white rounded-lg"
              />
              <Typography
                variant="h5"
                gutterBottom
                className="text-[24px] text-white mt-6"
              >
                รายจ่าย
              </Typography>
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
                เพิ่มรายละเอียดของค่าใช้จ่าย
              </Button>
            </Box>
            <List className="mt-6">
              {expenses.map((expense, index) => (
                <ListItem
                  key={index}
                  className="flex justify-between bg-white text-black rounded-lg p-4 mb-2"
                >
                  <ListItemText
                    primary={`${expense.description}: ${expense.amount} บาท`}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveExpense(index)}
                  >
                    ลบทิ้ง
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        <div className="flex gap-4 mt-10 p-8">
          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg w-full md:w-1/2 text-white">
            <Typography variant="h5" gutterBottom className="text-xl font-bold">
              ยอดเงินที่สามารถใช้ได้
            </Typography>
            <Typography className="mb-6">{availableMoney} บาท</Typography>

            <Typography variant="h5" gutterBottom className="text-xl font-bold">
              สามารถใช้เงินกับหนี้บัตรเครดิตได้ ({percentage}% of Salary)
            </Typography>
            <Typography className="mb-6">{maxDebt} บาท</Typography>

            <Typography variant="h5" gutterBottom className="text-xl font-bold">
              ควรใช้บัตรไหนรูดก่อนดี
            </Typography>
            <Typography className="mb-6">{recommendation}</Typography>
          </div>

          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg w-full md:w-1/2 text-white">
            <Typography
              variant="h5"
              gutterBottom
              className="text-xl font-bold"
            >
              วันที่รูดบัตรนั้น
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="กรอกวันที่รูดบัตร"
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
                    setRecommendation(
                      "ควรใช้บัตรอันที่ 1 ในการรูดครั้งนี้"
                    );
                  } else {
                    setRecommendation(
                      "ควรใช้บัตรอันที่ 2 ในการรูดครั้งนี้"
                    );
                  }
                }}
                className="mt-6"
              >
                หาบัตรที่ดีที่สุด
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
