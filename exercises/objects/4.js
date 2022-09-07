const users = [
  { firstName: "Vlad", lastName: "Grecu", age: 25 },
  { firstName: "Alex", lastName: "Oancea", age: 77 },
  { firstName: "Bogdan", lastName: "Pop", age: 23 },
];

const sortedUsers = users.sort((a, b) => {
  return a.age - b.age;
});

sortedUsers.forEach((user) => {
  console.log(user.firstName + " " + user.lastName + " " + user.age);
});

function sortUsers(users) {
  let aux = {};
  const len = users.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (users[i].age > users[j].age) {
        aux = users[i];
        users[i] = users[j];
        users[j] = aux;
      }
    }
  }

  return users;
}

sortUsers(users).forEach((user) => {
  console.log(user);
});
