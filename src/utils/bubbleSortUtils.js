export function getTotalStepForBubbleSort(initialArr) {
	const stepsInfo = [
		// initialize step information.
		{
			step: 0,
			outerIndex: -1,
			innerIndex: -1,
			done: false,
		},
	];
	let arr = [...initialArr];
	let step = 0;
	let isSwapped = false;

	for (let i = 0; i < arr.length; i++) {
		isSwapped = false;
		for (let j = 0; j < arr.length - (1 + i); j++) {
			step++;
			if (arr[j].currentNumber > arr[j + 1].currentNumber) {
				let temp = { ...arr[j] };
				// arr[j] = arr[j + 1];
				arr[j] = {
					...arr[j],
					currentNumber: arr[j + 1].currentNumber,
					curIndex: j + 1,
				};
				// arr[j + 1] = tmp;
				arr[j + 1] = {
					...arr[j + 1],
					currentNumber: temp.currentNumber,
					curIndex: j,
				};
				isSwapped = true;
				stepsInfo.push({
					step,
					willSwap: true,
					outerIndex: i,
					innerIndex: j,
					done: false,
				});
			} else {
				stepsInfo.push({
					step: step,
					outerIndex: i,
					innerIndex: j,
					willSwap: false,
					done: false,
				});
			}
		}
		if (!isSwapped) break;
	}
	step++;
	stepsInfo.push({
		...stepsInfo[stepsInfo.length - 1],
		step,
		willSwap: false,
		done: true,
	});

	return stepsInfo;
}

export function getArrayStateInSpecificStep(
	{ outerIndex, innerIndex, done },
	initialArr,
) {
	if (outerIndex === -1 && innerIndex === -1 && !done) {
		return [...initialArr];
	}

	let copyArr = [...initialArr];
	let isSwapped;
	let i, j;
	for (i = 0; i <= outerIndex; i++) {
		isSwapped = false;
		for (j = 0; j < copyArr.length - (1 + i); j++) {
			let firstIndex = copyArr.findIndex(
				// swap 하려는 첫 번째 노드의 id를 구함.
				(node) => node.id === copyArr[j].currentNumberID,
			);
			let secondIndex = copyArr.findIndex(
				// swap 하려는 두 번째 노드의 id를 구함.
				(node) => node.id === copyArr[j + 1].currentNumberID,
			);
			copyArr[firstIndex] = { ...copyArr[firstIndex], isSelecting: true };
			copyArr[secondIndex] = { ...copyArr[secondIndex], isSelecting: true };

			if (outerIndex === i && innerIndex === j && !done) {
				return [...copyArr];
			}
			if (copyArr[j].currentNumber > copyArr[j + 1].currentNumber) {
				let firstTmpNode = { ...copyArr[firstIndex] };
				let secondTmpNode = { ...copyArr[secondIndex] };

				copyArr[j] = {
					...copyArr[j],
					currentNumber: copyArr[secondIndex].initialNumber,
					currentNumberID: copyArr[secondIndex].id,
				};

				copyArr[firstTmpNode.initialIndex] = {
					...copyArr[firstTmpNode.initialIndex],
					curIndex: j + 1,
				};

				copyArr[j + 1] = {
					...copyArr[j + 1],
					currentNumber: copyArr[firstIndex].initialNumber,
					currentNumberID: copyArr[firstIndex].id,
				};

				copyArr[secondTmpNode.initialIndex] = {
					...copyArr[secondTmpNode.initialIndex],
					curIndex: j,
				};

				isSwapped = true;

				if (j === copyArr.length - (1 + i) - 1) {
					copyArr[firstIndex] = { ...copyArr[firstIndex], isOrdered: true };
				}
			} else {
				if (j === copyArr.length - (1 + i) - 1) {
					copyArr[secondIndex] = { ...copyArr[secondIndex], isOrdered: true };
				}
			}
			copyArr[firstIndex] = { ...copyArr[firstIndex], isSelecting: false };
			copyArr[secondIndex] = { ...copyArr[secondIndex], isSelecting: false };

			// if (j === copyArr.length - (1 + i) - 1) {
			// 	copyArr[firstIndex] = { ...copyArr[firstIndex], isOrdered: true };
			// }
		}
		if (!isSwapped) {
			return copyArr.map((element) => ({
				...element,
				isSelecting: false,
				isOrdered: true,
			}));
		}
	}

	if (done) {
		return copyArr.map((element) => ({
			...element,
			isSelecting: false,
			isOrdered: true,
		}));
	}

	return copyArr;
}
