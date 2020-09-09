import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./Node.module.css";
import { NODE_WIDTH, MARGIN_RIGHT } from "../utils/constants";
import { useSpring, animated } from "react-spring";

Node.propTypes = {
	id: PropTypes.number.isRequired,
	initialNumber: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	isSelecting: PropTypes.bool.isRequired,
	initialIndex: PropTypes.number.isRequired,
	curIndex: PropTypes.number.isRequired,
	isOrdered: PropTypes.bool.isRequired,
};

function Node({
	id,
	initialNumber,
	height,
	isSelecting,
	initialIndex,
	curIndex,
	isOrdered,
}) {
	const xToPos = useMemo(() => {
		return (curIndex - initialIndex) * (NODE_WIDTH + MARGIN_RIGHT);
	}, [curIndex, initialIndex]);

	const yToPos = useMemo(() => {
		return 0;
	});

	const animationProps = useSpring({
		from: {
			transform: `translate3D(0px, 0px, 0px)`,
		},
		to: {
			transform: `translate3D(${xToPos}px, ${yToPos}px, 0px)`,
		},
	});

	const [bgColor, setBgColor] = useState("orange");

	useEffect(() => {
		if (isOrdered) {
			setBgColor("#5cdb95");
		} else if (isSelecting) {
			setBgColor("red");
		} else {
			setBgColor("orange");
		}
	}, [isSelecting, isOrdered]);

	return (
		<animated.div
			className={classes.node}
			style={{
				...animationProps,
				height,
				width: `${NODE_WIDTH}px`,
				marginRight: `${MARGIN_RIGHT}px`,
				backgroundColor: bgColor,
			}}
		>
			{initialNumber}
		</animated.div>
	);
}

export default Node;
