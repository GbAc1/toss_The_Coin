let userChoice = "";
let isAnimating = false;
let tossCount = 0;
let results = JSON.parse(localStorage.getItem("coinTossResults")) || [];

function startToss() {
  if (isAnimating) return;

  const coin = document.querySelector(".coin");
  const choiceButtons = document.querySelector(".choice-buttons");
  const resultText = document.getElementById("result");

  isAnimating = true;
  resultText.textContent = "";
  coin.classList.add("flipping");

  setTimeout(() => {
    choiceButtons.style.display = "flex";
  }, 1600); // Show choice buttons at the highest point

  setTimeout(() => {
    if (userChoice) {
      coin.classList.remove("flipping");
      isAnimating = false;
      const result = Math.random() < 0.5 ? "heads" : "tails";
      const didWin = userChoice === result;
      resultText.textContent = `It's ${result}! You ${
        didWin ? "won!" : "lost!"
      }`;
      choiceButtons.style.display = "none";
      tossCount++;

      // Store the result
      results.push({
        toss: tossCount,
        result: result,
        choice: userChoice,
        outcome: didWin ? "won" : "lost",
      });
      localStorage.setItem("coinTossResults", JSON.stringify(results));

      // Update the results table
      updateResultsTable();
      userChoice = "";
    }
  }, 4000); // Complete the toss after 4 seconds
}

function makeChoice(choice) {
  userChoice = choice;
  document.querySelector(".choice-buttons").style.display = "none";
}

function updateResultsTable() {
  const tbody = document.querySelector("#results-table tbody");
  tbody.innerHTML = ""; // Clear previous results

  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.toss}</td>
      <td>${result.result}</td>
      <td>${result.choice}</td>
      <td>${result.outcome}</td>
    `;
    tbody.appendChild(row);
  });
}

function resetResults() {
  results = [];
  localStorage.setItem("coinTossResults", JSON.stringify(results));
  updateResultsTable();
  document.getElementById("result").textContent = "";
}

// Update the results table on page load
document.addEventListener("DOMContentLoaded", updateResultsTable);
