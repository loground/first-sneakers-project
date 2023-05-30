import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

  this.voteFor = this.voteFor.bind(this);
  this.voteAgainst = this.voteAgainst.bind(this);
  }

  voteFor () {
    this.setState( state => ({
    count: this.state.count + 1,
     }));
  }

  voteAgainst () {
    this.setState( state => ({
    count: this.state.count - 1,
     }));
  }

  render() {
    return (
      <div className='max'>
        <button onClick={(this.voteFor)}>Стопудова очень круто, могу смотреть</button>
        <button onClick={(this.voteAgainst)}>Стопудова уже не могу смотреть</button>
        <h1>Сколько поддержки у этого? : {this.state.count} </h1>
      </div>
    );
  }
}

export default App;