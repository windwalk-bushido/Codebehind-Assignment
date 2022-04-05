const main = () => {
  function Team(name, rank, group) {
    this.name = name;
    this.rank = rank;
    this.group = group;
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

  function PrintGroupMatchResults(team1, team2) {
    console.log("\t\t" + team1 + " " + goals_1 + ":" + goals_2 + " " + team2);
  }

  function PrintGroupResults(group) {
    for (let i = 0; i < group.length; i++) {
      console.log(
        "\n" +
          (i + 1) +
          ". " +
          group[i].name +
          " (" +
          group[i].rank +
          ")\t\t" +
          group[i].wins +
          "  " +
          group[i].draws +
          "  " +
          group[i].loses +
          "  " +
          group[i].goals_given +
          ":" +
          group[i].goals_received +
          "  " +
          group[i].points +
          "  " +
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

  function CalculateEvaluationPoints(group) {
    let temp_array = [];
    for (let i = 0; i < group.length; i++) {
      group[i].evaluation_points =
        group[i].points * 16 +
        (group[i].goals_given - group[i].goals_received) * 2 +
        group[i].goals_given * 0.25 +
        group[i].rank * -0.03125;
      if (group[i].evaluation_points < 0) {
        group[i].evaluation_points = 0;
      }
      temp_array.unshift(group[i].evaluation_points);
    }
    return temp_array;
  }

  function PickGroupWinners(group, sorted_list) {
    let group_winners = [];
    group_winners[0] = FindTeam(group, sorted_list[0]);
    group_winners[1] = FindTeam(group, sorted_list[1]);

    return group_winners;
  }

  function ShiftGroup(group, sorted_list) {
    let shifted_group = [];
    for (let i = 0; i < group.length; i++) {
      for (let y = 0; y < group.length; y++) {
        if (sorted_list[i] === group[y].evaluation_points) {
          shifted_group[i] = group[y];
        }
      }
    }
    return shifted_group;
  }

  function PrintGroupWinners(group) {
    console.log("\nIz grupe " + group[0].group + " prolaze: " + group[0].name + ", " + group[1].name + ".\n");
  }

  // App

  const Katar = new Team("Katar", 51, "A");
  const Ekvador = new Team("Ekvador", 46, "A");
  const Senegal = new Team("Senegal", 20, "A");
  const Holandija = new Team("Holandija", 10, "A");
  let group_A = [Katar, Ekvador, Senegal, Holandija];

  const Engleska = new Team("Engleska", 5, "B");
  const Iran = new Team("Iran", 21, "B");
  const SAD = new Team("SAD", 15, "B");
  const Ukrajina = new Team("Ukrajina", 27, "B");
  let group_B = [Engleska, Iran, SAD, Ukrajina];

  for (let i = 0; i < group_A.length; i++) {
    switch (i) {
      case 0:
        console.log("\nGrupna faza - I kolo:\n\tGrupa A:");
        GetGoals();
        GameSimulation(group_A[0], group_A[1], goals_1, goals_2);
        PrintGroupMatchResults(group_A[0].name, group_A[1].name);

        GetGoals();
        GameSimulation(group_A[2], group_A[3], goals_1, goals_2);
        PrintGroupMatchResults(group_A[2].name, group_A[3].name);
        break;
      case 1:
        console.log("\nGrupna faza - II kolo:\n\tGrupa A:");
        GetGoals();
        GameSimulation(group_A[0], group_A[3], goals_1, goals_2);
        PrintGroupMatchResults(group_A[0].name, group_A[3].name);

        GetGoals();
        GameSimulation(group_A[1], group_A[2], goals_1, goals_2);
        PrintGroupMatchResults(group_A[1].name, group_A[2].name);
        break;
      case 2:
        console.log("\nGrupna faza - III kolo:\n\tGrupa A:");
        GetGoals();
        GameSimulation(group_A[0], group_A[2], goals_1, goals_2);
        PrintGroupMatchResults(group_A[0].name, group_A[2].name);

        GetGoals();
        GameSimulation(group_A[1], group_A[3], goals_1, goals_2);
        PrintGroupMatchResults(group_A[1].name, group_A[3].name);
        break;
    }
  }

  let list_of_eval_points = CalculateEvaluationPoints(group_A);
  let sorted_list = SortArray(list_of_eval_points);
  group_A = ShiftGroup(group_A, sorted_list);

  let group_A_winners = PickGroupWinners(group_A, sorted_list);
  PrintGroupResults(group_A);
  PrintGroupWinners(group_A_winners);
};

main();
