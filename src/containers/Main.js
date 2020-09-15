import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Main.css";
import Navbar from "../conponents/Navbar";
import MovieList from '../conponents/MovieList';
import MyList from '../conponents/MyList';


function Main()  {
    return (
      <>
        <Navbar/>
        <Switch>
          <Route exact path="/" >
           <MovieList/>
          </Route>
          <Route  path="/my-list">
            <MyList />
          </Route>
        </Switch>
      </>
    );
  }

export default Main;