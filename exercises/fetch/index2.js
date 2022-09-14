const getDataFromServer = async () => {
  try {
    const response = await fetch(
      "https://dummy.restapiexample.com/api/v1/employees"
    );
    const dataFromServer = await response.json();
    displayCallStatus("success", "Data import was successful!", 2000);
    return await dataFromServer.data;
  } catch (err) {
    displayCallStatus("error", err, 3000);
    getDataFromServer();
  }
};

const getDataFromServer2 = async () => {
  return new Promise((resolve, reject) => {
    fetch("https://dummy.restapiexample.com/api/v1/employees")
      .then((response) => response.json())
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const sendDataToServer = async () => {
  try {
    const response = await fetch(
      "https://dummy.restapiexample.com/api/v1/create",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          employee_name: "test",
          employee_salary: "123",
          employee_age: "23",
        }),
      }
    );
    const data = await response.json();
    console.log("sent data", data);
    const data2 = await getDataFromServer();
    console.log("get data", data2);
  } catch (err) {
    console.log(err);
  }
};

const displayCallStatus = (type, msg, timeout) => {
  const body = document.querySelector("body");
  const banner = document.createElement("div");
  const dismiss = document.createElement("div");

  banner.classList.add("banner");
  banner.classList.add(type === "error" ? "error" : "success");
  banner.innerHTML = `${msg}. ${type === "error" ? "Try Again!" : "Thanks"}`;

  dismiss.innerHTML = "Dismiss";
  dismiss.classList.add("button");
  dismiss.addEventListener("click", () => {
    body.removeChild(banner);
  });

  banner.appendChild(dismiss);
  body.appendChild(banner);

  if (banner) {
    setTimeout(() => {
      body.removeChild(banner);
    }, timeout);
  }
};

const displayForm = () => {};

class EmployeeCard {
  constructor(data) {
    this.form = document.querySelector(".employee-form");

    this.card = document.querySelector(".card").cloneNode(true);
    this.card.id = "";
    this.profile = this.card.querySelector(".photo");
    this.identifier = this.card.querySelector(".identifier");
    this.name = this.card.querySelector(".name");
    this.age = this.card.querySelector(".age");
    this.salary = this.card.querySelector(".salary");

    this.update = this.card.querySelector(".update-btn");
    if (this.update) {
      this.update.addEventListener("click", this.pullUpPrefilledForm);
    }

    this.delete = this.card.querySelector(".delete-btn");
    if (this.delete) {
      this.delete.addEventListener("click", this.deleteCard);
    }

    this.identifier.innerHTML = data.id;
    this.age.innerHTML = data.employee_age;
    this.name.innerHTML = data.employee_name;
    this.salary.innerHTML = data.employee_salary;
    this.profile.innerHTML = data.profile_image
      ? data.profile_image
      : this.profile.innerHTML;
  }

  updateCard = async (data, display) => {
    if (data) {
      this.identifier.innerHTML = data.id;
      this.age.innerHTML = data.employee_age;
      this.name.innerHTML = data.employee_name;
      this.salary.innerHTML = data.employee_salary;
      this.profile.innerHTML = data.profile_image
        ? data.profile_image
        : this.profile.innerHTML;
    }
    if (display) {
      this.displayCard();
    }
  };

  displayCard = () => {
    const employees = document.querySelector(".employees");
    employees.appendChild(this.card);
  };

  deleteCard = async () => {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${this.identifier.innerHTML}`,
        {
          method: "delete",
        }
      );
      const data = await response.json();
      console.log(data);
      const employees = document.querySelector(".employees");
      employees.removeChild(this.card);

      displayCallStatus("success", "User was deleted!", 2000);
    } catch (err) {
      console.log(err);
      displayCallStatus("error", err, 3000);
    }
  };

  uploadNewCard = async (entries) => {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(entries),
        }
      );
      const feedback = await response.json();
      this.identifier.innerHTML = feedback.data.id;
      entries.id = feedback.data.id;
      this.updateCard(entries, true);
    } catch (err) {
      this.uploadNewCard(entries);
      console.log(err);
    }
  };

  getCardDataAsObject = async () => {
    return {
      id: this.identifier.innerHTML,
      employee_name: this.name.innerHTML,
      employee_age: this.age.innerHTML,
      employee_salary: this.salary.innerHTML,
      profile_image: this.profile,
    };
  };

  updateFromForm = () => {
    const name = document.getElementById("in-name").value;
    const age = document.getElementById("in-age").value;
    const salary = document.getElementById("in-salary").value;
    const picture = document.getElementById("in-picture").value;

    this.name.innerHTML = name;
    this.age.innerHTML = age;
    this.salary.innerHTML = salary;
    this.updateById();
  };

  showForm = () => {
    const form = document.querySelector(".collapsible-form");
    form.classList.remove("hover-on");
    form.style.transform = "translateY(0px)";
    form.style.transition = "0.5s";
  };

  toggleForm = (state) => {
    const form = document.querySelector(".employee-form");
    console.log(form.elements);
    if (state) {
      form.classList.add("hover-on");
    } else {
      form.classList.remove("hover-on");
      form.reset();
    }
  };

  pullUpPrefilledForm = () => {
    pullUpForm();
    const form = document.querySelector(".employee-form");

    const name = form.querySelector("#in-name");
    name.value = this.name.innerHTML;

    const salary = form.querySelector("#in-salary");
    salary.value = this.salary.innerHTML;

    const age = form.querySelector("#in-age");
    age.value = this.age.innerHTML;

    const picture = form.querySelector("#in-picture");
    picture.value = "";

    const submit = form.querySelector("#submit-new-employee");
    submit.removeEventListener("click", submitNewEmployee);
    submit.addEventListener("click", this.updateFromForm);
  };

  updateById = async () => {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/update/${this.identifier.innerHTML}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            employee_name: this.name.innerHTML,
            employee_age: this.age.innerHTML,
            employee_salary: this.salary.innerHTML,
            profile_image: "",
          }),
        }
      );
      const feedback = await response.json();
      displayCallStatus(
        "success",
        `Employee's ${this.identifier.innerHTML} data was updated successfully!`,
        3000
      );
    } catch (err) {
      console.log(err);
      displayCallStatus(
        "error",
        `Couldn't update data for employee ${this.identifier.innerHTML}`,
        3000
      );
    }
  };

  discardForm = () => {};
}

const checkFormData = (name, age, salary) => {
  const validName = !name || !/^[A-Za-z\s]*$/.test(name) ? false : true;
  const validAge = !age || !isNaN(age) ? false : true;
  const validSalary = !salary || !isNaN(salary) ? false : true;
  if (validName && validAge && validSalary) {
    return true;
  } else {
    displayCallStatus(
      "error",
      `Please provide valid data for the following fields: 
          ${!validName ? " Name " : " "} 
          ${!validAge ? " Age " : " "}
          ${!validSalary ? " Salary " : " "} and try again!`,
      3000
    );
  }
};

const submitNewEmployee = async () => {
  const name = document.getElementById("in-name").value;
  const age = document.getElementById("in-age").value;
  const salary = document.getElementById("in-salary").value;
  const picture = document.getElementById("in-picture").value;
  const data = {
    employee_name: name,
    employee_age: age,
    employee_salary: salary,
    profile_image: "",
  };
  const newCard = new EmployeeCard();
  newCard.uploadNewCard(data);
  newCard.form.addEventListener("submit");
};

const discardForm = async () => {
  const form = document.querySelector(".collapsible-form");
  form.style.transform = "translateY(120px)";
  form.style.transition = "0.5s";
  form.classList.add("hover-on");

  const name = form.querySelector("#in-name");
  name.value = "";

  const salary = form.querySelector("#in-salary");
  salary.value = "";

  const age = form.querySelector("#in-age");
  age.value = "";

  const picture = form.querySelector("#in-picture");
  picture.value = "";
};

const pullUpForm = async () => {
  const form = document.querySelector(".collapsible-form");
  form.classList.remove("hover-on");
  form.style.transform = "translateY(0px)";
  form.style.transition = "0.5s";

  const name = form.querySelector("#in-name");
  name.value = "";

  const salary = form.querySelector("#in-salary");
  salary.value = "";

  const age = form.querySelector("#in-age");
  age.value = "";

  const picture = form.querySelector("#in-picture");
  picture.value = "";

  const submitBtn = document.querySelector("#submit-new-employee");
  submitBtn.addEventListener("click", submitNewEmployee);
};

const createEmptyCard = () => {
  const card = new EmployeeCard();
  card.pullUpPrefilledForm();
  card.displayCard();
  console.log(card.identifier.innerHTML);
};

const main = async () => {
  const discardBtn = document.querySelector("#discard-form");
  discardBtn.addEventListener("click", discardForm);

  const addEmployeeBtn = document.querySelector(".add-user-btn");
  addEmployeeBtn.addEventListener("click", pullUpForm);

  const data = await getDataFromServer();
  if (data) {
    for (item of data) {
      const card = new EmployeeCard(item);
      card.updateCard(item, false);
      card.displayCard();
      card.toggleForm(true);
    }
  }
};
main();
