const user = {
  firstName: "Vlad",
  lastName: "Grecu",
  age: 23,
};

const { firstName, lastName } = user;

const getUserFullName = (user) => `${user.firstName} ${user.lastName}`;

const getUserFullName2 = user.firstName + " " + user.lastName;

console.log(getUserFullName(user));
