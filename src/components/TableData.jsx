import React, { Component } from 'react'

export default class TableData extends Component {
    render(props) {
        return (
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">

                        <i className="fas fa-caret-up" onClick={this.props.sortIncreasingFunction}></i>
                       Stock
                      <i className="fas fa-caret-down" onClick={this.props.sortDecreasingFunction}></i>
                    </th>

                    <th scope="col">Rating</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {this.props.fileterdMovies.map((movieObj) => {
                    return (
                        <tr key ={movieObj._id}>
                            <th scope="row">{movieObj.title}</th>
                            <td>{movieObj.genre.name}</td>
                            <td>
                                {movieObj.numberInStock}

                            </td>
                            <td>{movieObj.dailyRentalRate}</td>
                            <td><button type="button" className="btn btn-danger" onClick={() => { this.props.deleteHandler(movieObj._id) }}>Danger</button></td>
                        </tr>

                    )
                })}
            </tbody>
        </table>
        )
    }
}
