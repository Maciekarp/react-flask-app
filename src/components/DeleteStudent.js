import React from 'react';

class DeleteStudent extends React.Component {
    constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      if(this.props.selected.length === 0) {
          alert('Select rows to be deleted');
      } else {
          this.props.selected.forEach(row => {
              var removeStudent = {
                  id: Number(row.id)
              }
              fetch('/remove', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(removeStudent)
              });
              this.props.onRemoveStudent(row);
          });
      }
      event.preventDefault();
    }
  
    render(){
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="Remove Selected" />
          </form>
        </div>
      );
    }
  }

  export default DeleteStudent;