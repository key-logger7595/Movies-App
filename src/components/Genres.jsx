import React, { Component } from 'react'

export default class Genres extends Component {
    render(props) {
        return (
           
                
                    <ul className="list-group">
                        {
                           this.props.genres.map(genreObj=>{
                            let classes = this.props.currentGenre===genreObj.name ?`list-group-item active`:`list-group-item`; 
                               return( 
                                <li className ={classes} 
                                key={genreObj.id} 
                                onClick={()=>{this.props.changeGenre(genreObj.name)}} 
                                >{genreObj.name}</li>    
                               ) 
                           }) 
                        }

                    </ul>
               
            
        )
    }
}
