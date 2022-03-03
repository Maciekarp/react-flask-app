import React, { useState, useEffect } from 'react';
import './App.css';
import Students from './components/Students'

class CreateData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', id: '', points: ''};
    // This binding is necessary to make `this` work in the callback
    this.handleName = this.handleName.bind(this);
    this.handleID = this.handleID.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePoints = this.handlePoints.bind(this);
  }

  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleID(event) {
    this.setState({id: event.target.value});
  }
  
  handlePoints(event) {
    this.setState({points: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.name === '' || this.state.id === '' || this.state.points === ''){
      alert('The query cannot be empty')
    } else if (isNaN(this.state.id) || isNaN(this.state.points)) {
      alert('ID and Points must be integers')
    } else {
      var newStudent = {
        name: this.state.name,
        id: Number(this.state.id),
        points: Number(this.state.points)
      }
      fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });
      
      this.props.onNewStudent(newStudent)

      this.setState({name: ''});
      this.setState({id: ''});
      this.setState({points: ''});
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Create:
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleName}/>
        </label>
        <label>
          ID:
          <input type="text" value={this.state.id} onChange={this.handleID}/>
        </label>
        <label>
          Points:
          <input type="text" value={this.state.points} onChange={this.handlePoints}/>
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

function App() {
  // used to have and array of students
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch("/data").then(response =>
      response.json().then(data => {
        setStudents(data.rows);
      })
    );
  }, []); 

  // console.log(students);
  
  return (
    <div className='table'>
      <CreateData onNewStudent={student => setStudents(currentStudents => [...currentStudents, student])}/>
      <Students 
        students={students} 
        onRemoveStudent={student => setStudents(currentStudents => currentStudents.filter(curr => curr !== student))}
        onNewStudent={student => setStudents(currentStudents => [...currentStudents, student])}
      />
    </div>
  );
}

export default App;
