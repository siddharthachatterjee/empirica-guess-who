import { usePlayer, usePlayers, useRound } from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { GuessWho } from "./examples/GuessWho";

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();

  if (player.stage.get("submit")) {
    return players.length < 2 ? <Loading /> : <div className="text-center text-gray-500">Waiting for the other player to finish…</div>;
  }
  if (players.length < 2) {
    return <div className="max-w-xl text-center rounded-xl border bg-white p-8 shadow-sm"><div className="text-3xl mb-3">👋</div><h2 className="text-xl font-semibold text-gray-800">Waiting for player 2</h2><p className="mt-2 text-gray-500">Open this game in another window and join the same two-player lobby.</p></div>;
  }

  return round.get("task") === "guesswho" ? <GuessWho /> : <div>Unknown task</div>;
}
