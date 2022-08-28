import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class TrData extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return (
        this.props.users.map((user,i)=>{
            return (
                <tr key={user.authorid} className="text-center">
                  
                  <td>{user.authorid}</td>
                  <td>{user.name}</td>
                  <td>{user.orgid}</td>
                  {/* <td><button onClick = {() => {
                    this.setState({user});
                    }}>Delete</button></td> */}
                </tr>
            )       
        })
      )
    }
  }


export default class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            isLoaded:false
          }
      
  }

  //当组件输出到 DOM 后会执行 componentDidMount()
    async componentDidMount(){ 
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios.get('http://129.69.209.197:31000/postgresql/author/YangHaoran')
        .then(function (response) {
        _this.setState({
            users:response.data,
            isLoaded:true
        });
        })
        .catch(function (error) {
        console.log(error);
        _this.setState({
            isLoaded:false,
            error:error
        })
        })
    }

  //List.js
render() {
    if(!this.state.isLoaded){
      return <div>Loading</div>
    }else{
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">111</th>
            <th className="text-center">222</th>
            <th className="text-center">333</th>
     
          </tr>
        </thead>
      <tbody>
         <TrData users={this.state.users}/>
      </tbody>
      </table>
    )  
  }
}
}