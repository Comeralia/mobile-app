export class ShareService {

  firstName: string;
  lastName: string;
  restaurants: boolean = false;

  constructor() {
  }

  setRestaurants(boolVal){
    this.restaurants = boolVal
  }
  getRestaurants(){
    return this.restaurants;
  }

  setUserName(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getUserName() {
    return this.firstName + ' ' + this.lastName;
  }
}
