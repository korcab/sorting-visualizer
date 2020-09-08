import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className={classes.header}>
			<h1>
				<Link to="/">Sorting Visualizer</Link>
			</h1>
			<nav className={classes.nav}>
				<ul className={classes.nav_items}>
					<li>
						<Link to="/bubble">Bubble</Link>
					</li>
					<li>
						<Link to="/selection">Selection</Link>
					</li>
					<li>
						<Link to="/merge">Merge</Link>
					</li>
					<li>
						<Link to="/quick">Quick</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
