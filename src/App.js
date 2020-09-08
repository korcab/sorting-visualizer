import React from "react";
import classes from "./App.module.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import BubbleAnimation from "./components/BubbleAnimation";
import SelectionAnimation from "./components/SelectionAnimation";
import MergeAnimation from "./components/MergeAnimation";
import QuickAnimation from "./components/QuickAnimation";

function App() {
	return (
		<div className={classes.app}>
			<Header />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/bubble" component={BubbleAnimation} />
				<Route path="/selection" component={SelectionAnimation} />
				<Route path="/merge" component={MergeAnimation} />
				<Route path="/quick" component={QuickAnimation} />
				<Redirect path="*" to="/" />
			</Switch>
		</div>
	);
}

export default App;
