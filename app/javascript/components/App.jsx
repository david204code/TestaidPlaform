import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/pages/Navbar';
import Welcome from '../components/pages/Welcome';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import Map from '../components/map/Map';
import Post from './post/Help';
import Login from '../components/auth/Login';
import Signup from '../components/auth/SignUp';
import Notice from '../components/pages/Notice';
import Request from '../components/map/Request';
import Helps from './1posterHelps/Helps';
import Help from './1posterHelps/Help';
import AcceptedHelps from './2AccepterHelps/AcceptedHelps';
import AcceptedHelp from './2AccepterHelps/AcceptedHelp';
import Conversation from './Conversation';
import Counter from './Counter';
import Footer from '../components/pages/Footer'
import './App.css';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoggedin: false,
      userEmail: localStorage.userEmail,
      userId: localStorage.userId,
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
          userEmail: response.data.user.email,
          userId: response.data.user.id,
        })
      } else if (!response.data.logged_in) {
        this.handleLogOut()
        this.setState({
          isLoggedin: false,
          userEmail: '',
          userId: '',
          user: {}
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  // componentDidUpdate(previousProps, previousState)
  // this is actually setting the previous user NOT the current
  // this.state or this.prop
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('user', JSON.stringify(nextState.user));
    localStorage.setItem('userEmail', nextState.userEmail);
    localStorage.setItem('userId', nextState.userId);
  }


  handleLogin = (data) => {
    // console.log(data.data.user)
    this.setState({
      isLoggedin: true,
      user: data.data.user,
      userEmail: data.data.user.email,
      userId: data.data.user.id,
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
      <div className ="App">
        <BrowserRouter>

          <Route
            render ={props => (
              <Navbar {...props}
                isLoggedin = {this.state.isLoggedin}
                handleLogOut = {this.handleLogOut} 
                userEmail = {this.state.userEmail}
              />
            )}
          />
          {/* <Counter /> */}
          <Switch>
          <Route exact path ="/" component ={Welcome} />
            {/* <Route exact path ="/" component ={Helps} /> */}
            {/* <Route exact path ="/" component ={AcceptedHelps} /> */}
            <Route exact path ={"/acceptedhelp/:id"} 
              render ={props => (
                <AcceptedHelp {...props}
                  user = {this.state.user}
                  cableApp = {this.props.cableApp}
                />
              )}
            />
            <Route exact path ="/myhelp/:id" component ={Help} />
            
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

            <PrivateRoute
              exact path ={"/post"}
              component ={ Post }
              user ={this.state.user}
              render ={props => (
                  <Help {...props}
                    handleLogin = {this.handleLogin}
                    isLoggedin = {this.state.isLoggedin}
                  />
                )}
            />

            <Route
              exact path ={"/notice"}
              component = { Notice }
            />

          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

export default App 