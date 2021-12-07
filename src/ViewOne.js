import React, { Component } from 'react'
import axios from 'axios';


export default class ViewOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailId: '',
            employee: []
        }
    }


    componentDidMount = () => {
        axios.get('http://localhost:9090/api/v1/employees/' + this.props.match.params.id)
            .then(response => {
                console.log(JSON.stringify(response.data))
                this.setState({
                    firstName: response.data[0].firstName,
                    lastName: response.data[0].lastName,
                    emailId: response.data[0].emailId
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:9090/api/v1/employees/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        employee: response.data.map(employee => employee.firstName),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    
    

   

    render() {
        return (
            <div>
                <h3>Employee Details</h3>
                <br />
                <strong> First Name :</strong> {this.state.firstName}
                <br />
                <strong>Surname : </strong>{this.state.lastName}
                <br />
                <strong> Email address : </strong>{this.state.emailId}
                <br />
                <a href="/view"><button>OK</button> </a>

            </div >
        )
    }
}
