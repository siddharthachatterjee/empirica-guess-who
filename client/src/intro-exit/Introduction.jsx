import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
      <div className="text-4xl">🕵️</div>
      <h1 className="mt-3 text-2xl font-bold text-gray-900">Welcome to Guess Who?</h1>
      <p className="mt-3 text-gray-600">You and another player each receive a secret character from the same board. Take turns asking yes/no questions in the chat, mark characters off your board, and submit your guess when you are ready.</p>
      <p className="mt-3 text-sm text-gray-500">This local test lobby is set up for two players. To test both roles, join from two separate browser windows.</p>
      <Button handleClick={next} primary className="mt-6">Join game</Button>
    </div>
  );
}
