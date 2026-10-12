import { ClassicListenersCollector } from "@empirica/core/admin/classic";

export const Empirica = new ClassicListenersCollector();

const characterNames = [
  "Alex", "Bailey", "Casey", "Drew", "Emery", "Frankie",
  "Gray", "Harper", "Indigo", "Jordan", "Kai", "Logan",
];

Empirica.onGameStart(({ game }) => {
  const round = game.addRound({ name: "Guess Who?", task: "guesswho" });
  round.addStage({ name: "Ask and guess", duration: 1800 });

  // Give each player a different, private-to-the-game character for this round.
  const available = [...characterNames];
  for (const player of game.players) {
    const index = Math.floor(Math.random() * available.length);
    player.set("secretCharacter", available.splice(index, 1)[0]);
  }
});
