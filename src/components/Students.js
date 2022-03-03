import React from 'react';
import { useTable, useRowSelect } from 'react-table';
import DeleteStudent from './DeleteStudent.js'


class UpdateParams extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: '', id: '', points: ''}
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
        if(this.state.name === '' && this.state.id === '' && this.state.points === ''){
            alert('chose an atribute to be updated')
        } else if (isNaN(this.state.id) || isNaN(this.state.points)) {
            alert('ID and Points must be integers')
        } else {
          this.props.selected.forEach(row => {
            var newStudent = {
              name: this.state.name,
              id: Number(this.state.id),
              points: Number(this.state.points)
            }
            if (this.state.name === ''){
                newStudent.name = row.name
            }
            if (this.state.id === ''){
                newStudent.id = row.id
            }
            if (this.state.props === ''){
                newStudent.props = row.props
            }
            var updateStudent = {
                newname: newStudent.name,
                newid: newStudent.id,
                newpoints: newStudent.points,
                oldid: row.id
            }
            fetch('/update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updateStudent)
            });
            this.props.onRemoveStudent(row);
            this.props.onNewStudent(newStudent)
            this.setState({name: ''});
            this.setState({id: ''});
            this.setState({points: ''});
          });
        }
        event.preventDefault();
    }

    render() {
        if(this.props.showChange){
            return (
                <form onSubmit={this.handleSubmit}>
                  <label>
                    New Name:
                    <input type="text" value={this.state.name} onChange={this.handleName}/>
                  </label>
                  <label>
                    New ID:
                    <input type="text" value={this.state.id} onChange={this.handleID}/>
                  </label>
                  <label>
                    New Points:
                    <input type="text" value={this.state.points} onChange={this.handlePoints}/>
                  </label>
                  <input type="submit" value="update" />
                </form>
            );
        } else {
            return null;
        }
    }
}

class UpdateStudent extends React.Component {
  constructor(props){
    super(props);
    this.state = {showChange: false}
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    if(this.props.selected.length !== 1){
        alert('One row must be selected')
    }  else {
        this.setState(prevState => ({showChange: true}))
    }
    event.preventDefault();
  }

  render(){
      return (
      <div>
        <form onSubmit={this.handleUpdate}>
          <input type="submit" value="Update Selected" />
        </form>
        <UpdateParams 
          selected = {this.props.selected}
          showChange = {this.state.showChange}
          onRemoveStudent= {this.props.onRemoveStudent}
          onNewStudent= {this.props.onNewStudent}
          // eslint-disable-next-line
          onUpdated={this.state.showChange = false}
        />
      </div>
    );
  }
}

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef
    
        React.useEffect(() => {
          resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])
    
        return (
          <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
          </>
        )
      }
)

function Students(props){
  // eslint-disable-next-line
  const data = React.useMemo(() => props.students);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      }, {
        Header: 'ID',
        accessor: 'id',
      }, {
        Header: 'Points',
        accessor: 'points',
      },
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({columns, data},
    useRowSelect,
    hooks => {
        hooks.visibleColumns.push(columns => [{
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
            ),
            Cell: ({ row }) => (
                <div>
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
            ),
        },...columns,])
    });

  // renders ui for table
  return (
    <>
      <table {...getTableProps()}>
       <thead> 
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
           )
         })}
       </tbody>
      </table>
      <DeleteStudent 
        selected = {selectedFlatRows.map(d => d.original)} 
        onRemoveStudent= {props.onRemoveStudent}
      />
      <UpdateStudent
        selected = {selectedFlatRows.map(d => d.original)}
        onRemoveStudent= {props.onRemoveStudent}
        onNewStudent= {props.onNewStudent}
      />
    </>
  );
}

export default Students;