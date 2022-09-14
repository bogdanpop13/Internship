class Food {
  constructor(props) {
    this.name = props.name;
    this.category = props.category;
    this.calories = props.calories;
  }
}

class Carrot extends Food {
  constructor(props) {
    super(props);
    this.weight = props.weight;
  }
}

const carrot = new Carrot({
  name: "carrot",
  category: "vegetable",
  calories: 50,
  weight: 0.2,
});
console.log(carrot);
