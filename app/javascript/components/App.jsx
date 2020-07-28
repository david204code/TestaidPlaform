import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/pages/Navbar';
import Welcome from '../components/pages/Welcome';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import Map from '../components/map/Map';
// import Help from './help1/Help';
import Login from '../components/auth/Login';
import Signup from '../components/auth/SignUp';
import Notice from '../components/pages/Notice';
import Request from '../components/map/Request';
// import AcceptedHelp from './map/AcceptedHelp';
import Message from './map/Message';
import ConversationList from './ConversationList';
import Helps from './Helps/Helps';
import AcceptedHelps from './Helps/AcceptedHelps';
import AcceptedHelp from './Helps/AcceptedHelp';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoggedin: false,
      userEmail: localStorage.userEmail,
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  };

  // componentDidMount() {
  //   setTimeout(function() {
  //     this.loginStatus()   
  //   }.bind(this), 2000)
  // };

  componentDidMount() {
    this.loginStatus()
  };

  // componentOnMount() {
  //   this.loginStatus()
  // };

  // componentWillUpdate() {
  //   this.loginStatus()
  // };

  loginStatus = () => {
    axios.get('http://localhost:3000/logged_in',
    {withCredentials: true})

    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
        this.setState({
          isLoggedin: true,
          user: response.data.user,
          userEmail: response.data.user.email
        })
      } else if (!response.data.logged_in) {
        this.handleLogOut()
        this.setState({
          isLoggedin: false,
          userEmail: '',
          user: {}
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('user', JSON.stringify(nextState.user));
    localStorage.setItem('userEmail', nextState.userEmail);
  }


  handleLogin = (data) => {
    // console.log(data.data.user)
    this.setState({
      isLoggedin: true,
      user: data.data.user,
      userEmail: data.data.user.email,
    });
  };

  handleLogOut = () => {
    this.setState({
      isLoggedin: false,
      user: {},
      userEmail: '',
    });
  };
  

  render() {
    const userEmail = this.state.userEmail;
    const PrivateRoute = ({ component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        // console.log(this.state.user.email),
        // console.log(localStorage.user),
        // console.log(userEmail),
        // console.log(localStorage.userEmail),
        // console.log(localStorage.user[21]+localStorage.user[22]),
        !!localStorage.userEmail && localStorage.userEmail != undefined
        // this.state.isLoggedin === true
        ? <Component {...props} {...rest}/>
        : <Redirect to={{
          pathname: '/notice',
          state: { from: props.location }
        }} />
      )
    }/>
    )

    return (
      <div>
        <BrowserRouter>

          {/* <Route
            render ={props => (
              <Navbar {...props}
                isLoggedin = {this.state.isLoggedin}
                handleLogOut = {this.handleLogOut} 
            />
            )}
          /> */}

          <Switch>

            {/* <Route exact path ="/" component ={Helps} /> */}
            <Route exact path ="/" component ={AcceptedHelps} />
            <Route exact path ="/acceptedhelps/:id" component ={AcceptedHelp} />



            {/* <Route 
              exact path ={"/"}   
              render ={props => (
                <Welcome {...props}

                />
              )}            
            /> */}

            <Route 
              exact path ={"/home"}
              render ={props => (
                <Home {...props}
                  isLoggedin = {this.state.isLoggedin}
                  handleLogin = {this.handleLogin}
                  handleLogOut = {this.handleLogOut} 
                />
              )}
            />

            {/* <Route 
              exact path ={"/login"}
              render ={props => (
                <Login {...props}
                  handleLogin = {this.handleLogin}
                  isLoggedin = {this.state.isLoggedin}
                />
              )}
            />

            <Route
              exact path ={"/signup"}
              render ={props => (
                <Signup {...props}
                  handleLogin = {this.handleLogin}
                  isLoggedin = {this.state.isLoggedin}
                />
              )}
            /> */}

            <Route
              exact path ={"/dashboard"}
              render ={props => (
                <Dashboard {...props}
                  isLoggedin = {this.state.isLoggedin}
                  user = {this.state.user}
                />
              )}
            />

            <PrivateRoute 
              exact path ={"/map"}
              component ={ Map }
              user ={this.state.user}
              // render ={props => (
              //   <Map {...props}
              //     handleLogin = {this.handleLogin}
              //     isLoggedin = {this.state.isLoggedin}
              //   />  
              // )}
            />

            {/* <PrivateRoute */}
            <Route
              path="/request/:id" exact component ={Request}
            />

            {/* <Route
              path ="/acceptedhelp" exact component = {AcceptedHelp}
            /> */}

            {/* <Route
              path ="/:id/acceptedhelp/:acceptedId" exact component = {AcceptedHelp}
            />   */}

            {/* <Route
              path ="/acceptedhelp/:id" exact component = {AcceptedHelp}
            />   */}

            {/* <PrivateRoute
              exact path ={"/help"}
              component ={ Help }
              user ={this.state.user}
              render ={props => (
                  <Help {...props}
                    handleLogin = {this.handleLogin}
                    isLoggedin = {this.state.isLoggedin}
                  />
                )}
            /> */}

            <Route 
              exact path ={"/message"}
              component = { Message }
            />

            <Route 
              exact path ={"/conversationlist"}
              component = { ConversationList }
            />

            <Route
              exact path ={"/notice"}
              component = { Notice }
            />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App 