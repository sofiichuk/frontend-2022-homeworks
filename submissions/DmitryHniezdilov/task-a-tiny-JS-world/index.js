/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/DmitryHniezdilov/task-a-tiny-JS-world/tree/task-a-tiny-JS-world
   Web app: https://dmitryhniezdilov.github.io/task-a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const dog = {
  species: "dog",
  name: "Togo",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof-woof!",
};

const cat = {
  species: "cat",
  name: "Murka",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "meow-meow!",
};

const bear = {
  species: "character",
  name: "Winnie",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Think, think, think!",
};

const man = {
  species: "human",
  name: "Artur",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Do not borrow tomorrow's troubles today.",
};

const woman = {
  species: "human",
  name: "Marilyn",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "A career is born in public – talent in privacy.",
};

const listOfInhabitants = [dog, cat, bear, man, woman];

// ======== OUTPUT ========

listOfInhabitants.forEach((item) => {
  const listOfProps = ["species", "name", "gender", "legs", "hands", "saying"];
  const listOfValues = listOfProps.reduce((str, prop) => {
    return (str += `${item[prop]}; `);
  }, "");
  print(listOfValues);
});
