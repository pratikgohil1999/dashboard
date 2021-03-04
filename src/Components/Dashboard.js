import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { withRouter } from "react-router-dom";
import './App.css';

const axios = require('axios').default;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.location.state,
            datas: [],
            currentItem: {
                id: 8,
                title: "",
                completed: 'false',
                date: ''
            },
            currentId: '',
            currentTitle: "",
            currentCompleted: '',
            currentDate: '',
            deleteId: ''
        };
    }

    componentDidMount() {
        axios.get('./data/tabledata.json')
            .then((response) => {
                console.log(response.data);
                this.setState({ datas: response.data })
            });
    }

    handleTitle = e => {
        this.setState({
            ...this.state, currentItem: {
                ...this.state.currentItem, title: e.target.value
            }
        })
    }

    handleDate = e => {
        this.setState({
            ...this.state, currentItem: {
                ...this.state.currentItem, date: e.target.value
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const titleHere = this.state.currentItem.title;
        const idHere = this.state.currentItem.id;
        const completedHere = this.state.currentItem.completed;
        const dateHere = this.state.currentItem.date;
        this.setState({
            ...this.state, datas: [
                ...this.state.datas, {
                    title: titleHere,
                    id: idHere,
                    completed: completedHere,
                    date: dateHere,
                },
            ],
            id: this.state.id + 1,
        });

    };

    handleEdit = event => {
        event.preventDefault();
        const titleHere = this.state.currentTitle;
        const idHere = this.state.currentId;
        const completedHere = this.state.currentCompleted;
        const dateHere = this.state.currentDate;
        this.state.datas.map((t) => {
            if (t.id == idHere) {
                this.setState({
                    title: titleHere,
                    completed: completedHere,
                    id: idHere,
                    date: dateHere,
                });
            }
        })


    };

    deleteItem = (e) => {
        e.preventDefault();
        console.log("deleteId : ", this.state.deleteId)
        const key = this.state.deleteId;
        const filteredItems = this.state.datas.filter(item =>
            item.id !== key);
        this.setState({
            datas: filteredItems
        })
    }

    render() {
        return (
            <div className="App">
                <h1>Dashboard here</h1>
                <h2>add here</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="enter Project "
                        value={this.state.currentItem.title}
                        onChange={(e) => this.handleTitle(e)}>
                    </input>
                    <input type="text" placeholder="enter Date "
                        value={this.state.currentItem.date}
                        onChange={(e) => this.handleDate(e)}>
                    </input>
                    <button type="submit">add</button>
                </form>


                {/* <h2>Delete Item</h2>
                <input type="text"
                    placeholder='enter id which you wanna delete'
                    value={this.state.deleteId}
                    onChange={(e) => this.setState({ deleteId: e.target.value })}></input>
                <button onClick={this.handleDelete}>delete</button>

                <h2>edit here</h2>
                <form onSubmit={this.handleEdit}>
                    <input type="text" placeholder="enter ID "
                        value={this.state.currentId}
                        onChange={(e) => this.setState({ currentId: e.target.value })}>
                    </input>
                    <input type="text" placeholder="edit Title "
                        value={this.state.currentTitle}
                        onChange={(e) => this.setState({ currentTitle: e.target.value })}>
                    </input>
                    <input type="text" placeholder="edit completed Status "
                        value={this.state.currentCompleted}
                        onChange={(e) => this.setState({ currentCompleted: e.target.value })}>
                    </input>
                    <input type="text" placeholder="edit Date "
                        value={this.state.currentDa}
                        onChange={(e) => this.setState({ currentDate: e.target.value })}>
                    </input>
                    <button type="submit">add</button>
                </form> */}
                {/* <MaterialTable
                    title="Project Data"
                    columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'Title', field: 'title' },
                        { title: 'Status', field: 'completed' },
                        { title: 'Date', field: 'date' },
                    ]}
                    data={this.state.datas}
                    options={{
                        sorting: true,
                    }}
                /> */}
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.datas.map((row) => (

                                < TableRow key={row.name} >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.completed}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <button onClick={(e) => this.setState({ currentId: row.id })}>edit</button>
                                    <button onClick={(e) => {
                                        const k = row.id
                                        this.setState({ deleteId: k })
                                        this.deleteItem(e)
                                    }}>delete</button>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        );
    }
}

export default withRouter(Dashboard);