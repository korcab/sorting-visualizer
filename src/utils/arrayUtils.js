import {
	MAX_ARR_LEN,
	MIN_NUM,
	MAX_NUM,
	CONTAINER_HEIGHT,
	MIN_HEIGHT,
} from "./constants";

export function createNodeArr(str, url) {
	const [isValid, numArr] = isValidFormat(str);
	if (isValid) {
		return [true, convertNumArrToNodeArr(numArr, url)];
	} else {
		return [false];
	}
}

export function isValidFormat(str) {
	str = str.trim();
	let convertedArr;
	const elementsRegex = /^([0-9]{1,3}[, ]+)*[0-9]{1,3}$/g;
	const lengthRegex = /^([1-9]{1})$|^([1]{1}[0-9]{1})$|^(20)$/g;

	if (lengthRegex.test(str)) {
		// when enter array length
		convertedArr = new Array(parseInt(str));
		for (let i = 0; i < convertedArr.length; i++) {
			convertedArr[i] = Math.floor(Math.random() * 999) + 1;
		}
		return [true, convertedArr];
	} else if (elementsRegex) {
		// when enter array elements
		let isValidStr = true;
		convertedArr = str.split(", ").map((num) => {
			const intNum = parseInt(num);
			if (intNum >= MIN_NUM && intNum <= MAX_NUM) {
				return intNum;
			} else {
				isValidStr = false;
				return intNum;
			}
		});
		if (!isValidStr) {
			return [false];
		}
		return [true, convertedArr];
	} else {
		return [false];
	}
}

export function convertNumArrToNodeArr(arr, url) {
	let maxNumber = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (maxNumber < arr[i]) {
			maxNumber = arr[i];
		}
	}

	// eslint-disable-next-line default-case
	switch (url) {
		case "/merge":
			return arr.map((number, index) => ({
				id: index + 1,
				initialNumber: number,
				currentNumber: number,
				currentNumberID: index + 1,
				height: calcNumToHeight(number, maxNumber),
				isSelecting: false,
				isLeft: false,
				isRight: false,
				prevIndex: index,
				curIndex: index,
				isOrdered: false,
			}));
		case "/quick":
			return arr.map((number, index) => ({
				id: index + 1,
				initialNumber: number,
				currentNumber: number,
				currentNumberID: index + 1,
				height: calcNumToHeight(number, maxNumber),
				isSelecting: false,
				isPivot: false,
				isLeft: false,
				isRight: false,
				prevIndex: index,
				curIndex: index,
				isOrdered: false,
			}));
		case "/selection":
			return arr.map((number, index) => ({
				id: index + 1,
				initialNumber: number,
				currentNumber: number,
				currentNumberID: index + 1,
				height: calcNumToHeight(number, maxNumber),
				isSelecting: false,
				isPivot: false,
				prevIndex: index,
				curIndex: index,
				isOrdered: false,
			}));
		case "/bubble":
			return arr.map((number, index) => ({
				id: index + 1,
				initialNumber: number,
				currentNumber: number,
				currentNumberID: index + 1,
				height: calcNumToHeight(number, maxNumber),
				isSelecting: false,
				initialIndex: index,
				curIndex: index,
				isOrdered: false,
			}));
	}
}

function calcNumToHeight(number, maxNumber) {
	return (
		MIN_HEIGHT +
		Math.round(((CONTAINER_HEIGHT - MIN_HEIGHT) * number) / maxNumber)
	);
}
