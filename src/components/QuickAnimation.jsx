import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Node from "./Node";
import classes from "./Animation.module.css";
import { withRouter } from "react-router-dom";
import { useTrail, animated, config } from "react-spring";
import { CONTAINER_HEIGHT } from "../utils/constants";

const QuickAnimation = ({ match }) => {
	const [initialArr, setInitialArr] = useState([]);
	const [changedArr, setChangedArr] = useState([]);

	const onCreate = (arr) => {
		setInitialArr(arr);
		setChangedArr(arr);
	};

	const onClear = () => {
		setInitialArr([]);
		setChangedArr([]);
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
			<Footer onCreate={onCreate} onClear={onClear} url={match.url} />
		</>
	);
};

export default withRouter(QuickAnimation);
