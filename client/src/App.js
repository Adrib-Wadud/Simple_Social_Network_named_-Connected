import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard'
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth'
import store from './store';
import Private from './components/routing/PrivateRoute'
import './App.css';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperince from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post'



const App = () =>{

  // if(localStorage.token){
  //   setAuthToken(localStorage.token);
  // }
  useEffect(()=>{
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path="/" component = {Landing}/>
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/register" component = {Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:id" component={Profile}/>
              <Private exact path="/dashboard" component={Dashboard}/>
              <Private exact path="/create-profile" component={CreateProfile}/>
              <Private exact path="/edit-profile" component={EditProfile}/>
              <Private exact path='/add-experience' component={AddExperince}/>
              <Private exact path='/add-education' component={AddEducation}/>
              <Private exact path='/posts' component={Posts}/>
              <Private exact path='/posts/:id' component={Post}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
