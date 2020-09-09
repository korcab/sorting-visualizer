import React, { useState } from "react";
import classes from "./Footer.module.css";
import PropTypes from "prop-types";
import { createNodeArr } from "../utils/arrayUtils";

Footer.propTypes = {
	onCreate: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired,
	url: PropTypes.string.isRequired,
	currentStepInfo: PropTypes.object.isRequired,
	stepsInfo: PropTypes.array.isRequired,
	onStepChange: PropTypes.func.isRequired,
	onNextStep: PropTypes.func.isRequired,
	onPrevStep: PropTypes.func.isRequired,
};

function Footer({
	onCreate,
	onClear,
	url,
	currentStepInfo,
	stepsInfo,
	onStepChange,
	onNextStep,
	onPrevStep,
}) {
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

	const onRangeChange = (e) => {
		const changedStep = parseInt(e.target.value);
		if (changedStep !== currentStepInfo.step) {
			onStepChange(changedStep);
		}
	};

	const onPrevStepClick = () => {
		onPrevStep(currentStepInfo.step);
	};

	const onNextStepClick = () => {
		onNextStep(currentStepInfo.step);
	};

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
							<button className={classes.btn} onClick={onPrevStepClick}>
								Prev Step
							</button>
							<input
								type="range"
								min={0}
								max={stepsInfo.length - 1}
								step="1"
								onChange={onRangeChange}
								value={currentStepInfo.step}
							></input>
							<button className={classes.btn} onClick={onNextStepClick}>
								Next Step
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
