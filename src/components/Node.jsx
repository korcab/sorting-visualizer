import React from "react";
import PropTypes from "prop-types";
import classes from "./Node.module.css";
import { NODE_WIDTH, MARGIN_RIGHT } from "../utils/constants";

Node.propTypes = {
	id: PropTypes.number.isRequired,
	initialNumber: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	isSelecting: PropTypes.bool.isRequired,
	isSwapping: PropTypes.bool.isRequired,
	initialIndex: PropTypes.number.isRequired,
	curIndex: PropTypes.number.isRequired,
	isOrdered: PropTypes.bool.isRequired,
};

function Node({
	id,
	initialNumber,
	height,
	isSelecting,
	isSwapping,
	initialIndex,
	curIndex,
	isOrdered,
}) {
	return (
		<div
			className={classes.node}
			style={{
				height,
				width: `${NODE_WIDTH}px`,
				marginRight: `${MARGIN_RIGHT}px`,
			}}
		>
			{initialNumber}
		</div>
	);
}

export default Node;
