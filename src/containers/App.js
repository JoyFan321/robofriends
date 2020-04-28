import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "../containers/App.css";
import Scroll from "../components/Scroll";

// Smart component
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfiled: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfiled: event.target.value });
  };

  render() {
    const { robots, searchfiled } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfiled.toLowerCase());
    });
    // 如果數量多，沒有一下子就顯示出來，可以加一個loading告知
    return !robots.length ? (
      <h1 className="tc"> It's loading, sorry for keep you waiting</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Robot Friends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;

// order will be
// 1. constructor
// 2. render
// 3. componentDidMount
// 4. render

// 為什麼會有兩個render，因為一開始是 robots:[]，是空陣列，再來執行componentDidMount
// 確定機器人加載到畫面上了，virtual DOM 知道有所更新了，於是再次執行render 將畫面繪製上去
// 以上稱組件生命週期
