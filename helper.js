function DecideWinner(team1, team2) {
  if (team1.points > team2.points) {
    team2 = team1;
  } else if (team1.points === team2.points) {
    let goal_difference_1 = team1.goals_given - team1.goals_received;
    let goal_difference_2 = team2.goals_given - team2.goals_received;
    if (goal_difference_1 > goal_difference_2) {
      team2 = team1;
    } else if (goal_difference_1 === goal_difference_2) {
      if (team1.goals_given > team2.goals_given) {
        team2 = team1;
      } else if (team1.goals_given === team2.goals_given) {
        for (let y = 0; y < team1.won_against.length; y++) {
          if (team1.won_against[y] === team2.name) {
            team2 = team1;
          }
        }
      }
    }
  }
}

/*
  let Argentina = new Team("Argentina", 46);
  let Saudijska_Arabija = new Team("Saudijska Arabija", 46);
  let Meksiko = new Team("Meksiko", 46);
  let Poljska = new Team("Poljska", 46);

  let Francuska = new Team("Francuska", 46);
  let Peru = new Team("Peru", 46);
  let Danska = new Team("Danska", 46);
  let Tunis = new Team("Tunis", 46);

  let Katar = new Team("Katar", 11);
  let Ekvador = new Team("Ekvador", 46);
  let Senegal = new Team("Senegal", 20);
  let Holandija = new Team("Holandija", 10);

  let Engleska = new Team("Engleska", 46);
  let Iran = new Team("Iran", 46);
  let SAD = new Team("SAD", 46);
  let Ukrajina = new Team("Ukrajina", 46);

  let Argentina = new Team("Argentina", 46);
  let Saudijska_Arabija = new Team("Saudijska Arabija", 46);
  let Meksiko = new Team("Meksiko", 46);
  let Poljska = new Team("Poljska", 46);

  let Francuska = new Team("Francuska", 46);
  let Peru = new Team("Peru", 46);
  let Danska = new Team("Danska", 46);
  let Tunis = new Team("Tunis", 46);
  */

function FindTeam(group, target, type) {
  for (let i = 0; i < group.length; i++) {
    switch (type) {
      case "points":
        if (group[i].points === target) {
          return group[i];
        }
        break;
      case "goal difference":
        let goal_difference = group[i].goals_given - group[i].goals_received;
        if (goal_difference === target) {
          return group[i];
        }
        break;
      case "goals scored":
        if (group[i].goals_given === target) {
          return group[i];
        }
        break;
      case "ranks":
        if (group[i].rank === target) {
          return group[i];
        }
        break;
    }
  }
}

function PickGroupWinners(group) {
  let points = SortArray(group);
  let winner = points[0];
  let possible_winners = [];
  let final_group = [];

  for (let i = 0; i < points.length; i++) {
    if (points[i] === winner) {
      possible_winners.push(points[i]);
    }
  }
  if (possible_winners.length === 2 || possible_winners.length === 1) {
    final_group = possible_winners;
  }
  if (possible_winners.length === 1) {
    possible_winners = [];
    winner = points[1];
    for (let i = 0; i < points.length; i++) {
      if (points[i] === winner) {
        possible_winners.push(points[i]);
      }
    }
    if (possible_winners.length === 1) {
      final_group.push(possible_winners);
    }
  }
}
