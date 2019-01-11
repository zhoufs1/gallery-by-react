/**
 * Created by zhoufs1 on 2018/4/2.
 */
import React from "react";

class My2 extends React.Component{
    constructor(props){       //继承父亲里面的值
        super();               //向上传值
        this.change = (this.change).bind(this);
        this.state = {
            "txt" : ""
        }
    }

    change(event){
        this.setState({"txt" : event.target.value });
    }

    render(){
        return (
            <div>
                <input type="text" value="周伯通"/>
                <br/>
                <input type="text" onInput={this.change} />
                <h1>{this.state.txt}</h1>
            </div>
        )
    }
}

export default My2;