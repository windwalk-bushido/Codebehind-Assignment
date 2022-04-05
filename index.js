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

  function SimulateMatch(team1, team2, goals4team1, goals4team2) {
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

  function SimulateGroupMatches(group, round) {
    console.log("\tGrupa " + group[0].group + ":");
    switch (round) {
      case 0:
        GetGoals();
        SimulateMatch(group[0], group[1], goals_1, goals_2);
        PrintGroupMatchResults(group[0].name, group[1].name);

        GetGoals();
        SimulateMatch(group[2], group[3], goals_1, goals_2);
        PrintGroupMatchResults(group[2].name, group[3].name);
        break;
      case 1:
        GetGoals();
        SimulateMatch(group[0], group[3], goals_1, goals_2);
        PrintGroupMatchResults(group[0].name, group[3].name);

        GetGoals();
        SimulateMatch(group[1], group[2], goals_1, goals_2);
        PrintGroupMatchResults(group[1].name, group[2].name);
        break;
      case 2:
        GetGoals();
        SimulateMatch(group[0], group[2], goals_1, goals_2);
        PrintGroupMatchResults(group[0].name, group[2].name);

        GetGoals();
        SimulateMatch(group[1], group[3], goals_1, goals_2);
        PrintGroupMatchResults(group[1].name, group[3].name);
        break;
    }
  }

  function PrintGroupResults(group) {
    for (let i = 0; i < group.length; i++) {
      console.log(
        "\t" +
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
          group[i].points
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
        group[i].evaluation_points = (group[i].evaluation_points * -1) / 100;
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
    console.log("\nIz grupe " + group[0].group + " prolaze: " + group[0].name + ", " + group[1].name);
  }

  function RoundupResults(group, winners_group) {
    list_of_eval_points = CalculateEvaluationPoints(group);
    sorted_list = SortArray(list_of_eval_points);
    group = ShiftGroup(group, sorted_list);
    winners_group = PickGroupWinners(group, sorted_list);
    console.log("\n\nGrupa " + group[0].group);
    PrintGroupResults(group);
    PrintGroupWinners(winners_group);
    winners_group[0].group += "1";
    winners_group[1].group += "2";
    return winners_group;
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

  const Argentina = new Team("Argentina", 4, "C");
  const Saudijska_Arabija = new Team("Saudijska Arabija", 49, "C");
  const Meksiko = new Team("Meksiko", 9, "C");
  const Poljska = new Team("Poljska", 26, "C");
  let group_C = [Argentina, Saudijska_Arabija, Meksiko, Poljska];

  const Francuska = new Team("Francuska", 3, "D");
  const Peru = new Team("Peru", 22, "D");
  const Danska = new Team("Danska", 11, "D");
  const Tunis = new Team("Tunis", 35, "D");
  let group_D = [Francuska, Peru, Danska, Tunis];

  const Spanija = new Team("Spanija", 7, "E");
  const Novi_Zeland = new Team("Novi Zeland", 101, "E");
  const Nemacka = new Team("Nemacka", 12, "E");
  const Japan = new Team("Japan", 23, "E");
  let group_E = [Spanija, Novi_Zeland, Nemacka, Japan];

  const Belgija = new Team("Belgija", 2, "F");
  const Kanada = new Team("Kanada", 38, "F");
  const Maroko = new Team("Maroko", 24, "F");
  const Hrvatska = new Team("Hrvatska", 16, "F");
  let group_F = [Belgija, Kanada, Maroko, Hrvatska];

  const Brazil = new Team("Brazil", 1, "G");
  const Srbija = new Team("Srbija", 25, "G");
  const Svajcarska = new Team("Svajcarska", 14, "G");
  const Kamerun = new Team("Kamerun", 37, "G");
  let group_G = [Brazil, Srbija, Svajcarska, Kamerun];

  const Portugal = new Team("Portugal", 8, "H");
  const Gana = new Team("Gana", 60, "H");
  const Urugvaj = new Team("Urugvaj", 13, "H");
  const Juzna_Koreja = new Team("Juzna Koreja", 29, "H");
  let group_H = [Portugal, Gana, Urugvaj, Juzna_Koreja];

  for (let i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        console.log("\nGrupna faza - I kolo:");
        SimulateGroupMatches(group_A, i);
        SimulateGroupMatches(group_B, i);
        SimulateGroupMatches(group_C, i);
        SimulateGroupMatches(group_D, i);
        SimulateGroupMatches(group_E, i);
        SimulateGroupMatches(group_F, i);
        SimulateGroupMatches(group_G, i);
        SimulateGroupMatches(group_H, i);
        break;
      case 1:
        console.log("\nGrupna faza - II kolo:");
        SimulateGroupMatches(group_A, i);
        SimulateGroupMatches(group_B, i);
        SimulateGroupMatches(group_C, i);
        SimulateGroupMatches(group_D, i);
        SimulateGroupMatches(group_E, i);
        SimulateGroupMatches(group_F, i);
        SimulateGroupMatches(group_G, i);
        SimulateGroupMatches(group_H, i);
        break;
      case 2:
        console.log("\nGrupna faza - III kolo:");
        SimulateGroupMatches(group_A, i);
        SimulateGroupMatches(group_B, i);
        SimulateGroupMatches(group_C, i);
        SimulateGroupMatches(group_D, i);
        SimulateGroupMatches(group_E, i);
        SimulateGroupMatches(group_F, i);
        SimulateGroupMatches(group_G, i);
        SimulateGroupMatches(group_H, i);
        break;
    }
  }

  let group_A_winners = [];
  let group_B_winners = [];
  let group_C_winners = [];
  let group_D_winners = [];
  let group_E_winners = [];
  let group_F_winners = [];
  let group_G_winners = [];
  let group_H_winners = [];

  let list_of_eval_points = [];
  let sorted_list = [];

  console.log("\nKraj grupne faze...");

  for (let i = 0; i < 8; i++) {
    switch (i) {
      case 0:
        group_A_winners = RoundupResults(group_A, group_A_winners);
        break;
      case 1:
        group_B_winners = RoundupResults(group_B, group_B_winners);
        break;
      case 2:
        group_C_winners = RoundupResults(group_C, group_C_winners);
        break;
      case 3:
        group_D_winners = RoundupResults(group_D, group_D_winners);
        break;
      case 4:
        group_E_winners = RoundupResults(group_E, group_E_winners);
        break;
      case 5:
        group_F_winners = RoundupResults(group_F, group_F_winners);
        break;
      case 6:
        group_G_winners = RoundupResults(group_G, group_G_winners);
        break;
      case 7:
        group_H_winners = RoundupResults(group_H, group_H_winners);
        break;
    }
  }
};

main();
