import React, {Component} from 'react';
import Yoshi from "./Yoshi";
import axios from 'axios';
import './MushroomKingdom.css';
import Swal from 'sweetalert2';


export default class MushroomKingdom extends Component {
    constructor() {
        super()

        this.state = {
            yoshi: []
        }
        this.releaseYoshi = this.releaseYoshi.bind(this)
        this.saveYoshiStatus = this.saveYoshiStatus.bind(this)
    }

    componentDidMount() {
        axios
            .get('/api/yoshiKingdom')
            .then(res => {
                this.setState({
                    yoshi: res.data
                })
                if (this.state.yoshi.length === 0 ) {  
                    Swal.fire("Go hatch some Yoshi's first!")
                }
            })
    }

    saveYoshiStatus(id, body) {
        axios
            .put(`/api/yoshiKingdom/${id}`, body)
            .then(res => {
                this.setState({
                    yoshi: res.data
                })
            }).catch(function(error) {
                console.log(error);
        });
    }

    releaseYoshi(id) {
        axios
            .delete(`api/yoshiKingdom/${id}`)
            .then(res => {
                this.setState({
                    yoshi: res.data
                })
            })
    }

    filterColor(color) {
        axios
            .get(`/api/filter/yoshiKingdom?color=${color}`)
            .then(res => {
                this.setState({ yoshi: res.data })
                if (this.state.yoshi.length === 0 ) {  
                Swal.fire("No Yoshi's in that color")
            }
        })        
    }

    render() {
        return (
            <div>
                <div className="wallpaper" />
                <h3 className="title">Yoshi Kingdom</h3>
                        <div className="five-btns">
                            <button className="query-btn" onClick={() => this.componentDidMount()}>All Yoshi's</button>
                            <button className="query-btn" onClick={() => this.filterColor("green")}>Green</button>
                            <button className="query-btn" onClick={() => this.filterColor("blue")}>Blue</button>
                            <button className="query-btn" onClick={() => this.filterColor("pink")}>Pink</button>
                            <button className="query-btn" onClick={() => this.filterColor("black")}>Black</button>
                            <button className="query-btn" onClick={() => this.filterColor("red")}>Red</button>
                        </div>
                <div className="Isle"> 
                    {this.state.yoshi.map(el => (
                        <Yoshi
                        yoshiObj={el} key={el.id}
                        releaseYoshiFn={this.releaseYoshi}
                        saveYoshiStatusFn={this.saveYoshiStatus}
                        />
                    ))}
                </div>
            </div>
        )
    }
}