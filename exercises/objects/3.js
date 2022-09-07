const user = {
  firstName: "Vlad",
  lastName: "Grecu",
  age: 23,
};

const getUserFullName = (user) => {
  return user.firstName + " " + user.lastName;
};

const getUserFullName2 = user.firstName + " " + user.lastName;

console.log(getUserFullName(user));
