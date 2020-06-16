import React, { Component } from 'react';
import { Table, Image, Grid, Form } from 'semantic-ui-react';

import api from './../api'

export default class EmployeeList extends Component {

    state = {
        employees: [],
        filtered: [],
        column: null,
        direction: null,
    }

    async componentDidMount() {
        const { data } = await api.getEmployees()
        this.setState({
            employees: data.results,
            filtered: data.results,
        })
    }

    formatDate = date => {
        const dateArray = date.split("-");
        const year = dateArray[0];
        const month = dateArray[1];
        const dayArray = dateArray[2].split("T");
        const day = dayArray[0];
        const formattedDate = [month, day, year].join("/");
        return formattedDate;
    }

    handleSearch = (e, data) => {
        const { employees } = this.state;
        this.setState({
            filtered: employees.filter(({name}) => name.first.includes(data.value) || name.last.includes(data.value))
        }) 
    }

    handleSort = clickedCol => {
        const { employees, column, direction, filtered } = this.state
        if(column !== clickedCol){
            this.setState({
                column: clickedCol,
                filtered: employees.sort((a,b) => (a.name.first + a.name.last) < (b.name.first + b.name.last) ? -1 : 1),
                direction: 'ascending'
            })
            return
        }
        this.setState({
            filtered: filtered.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending'
        })
    }

    render(){
        return(
          <Grid padded>
              <Grid.Column>
                  <Form>
                    <Form.Input onChange={this.handleSearch} action={{ icon: 'search' }} placeholder='Search...'/>
                  </Form>
                <Table singleLine sortable inverted color='teal'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell content='Image'/>
                            <Table.HeaderCell 
                            content='Name'
                            sorted={this.state.column === 'name' ? this.state.direction : null}
                            onClick={() =>this.handleSort('name')}
                            />
                            <Table.HeaderCell content='Phone'/>
                            <Table.HeaderCell content='Email'/>
                            <Table.HeaderCell content='Birthday'/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.filtered.length && this.state.filtered.map(({picture, name, phone, email, dob}, i) => {
                            return (
                            <Table.Row key={i}>
                                <Table.Cell children={<Image src={picture.thumbnail} rounded size='mini'/>}/>
                                <Table.Cell content={name.first +' '+ name.last}/>
                                <Table.Cell content={phone}/>
                                <Table.Cell content={email}/>
                                <Table.Cell content={this.formatDate(dob.date)}/>
                            </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
              </Grid.Column>
          </Grid>
        )
    }
}