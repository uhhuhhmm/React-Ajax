import "./App.css";
import React, { Component } from "react";

class Nav extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    fetch("list.json")
      // Arrow Function 'return' 생략
      // .then((result) => result.json())
      // .then((json) => console.log(json).bind(this));

      // 기존 방식
      .then(function (result) {
        return result.json();
      })
      .then(
        function (json) {
          console.log(json);
          this.setState({ list: json });
        }.bind(this)
      );
  }
  render() {
    let listTag = [];
    for (let i = 0; i < this.state.list.length; i++) {
      let li = this.state.list[i];
      // its구분 key 넣어줘야함
      // 이벤트 발생
      listTag.push(
        <li key={li.id}>
          <a
            href={li.id}
            data-id={li.id}
            onClick={function (e) {
              e.preventDefault();
              this.props.onClick(e.target.dataset.id);
            }.bind(this)}
          >
            {li.title}
          </a>
        </li>
      );
    }
    return (
      <nav>
        <ul>{listTag}</ul>
      </nav>
    );
  }
}

// Component 만들기
class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class App extends Component {
  state = {
    article: { title: "Welcome", desc: "Hello, React & Ajax" },
  };
  render() {
    return (
      <div className="App">
        <h1>Web</h1>
        <Nav
          onClick={function (id) {
            fetch(id + ".json")
              .then(function (result) {
                return result.json();
              })
              .then(
                function (json) {
                  this.setState({
                    article: { title: json.title, desc: json.desc },
                  });
                }.bind(this)
              );
          }.bind(this)}
        />
        <Article title={this.state.article.title} desc={this.state.article.desc} />
      </div>
    );
  }
}
export default App;
