let array = [];

function generateArray() {
    array = [];
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    for (let i = 0; i < 30; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
        const bar = document.createElement("div");
        bar.style.height = `${array[i]}px`;
        bar.className = "array-bar";
        arrayContainer.appendChild(bar);
    }
}

function resetArray() {
    generateArray();
}

async function visualizeBubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            const bar1 = document.getElementsByClassName("array-bar")[j];
            const bar2 = document.getElementsByClassName("array-bar")[j + 1];

            bar1.style.backgroundColor = "#e81710";
            bar2.style.backgroundColor = "#e81710";

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bar1.style.height = `${array[j]}px`;
                bar2.style.height = `${array[j + 1]}px`;
            }

            bar1.style.backgroundColor = "#0a67a6";
            bar2.style.backgroundColor = "#0a67a6";
        }
    }
}

async function visualizeInsertionSort() {
    const n = array.length;
    for (let i = 0; i < n; i++) {
        const key = array[i];
        let j = i - 1;

        const currentBar = document.getElementsByClassName("array-bar")[i];
        currentBar.style.backgroundColor = "#0a67a6";

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 100)
        );

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];

            const bar1 = document.getElementsByClassName("array-bar")[j];
            const bar2 = document.getElementsByClassName("array-bar")[j + 1];

            bar1.style.height = `${array[j]}px`;
            bar2.style.height = `${array[j + 1]}px`;

            j--;

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );
        }

        array[j + 1] = key;
        currentBar.style.backgroundColor = "#0a67a6";
        currentBar.style.height = `${key}px`;

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 100)
        );
    }
    visualizeInsertionSort();
}


async function merge(left, right, leftIndex, rightIndex) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    for (let k = 0; k < result.length; k++) {
        array[leftIndex + k] = result[k];
        const bar = document.getElementsByClassName("array-bar")[leftIndex + k];
        bar.style.height = `${result[k]}px`;
        bar.style.backgroundColor = "#e81710";

        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 100)
        );
    }
}

async function mergeSort(leftIndex, rightIndex) {
    if (leftIndex < rightIndex) {
        const middle = Math.floor((leftIndex + rightIndex) / 2);

        await mergeSort(leftIndex, middle);
        await mergeSort(middle + 1, rightIndex);
        await merge(
            array.slice(leftIndex, middle + 1),
            array.slice(middle + 1, rightIndex + 1),
            leftIndex,
            middle + 1
        );
    }
}

async function visualizeMergeSort() {
    await mergeSort(0, array.length - 1);
}

generateArray();
