import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button";

const characters = [
  { name: "Alex", hair: "Black", eyes: "Brown", accessory: "Glasses", emoji: "🧑🏽‍🦱" },
  { name: "Bailey", hair: "Blonde", eyes: "Blue", accessory: "Hat", emoji: "👱🏻‍♀️" },
  { name: "Casey", hair: "Red", eyes: "Green", accessory: "Earrings", emoji: "👩🏻‍🦰" },
  { name: "Drew", hair: "Brown", eyes: "Brown", accessory: "None", emoji: "👨🏽" },
  { name: "Emery", hair: "Black", eyes: "Blue", accessory: "Earrings", emoji: "👩🏾‍🦱" },
  { name: "Frankie", hair: "Gray", eyes: "Green", accessory: "Glasses", emoji: "🧓🏻" },
  { name: "Gray", hair: "Blonde", eyes: "Brown", accessory: "None", emoji: "👨🏼‍🦱" },
  { name: "Harper", hair: "Brown", eyes: "Blue", accessory: "Hat", emoji: "👩🏻" },
  { name: "Indigo", hair: "Black", eyes: "Green", accessory: "Hat", emoji: "👨🏿" },
  { name: "Jordan", hair: "Red", eyes: "Brown", accessory: "Glasses", emoji: "👨🏻‍🦰" },
  { name: "Kai", hair: "Gray", eyes: "Blue", accessory: "Earrings", emoji: "👵🏻" },
  { name: "Logan", hair: "Brown", eyes: "Green", accessory: "Glasses", emoji: "🧔🏽" },
];

export function GuessWho() {
  const player = usePlayer();
  const players = usePlayers();
  const opponent = players.find((p) => p.id !== player.id);
  const [eliminated, setEliminated] = useState([]);
  const [selected, setSelected] = useState("");
  const secret = characters.find((c) => c.name === player.get("secretCharacter"));
  const guess = player.round.get("finalGuess");
  const submitted = player.round.get("guessSubmitted");
  const won = player.round.get("won");
  const otherGuess = opponent?.round.get("finalGuess");
  const otherSubmitted = opponent?.round.get("guessSubmitted");

  function submitGuess() {
    if (!selected || submitted) return;
    player.round.set("finalGuess", selected);
    player.round.set("won", selected === opponent?.get("secretCharacter"));
    player.round.set("guessSubmitted", true);
  }

  return (
    <main className="w-full max-w-6xl p-4 md:p-8 text-gray-800">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Guess Who?</p><h1 className="text-2xl font-bold">Ask questions. Find their character.</h1></div>
        <div className="rounded-xl bg-indigo-50 px-4 py-3 text-sm"><span className="text-gray-500">Your secret character</span><div className="font-bold">{secret ? `${secret.emoji} ${secret.name}` : "Assigning…"}</div></div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <section className="rounded-2xl border bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 className="font-semibold">Character board</h2><span className="text-xs text-gray-500">Click a card to eliminate or restore it</span></div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {characters.map((c) => {
              const out = eliminated.includes(c.name);
              return <button key={c.name} onClick={() => setEliminated(out ? eliminated.filter((n) => n !== c.name) : [...eliminated, c.name])} className={`rounded-xl border p-3 text-center transition hover:border-indigo-400 ${out ? "bg-gray-100 opacity-40 grayscale" : "bg-white"}`} aria-pressed={out}>
                <div className="text-4xl" role="img" aria-label={c.name}>{c.emoji}</div><div className="mt-1 font-semibold">{c.name}</div><div className="mt-1 text-[11px] leading-4 text-gray-500">{c.hair} hair · {c.eyes} eyes<br />{c.accessory === "None" ? "No accessory" : c.accessory}</div>
              </button>;
            })}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border bg-white p-5 shadow-sm"><h2 className="font-semibold">How to play</h2><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-600"><li>Ask your opponent a yes/no question in chat.</li><li>Use their answer to eliminate characters.</li><li>Select who you think their secret character is and submit.</li></ol></section>
          <section className="rounded-2xl border bg-white p-5 shadow-sm"><h2 className="font-semibold">Make your guess</h2>
            {!submitted ? <><label htmlFor="character-guess" className="mt-3 block text-sm text-gray-600">Who is your opponent’s character?</label><select id="character-guess" value={selected} onChange={(e) => setSelected(e.target.value)} className="mt-2 w-full rounded-lg border p-2"><option value="">Choose a character…</option>{characters.map((c) => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}</select><Button handleClick={submitGuess} primary className="mt-3 w-full justify-center">Lock in guess</Button></> : <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm"><div>Your guess: <strong>{guess}</strong></div><div className={won ? "text-green-700" : "text-rose-700"}>{won ? "Correct! You win!" : "Not quite — your opponent wins."}</div></div>}
            {otherSubmitted && <div className="mt-3 border-t pt-3 text-sm"><div>Opponent guessed: <strong>{otherGuess}</strong></div><div>{otherGuess === secret?.name ? "They got it right!" : "They didn’t get it."}</div></div>}
          </section>
          <p className="text-xs text-gray-500">Your character: {secret ? `${secret.emoji} ${secret.name}` : "loading"}. Keep it secret!</p>
        </aside>
      </div>
    </main>
  );
}
