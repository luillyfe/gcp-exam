import { QueryResponse } from "../definitions";

type StoreState = {
  questionIndex: number;
  currentPage: number;
  pageSize: number;
  questions: Array<QueryResponse>;
};

export class Store {
  private static instance: Store;
  private state: StoreState;

  // Private constructor to prevent external instantiation
  private constructor() {
    this.state = {
      questionIndex: -1,
      currentPage: 1,
      pageSize: 10,
      questions: [],
    };
  }

  // Public method to get the single instance of the class
  static getStore() {
    // Store the single instance in a static property
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  // Public method to set the state
  setState(state: StoreState) {
    this.state = state;
  }

  // Public method to get the state
  getState(): StoreState {
    return this.state;
  }
}
