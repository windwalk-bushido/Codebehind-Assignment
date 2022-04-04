const main = () => {
  function Team(name, rank) {
    this.name = name;
    this.rank = rank;
    this.wins = 0;
    this.draws = 0;
    this.loses = 0;
    this.goals_given = 0;
    this.goals_received = 0;
    this.points = 0;
    this.evaluation_points = 0;
  }

  let goals_1 = null;
  let goals_2 = null;

  function GetGoals() {
    function RandomNumber() {
      const min = 0;
      const max = 8; // Ne zelim da vredjam nijedan klub ovim ali ovo je samo zbog jednostavnosti...
      return Math.floor(Math.random() * (max - min) + min);
    }

    goals_1 = RandomNumber();
    goals_2 = RandomNumber();
  }

  function GameSimulation(team1, team2, goals4team1, goals4team2) {
    team1.goals_given += goals4team1;
    team1.goals_received += goals4team2;
    team2.goals_given += goals4team2;
    team2.goals_received += goals4team1;
    if (goals4team1 > goals4team2) {
      team1.points += 3;
      team1.wins += 1;
      team2.loses += 1;
    } else if (goals4team1 === goals4team2) {
      team1.points += 1;
      team1.draws += 1;
      team2.points += 1;
      team2.draws += 1;
    } else {
      team2.points += 3;
      team2.wins += 1;
      team1.loses += 1;
    }
  }

  function PrintMatchResults(team1, team2) {
    console.log("\t" + team1 + " " + goals_1 + ":" + goals_2 + " " + team2);
  }

  function PrintGroupResults(group) {
    for (let i = 0; i < group.length; i++) {
      console.log(
        "\n" +
          group[i].name +
          " ima " +
          group[i].points +
          " poena, sa odnos golova " +
          group[i].goals_given +
          ":" +
          group[i].goals_received +
          "... evaluacioni poeni su " +
          group[i].evaluation_points
      );
    }
  }

  function SortArray(array) {
    return array.sort(function (a, b) {
      return b - a;
    });
  }

  function FindTeam(group, array_element) {
    for (let i = 0; i < group.length; i++) {
      if (array_element === group[i].evaluation_points) {
        return group[i];
      }
    }
  }

  let Katar = new Team("Katar", 11);
  let Ekvador = new Team("Ekvador", 46);
  let Senegal = new Team("Senegal", 20);
  let Holandija = new Team("Holandija", 10);
  let group_A = [Katar, Ekvador, Senegal, Holandija];

  for (let i = 0; i < group_A.length; i++) {
    switch (i) {
      case 0:
        console.log("\nGrupna faza - I kolo:\nGrupa A:");
        GetGoals();
        GameSimulation(group_A[0], group_A[1], goals_1, goals_2);
        PrintMatchResults(group_A[0].name, group_A[1].name);

        GetGoals();
        GameSimulation(group_A[2], group_A[3], goals_1, goals_2);
        PrintMatchResults(group_A[2].name, group_A[3].name);
        break;
      case 1:
        console.log("\nGrupna faza - II kolo:\nGrupa A:");
        GetGoals();
        GameSimulation(group_A[0], group_A[3], goals_1, goals_2);
        PrintMatchResults(group_A[0].name, group_A[3].name);

        GetGoals();
        GameSimulation(group_A[1], group_A[2], goals_1, goals_2);
        PrintMatchResults(group_A[1].name, group_A[2].name);
        break;
      case 2:
        console.log("\nGrupna faza - III kolo:\nGrupa A:");
        GetGoals();
        GameSimulation(group_A[0], group_A[2], goals_1, goals_2);
        PrintMatchResults(group_A[0].name, group_A[2].name);

        GetGoals();
        GameSimulation(group_A[1], group_A[3], goals_1, goals_2);
        PrintMatchResults(group_A[1].name, group_A[3].name);
        break;
    }
  }

  let temp_array = [];
  for (let i = 0; i < group_A.length; i++) {
    group_A[i].evaluation_points =
      group_A[i].points * 16 + (group_A[i].goals_given - group_A[i].goals_received) * 2 + group_A[i].goals_given;
    if (group_A[i].evaluation_points < 0) {
      group_A[i].evaluation_points = 0;
    }
    temp_array.unshift(group_A[i].evaluation_points);
  }
  PrintGroupResults(group_A);

  let sorted_array = SortArray(temp_array);

  /*
  console.log("\n");
  console.log(sorted_array);
  console.log("\n");
  */

  let group_A_winners = [];
  group_A_winners[0] = FindTeam(group_A, sorted_array[0]);
  group_A_winners[1] = FindTeam(group_A, sorted_array[1]);

  console.log("\n");
  console.log(group_A_winners);
  console.log("\n");
};

main();
