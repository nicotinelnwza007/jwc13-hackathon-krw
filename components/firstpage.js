import Image from "next/image";
import Link from "next/link";

import React from 'react';

export default function FirstPage() {
  return (
    <div>
      <nav className="bg-white shadow-md">
        <ul className="flex justify-around py-4">
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
          <li className="nav-item"><a href="/services" className="nav-link">Services</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>
      <Link to="/hero">
        <button>Go to Hero</button>
      </Link>

    </div>
  );
}


