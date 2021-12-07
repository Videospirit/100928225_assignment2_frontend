import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';





const Employees = props => (
    <tbody>
        <tr>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>{props.employee.emailId}</td>
            <td>
                <Link to={"/update/" + props.employee.id} ><button >Update</button></Link>
                <Link to={"/view"}  >
                    <button onClick={(e) => { props.deleteEmployee(props.employee.id) }}>Delete</button>
                </Link>
                <Link to={"/viewone/" + props.employee.id} ><button>View</button></Link>
            </td>
        </tr>
    </tbody>



)


export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = { employee: [] };
    }



    componentDidMount() {
        axios.get('http://localhost:9090/api/v1/employees/')
            .then(response => {
                const employee = response.data
                this.setState({ employee })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    employeesList() {
        return this.state.employee.map(emp => {
            return <Employees employee={emp} key={emp.id} deleteEmployee={this.deleteEmployee} />;
        })
    }


    deleteEmployee(id) {
        axios.delete('http://localhost:9090/api/v1/employees/' + id)
            .then(response => { console.log(response.data) });

        window.location.reload(false);
    }



    render() {
        return (
            <div>

                <br /><br /><br />
                <h3>Employees</h3>
                <br />
                <Link to={"/create"} ><button>Create a new Employee</button></Link>
                <br /><br />

                
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {this.employeesList()}
                </table >                        
            </div>
        )
    }
}
