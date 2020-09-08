import React, { useState } from "react";
import classes from "./Footer.module.css";
import PropTypes from "prop-types";
import { createNodeArr } from "../utils/arrayUtils";

Footer.propTypes = {
	onCreate: PropTypes.func,
	onClear: PropTypes.func,
	url: PropTypes.string,
};

function Footer({ onCreate, onClear, url }) {
	const [value, setValue] = useState("");
	const [isCreated, setCreated] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		const [created, arr] = createNodeArr(value, url);
		if (created) {
			onCreate(arr);
			setCreated(created);
		}
		setValue("");
	};

	const onPrev = () => {};

	const onCheckSwap = () => {};

	const onClearClick = () => {
		setCreated(false);
		onClear();
	};

	if (url === "/") {
		return <footer className={classes.footer}></footer>;
	} else {
		return (
			<footer className={classes.footer}>
				<div className={classes.btn_box}>
					{!isCreated && (
						<form onSubmit={onSubmit}>
							<input
								type="text"
								onChange={(e) => setValue(e.target.value)}
								placeholder="e.g. 1, 3, 2 or 7"
							></input>
							<button>Create Array</button>
						</form>
					)}
					{isCreated && (
						<div className={classes.btn_box}>
							<button className={classes.btn} onClick={onPrev}>
								Prev Step
							</button>
							<input
								type="range"
								min={0}
								max={10}
								step="1"
								// onChange={onRangeChange}
								value={0}
							></input>
							<button className={classes.btn} onClick={onCheckSwap}>
								Check Swap
							</button>
							<button className={classes.btn} onClick={onClearClick}>
								Clear Array
							</button>
						</div>
					)}
				</div>
			</footer>
		);
	}
}

export default Footer;
