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
    return getDataFromServer();
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

class Employee {
  constructor(data, create) {
    this.form = document.querySelector(".employee-form");

    this.card = document.querySelector(".card").cloneNode(true);
    this.card.id = "";

    this.id = data.id;
    this.name = data.employee_name;
    this.age = data.employee_age;
    this.salary = data.employee_salary;
    this.profile = document.querySelector(".photo").firstChild;

    this.update = this.card.querySelector(".update-btn");
    if (this.update) {
      console.log("sss");
      this.update.addEventListener("click", Employee.showForm);
    }

    this.delete = this.card.querySelector(".delete-btn");
    if (this.delete) {
      this.delete.addEventListener("click", this.deleteEmployee);
    }

    create ? this.createCard() : "";
  }

  deleteEmployee = async () => {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${this.id}`,
        {
          method: "delete",
        }
      );
      const feedback = await response.json();
      console.log(feedback.status);
      this.deleteCard();
      displayCallStatus(feedback.status, "User was deleted!", 1000);
    } catch (err) {
      console.log(err);
      displayCallStatus("error", "User was NOT deleted!", 2000);
    }
  };

  updateEmployee = async () => {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/update/${this.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            employee_name: this.name,
            employee_age: this.age,
            employee_salary: this.salary,
            profile_image: "",
          }),
        }
      );
      const feedback = await response.json();
      this.updateCard();
      displayCallStatus(
        feedback.status,
        `Employee's #${this.id} data was updated.`,
        2000
      );
    } catch (err) {
      console.log(err);
      displayCallStatus(
        "error",
        `Couldn't update data for employee #${this.id}`,
        2000
      );
    }
  };

  uploadEmployee = async () => {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            employee_name: this.name,
            employee_age: this.age,
            employee_salary: this.salary,
            profile_image: "",
          }),
        }
      );
      const feedback = await response.json();
      this.id = feedback.data.id;
      this.createCard();
    } catch (err) {
      this.uploadEmployee();
      console.log(err);
    }
  };

  createCard = () => {
    document.querySelector(".employees").appendChild(this.card);
    this.updateCard();
  };

  updateCard = () => {
    this.card.querySelector(".identifier").innerHTML = this.id;
    this.card.querySelector(".name").innerHTML = this.name;
    this.card.querySelector(".age").innerHTML = this.age;
    this.card.querySelector(".salary").innerHTML = this.salary;

    this.card.scrollIntoView();
  };

  deleteCard = () => {
    document.querySelector(".employees").removeChild(this.card);
  };

  static showForm = () => {
    console.log(this);
    //this.hideForm();
    this.form.classList.add("hover-on");
    this.form["discard-form"].addEventListener("click", this.hideForm);
    console.log(this.id);
    //this.form["submit-new-employee"].addEventListener("click", this.checkForm);

    this.form["in-name"].value = this.name;
    this.form["in-age"].value = this.age;
    this.form["in-salary"].value = this.salary;
  };

  hideForm = () => {
    const forms = document.querySelectorAll(".employee-form");
    forms.forEach((item) => {
      item.classList.remove("hover-on");
    });
  };

  checkForm = () => {
    const name = this.form["in-name"].value;
    const age = this.form["in-age"].value;
    const salary = this.form["in-salary"].value;
    const validName = !name || !/^[A-Za-z\s]*$/.test(name) ? false : true;
    const validAge = !age || isNaN(age) ? false : true;
    const validSalary = !salary || isNaN(salary) ? false : true;
    if (validName && validAge && validSalary) {
      this.submitForm(name, age, salary);
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

  submitForm = (name, age, salary) => {
    this.name = name;
    this.age = age;
    this.salary = salary;
    if (this.id) {
      this.updateEmployee();
    } else {
      this.uploadEmployee();
    }
  };
}

const emptyData = {
  id: "",
  name: "",
  age: "",
  salary: "",
};

const addEmployee = () => {
  //const employee = new Employee(emptyData, false);
  Employee.showForm();
};

const main = async () => {
  const addEmployeeBtn = document.querySelector(".add-user-btn");
  addEmployeeBtn.addEventListener("click", addEmployee);

  const data = await getDataFromServer();
  if (data) {
    for (item of data) {
      const employee = new Employee(item, true);
      console.log(employee.form);
    }
  }
};
main();
