const getLeaguesAndClasses = () => {
  const characterListDom = document.querySelector(".inventoryManagerMenu");
  const characters = Array.from(
    characterListDom.querySelectorAll(".character")
  );
  const leagues = new Set(
    characters.map((character) => {
      const league = character.querySelector(".infoLine3").textContent;
      return league;
    })
  );
  const classes = new Set(
    characters.map((character) => {
      const c = character.querySelector(".infoLine2").textContent.split(" ")[2];
      return c;
    })
  );
  return { leagues, classes };
};

const filtering = () => {
  // filter characters by league and class
  const leagueFilter = document.querySelector(".lfilter");
  const classFilter = document.querySelector(".cfilter");
  const characterListDom = document.querySelector(".inventoryManagerMenu");
  const characters = Array.from(
    characterListDom.querySelectorAll(".character")
  );
  const league = leagueFilter.value;
  const c = classFilter.value;
  characters.forEach((character) => {
    const leagueDom = character.querySelector(".infoLine3");
    const classDom = character.querySelector(".infoLine2");
    if (league === "All Leagues" && c === "All Classes") {
      character.style.display = "block";
    } else if (league === "All Leagues" && c !== "All Classes") {
      if (classDom.textContent.includes(c)) {
        character.style.display = "block";
      } else {
        character.style.display = "none";
      }
    } else if (league !== "All Leagues" && c === "All Classes") {
      if (leagueDom.textContent === league) {
        character.style.display = "block";
      } else {
        character.style.display = "none";
      }
    } else {
      if (
        leagueDom.textContent === league &&
        classDom.textContent.includes(c)
      ) {
        character.style.display = "block";
      } else {
        character.style.display = "none";
      }
    }
  });
};

const addFilter = (leagues, classes) => {
  const charactorListDom = document.querySelector(".inventoryManagerMenu");
  const leagueFilter = document.createElement("select");
  const classFilter = document.createElement("select");
  leagueFilter.className = "lfilter";
  classFilter.className = "cfilter";
  leagueFilter.innerHTML = "<option>All Leagues</option>";
  classFilter.innerHTML = "<option>All Classes</option>";
  leagueFilter.onchange = filtering;
  classFilter.onchange = filtering;
  leagues.forEach((league) => {
    const option = document.createElement("option");
    option.value = league;
    option.textContent = league;
    leagueFilter.appendChild(option);
  });
  classes.forEach((c) => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    classFilter.appendChild(option);
  });
  charactorListDom.appendChild(leagueFilter);
  charactorListDom.appendChild(classFilter);
};

const main = async () => {
  setTimeout(() => {
    const { leagues, classes } = getLeaguesAndClasses();
    addFilter(leagues, classes);
  }, 1000); // waiting for the page to load
};

main();
