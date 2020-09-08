import React from "react";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";

const Home = ({ match }) => {
	return (
		<>
			<div>Home</div>
			<Footer url={match.url} />
		</>
	);
};

export default withRouter(Home);
