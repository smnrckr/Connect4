var player1, player2;
const player = [];
var currentPlayer = player[0];
var winner = 0;
var count = 0;

function playerId() {
  let choosingColor = Math.floor(Math.random() * 10 + 1);
  let color = choosingColor > 5 ? "red" : "yellow";
  let Choosingbeginner = Math.floor(Math.random() * 10 + 1);
  player1 = color;
  let text1;
  let text2;
  if (player1 === "red") {
    player2 = "yellow";

    document.getElementById("player1").style.backgroundColor = "red";
    document.getElementById("player2").style.backgroundColor = "yellow";
  } else if (player1 === "yellow") {
    player2 = "red";

    document.getElementById("player1").style.backgroundColor = "yellow";
    document.getElementById("player2").style.backgroundColor = "red";
  }

  if (Choosingbeginner > 5) {
    player[0] = player1;
    player[1] = player2;
    text1 = document.getElementById("player1");
    text2 = document.getElementById("player2");
    document.getElementById(
      "playerTurn1"
    ).innerHTML = `İlk hamle: ${text1.textContent}`;
    document.getElementById(
      "playerTurn2"
    ).innerHTML = `İkinci hamle: ${text2.textContent} `;
  } else {
    text1 = document.getElementById("player2");
    text2 = document.getElementById("player1");
    player[0] = player2;
    player[1] = player1;
    document.getElementById(
      "playerTurn1"
    ).innerHTML = `İlk hamle: ${text1.textContent} `;
    document.getElementById(
      "playerTurn2"
    ).innerHTML = `İkinci hamle:  ${text2.textContent}`;
  }
}
playerId();

$(".cell").each(function () {
  $(this).attr("id", count);
  $(this).attr("data-player", 0);
  count++;
  $(this).click(function () {
    if (isValid($(this).attr("id"))) {
      if (currentPlayer === player[0]) {
        $(this).css("background-color", currentPlayer);
        $(this).attr("data-player", currentPlayer);
        console.log(
          `${currentPlayer} renkli oyuncu ${$(this).attr(
            "id"
          )} numaralı slota hamle yaptı.`
        );
        const logEntry = `${currentPlayer} renkli oyuncu ${$(this).attr(
          "id"
        )} numaralı slota hamle yaptı.`;
        fetch("/logs", {
          method: "POST",
          body: JSON.stringify(logEntry),
          headers: { "Content-Type": "application/json" },
        });
        if (checkWin(currentPlayer)) {
          alert(currentPlayer + " renkli oyuncu kazandı!");
          winner = 1;
          fetch('/clear-logs', { method: 'GET' });
        }
        currentPlayer = player[1];
      } else {
        if (isValid($(this).attr("id"))) {
          $(this).css("background-color", currentPlayer);
          $(this).attr("data-player", currentPlayer);
          console.log(
            `${currentPlayer}  renkli oyuncu ${$(this).attr(
              "id"
            )} numaralı slota hamle yaptı.`
          );
          const logEntry = `${currentPlayer} renkli oyuncu ${$(this).attr(
            "id"
          )} numaralı slota hamle yaptı.`;
          fetch("/logs", {
            method: "POST",
            body: JSON.stringify(logEntry),
            headers: { "Content-Type": "application/json" },
          });

          if (checkWin(currentPlayer)) {
            alert(currentPlayer + " renkli oyuncu kazandı!");
            winner = 1;
            fetch('/clear-logs', { method: 'GET' });
          }
        }
        currentPlayer = player[0];
      }
    }
  });
});

function isValid(n) {
  var id = parseInt(n);
  if (winner !== 0) {
    return false;
  }
  if ($("#" + id).attr("data-player") === "0") {
    if (id >= 72) {
      return true;
    }
    if ($("#" + (id + 9)).attr("data-player") !== "0") {
      return true;
    }
  }
  return false;
}

function checkWin(p) {
  var chain = 0;
  for (var i = 0; i < 81; i += 9) {
    for (var j = 0; j < 9; j++) {
      var cell = $("#" + (i + j));
      if (cell.attr("data-player") == p) {
        chain++;
      } else {
        chain = 0;
      }

      if (chain >= 4) {
        return true;
      }
    }
    chain = 0;
  }

  chain = 0;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 81; j += 9) {
      var cell = $("#" + (i + j));
      if (cell.attr("data-player") == p) {
        chain++;
      } else {
        chain = 0;
      }

      if (chain >= 4) {
        return true;
      }
    }
    chain = 0;
  }

  var topLeft = 0;
  var topRight = topLeft + 4;

  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 8; j++) {
      if (
        $("#" + topLeft).attr("data-player") == p &&
        $("#" + (topLeft + 10)).attr("data-player") == p &&
        $("#" + (topLeft + 20)).attr("data-player") == p &&
        $("#" + (topLeft + 30)).attr("data-player") == p
      ) {
        return true;
      }

      if (
        $("#" + topRight).attr("data-player") == p &&
        $("#" + (topRight + 8)).attr("data-player") == p &&
        $("#" + (topRight + 16)).attr("data-player") == p &&
        $("#" + (topRight + 24)).attr("data-player") == p
      ) {
        return true;
      }

      topLeft++;
      topRight = topLeft + 4;
    }
    topLeft = i * 9 + 8;
    topRight = topLeft + 4;
  }

  return false;
}
