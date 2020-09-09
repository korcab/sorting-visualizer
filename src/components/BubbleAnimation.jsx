import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Node from "./Node";
import classes from "./Animation.module.css";
import { withRouter } from "react-router-dom";
import { useTrail, animated, config } from "react-spring";
import { CONTAINER_HEIGHT } from "../utils/constants";
import {
	getTotalStepForBubbleSort,
	getArrayStateInSpecificStep,
} from "../utils/bubbleSortUtils";

const BubbleAnimation = ({ match }) => {
	const [initialArr, setInitialArr] = useState([]);
	const [changedArr, setChangedArr] = useState([]);
	const [currentStepInfo, setCurStepInfo] = useState({});
	const [stepsInfo, setStepsInfo] = useState([]);

	const onCreate = (arr) => {
		setInitialArr(arr);
		setChangedArr(arr);
	};

	const onClear = () => {
		setInitialArr([]);
		setChangedArr([]);
	};

	useEffect(() => {
		// 배열이 초기화되면 각 단계에 대한 정보를 얻음.
		const initialSteps = getTotalStepForBubbleSort(initialArr);
		setStepsInfo(initialSteps);
		setCurStepInfo(initialSteps[0]);
	}, [initialArr]);

	const onStepChange = (step) => {
		setCurStepInfo(stepsInfo[step]);
	};

	useEffect(() => {
		// 현재 단계가 바뀔 때마다 각 단계에서의 변경된 배열을 얻음.
		const arr = getArrayStateInSpecificStep(currentStepInfo, initialArr);
		setChangedArr(arr);
	}, [currentStepInfo, initialArr]);

	const onNextStep = () => {
		if (currentStepInfo.step < stepsInfo.length) {
			setCurStepInfo(stepsInfo[currentStepInfo.step + 1]);
		}
	};

	const onPrevStep = () => {
		if (currentStepInfo.step > 0) {
			setCurStepInfo(stepsInfo[currentStepInfo.step - 1]);
		}
	};

	const trail = useTrail(changedArr.length, {
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: config.stiff,
	});

	return (
		<>
			<main className={classes.main}>
				{initialArr.length === 0 && (
					<div className={classes.info_box}>
						<h2>생성할 배열을 입력해 주세요.</h2>
						<p>입력 예:</p>
						<p>1, 3, 2, 4, 5 -> 1, 3, 2, 4, 5를 배열 요소로 가진 배열 생성</p>
						<p>10 -> 랜덤한 10개의 요소를 가진 배열 생성</p>
					</div>
				)}
				{initialArr.length >= 1 && (
					<div
						className={classes.animation_box}
						style={{ height: `${CONTAINER_HEIGHT + 10}px` }}
					>
						{trail.map((spring, index) => (
							<animated.div
								key={initialArr[index].id}
								style={{
									...spring,
									display: "flex",
									alignItems: "flex-end",
									position: "relative",
								}}
							>
								<Node {...changedArr[index]} />
							</animated.div>
						))}
					</div>
				)}
			</main>
			<Footer
				onCreate={onCreate}
				onClear={onClear}
				url={match.url}
				currentStepInfo={currentStepInfo}
				stepsInfo={stepsInfo}
				onStepChange={onStepChange}
				onNextStep={onNextStep}
				onPrevStep={onPrevStep}
			/>
		</>
	);
};

export default withRouter(BubbleAnimation);
