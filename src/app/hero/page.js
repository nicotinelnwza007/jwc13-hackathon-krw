"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Function to recommend the best credit card
const recommendCard = (amount, creditCards) => {
  const suitableCards = creditCards.filter((card) => card.creditLimit >= amount);

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
  const [creditCards, setCreditCards] = useState([]);
  const [cardName, setCardName] = useState("");
  const [creditLimit, setCreditLimit] = useState(0);
  const [billingCycle, setBillingCycle] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [showPopup, setShowPopup] = useState(false); // For the popup

  // Calculate available money based on salary and expenses
  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setAvailableMoney(salary - totalExpenses);
  }, [salary, expenses]);

  // Update maximum debt based on salary and the percentage provided
  useEffect(() => {
    setMaxDebt((salary * percentage) / 100);
  }, [salary, percentage]);

  // Handle recommendation and show popup
  const handleRecommendation = () => {
    const recommendation = recommendCard(purchaseAmount, creditCards);
    setRecommendation(recommendation);
    setShowPopup(true); // Trigger the popup
  };

  // Add an expense to the list
  const handleAddExpense = () => {
    if (expenseDescription && expenseAmount > 0) {
      setExpenses([...expenses, { description: expenseDescription, amount: Number(expenseAmount) }]);
      setExpenseDescription("");
      setExpenseAmount(0);
    }
  };

  // Remove an expense from the list
  const handleRemoveExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  // Add a credit card to the list
  const handleAddCard = () => {
    if (cardName && creditLimit > 0 && billingCycle) {
      setCreditCards([...creditCards, { cardName, creditLimit: Number(creditLimit), billingCycle }]);
      setCardName("");
      setCreditLimit(0);
      setBillingCycle("");
    }
  };

  // Calculate the best card based on the purchase date
  const calculateBestCard = () => {
    const purchase = new Date(purchaseDate);
    const dayOfPurchase = purchase.getDate();

    const closingDay1 = 25;
    const closingDay2 = 20;

    let daysUntilClosing1 = closingDay1 - dayOfPurchase;
    let daysUntilClosing2 = closingDay2 - dayOfPurchase;

    if (daysUntilClosing1 < 0) {
      daysUntilClosing1 += new Date(purchase.getFullYear(), purchase.getMonth() + 1, 0).getDate();
    }

    if (daysUntilClosing2 < 0) {
      daysUntilClosing2 += new Date(purchase.getFullYear(), purchase.getMonth() + 1, 0).getDate();
    }

    if (daysUntilClosing1 < daysUntilClosing2) {
      setRecommendation("You should use the card with a closing date on the 25th.");
    } else {
      setRecommendation("You should use the card with a closing date on the 20th.");
    }
    setShowPopup(true); // Trigger the popup
  };

  // Popup for recommendation display
  const Popup = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center ">
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-bold mb-4 text-white ">Recommended Card</h3>
        <p>{recommendation}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
   <div className="container mx-auto p-4 mt-16">
  <div className="relative flex gap-[8px] p-12 justify-center items-center">
    {/* Main credit card images */}
    <Image src="/cards/Creditcard.png" width={400} height={400} alt="Credit Card" />
    <Image src="/cards/Creditcard.png" width={400} height={400} alt="Credit Card" />
  </div>

  <h1 className="text-2xl font-bold mb-4 text-white">ข้อมูลการเงินของผู้ใช้</h1>

  <div className="mb-6">
    <label className="block text-white">เงินเดือน</label>
    <input
      type="number"
      value={salary}
      onChange={(e) => setSalary(Number(e.target.value))}
      className="border p-2 w-full"
    />

    <label className="block text-white mt-4">จำนวนการซื้อ</label>
    <input
      type="number"
      value={purchaseAmount}
      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
      className="border p-2 w-full"
    />

    <label className="block text-white mt-4">เปอร์เซ็นต์หนี้สูงสุด</label>
    <input
      type="number"
      value={percentage}
      onChange={(e) => setPercentage(Number(e.target.value))}
      className="border p-2 w-full"
    />

    <button
      onClick={handleRecommendation}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
    >
      รับคำแนะนำ
    </button>
  </div>

  {/* Expenses Section */}
  <h2 className="text-xl font-semibold mb-4 text-white">ค่าใช้จ่าย</h2>

  <div className="mb-6">
    <label className="block text-white">รายละเอียดค่าใช้จ่าย</label>
    <input
      type="text"
      value={expenseDescription}
      onChange={(e) => setExpenseDescription(e.target.value)}
      className="border p-2 w-full"
    />

    <label className="block text-white mt-4">จำนวนค่าใช้จ่าย</label>
    <input
      type="number"
      value={expenseAmount}
      onChange={(e) => setExpenseAmount(Number(e.target.value))}
      className="border p-2 w-full"
    />

    <button
      onClick={handleAddExpense}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
    >
      เพิ่มค่าใช้จ่าย
    </button>
  </div>

  <ul className="mb-6">
    {expenses.map((expense, index) => (
      <li key={index} className="mb-2 flex justify-between">
        <span>{`${expense.description}: ${expense.amount}`}</span>
        <button
          onClick={() => handleRemoveExpense(index)}
          className="bg-red-500 text-white py-1 px-3 rounded"
        >
          ลบ
        </button>
      </li>
    ))}
  </ul>

  {/* Credit Card Section */}
  <h2 className="text-xl font-semibold mb-4 text-white">เพิ่มบัตรเครดิต</h2>

  <div className="mb-6">
    <label className="block text-white">ชื่อบัตร</label>
    <input
      type="text"
      value={cardName}
      onChange={(e) => setCardName(e.target.value)}
      className="border p-2 w-full"
    />

    <label className="block text-white mt-4">วงเงินเครดิต</label>
    <input
      type="number"
      value={creditLimit}
      onChange={(e) => setCreditLimit(Number(e.target.value))}
      className="border p-2 w-full"
    />

    <label className="block text-white mt-4">รอบบิล</label>
    <input
      type="text"
      value={billingCycle}
      onChange={(e) => setBillingCycle(e.target.value)}
      className="border p-2 w-full"
    />

    <button
      onClick={handleAddCard}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
    >
      เพิ่มบัตร
    </button>
  </div>

  {/* Show popup if necessary */}
  {showPopup && <Popup />}
</div>
  );
};

export default App;
