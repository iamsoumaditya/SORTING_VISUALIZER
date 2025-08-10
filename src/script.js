// ====== Variables ======
const inputs = document.querySelectorAll("#array-inputs input");
//let arr = Array(inputs.length).fill(0);
let arr = Array.from(inputs).map((input) => Number(input.value) || 0);

let originalArr = [...arr];

// ====== Update Bars Function ======
function updateBars(activeIndices = [], sortedIndices = []) {
  const container = document.querySelector("main > div");
  container.innerHTML = "";
  const maxVal = Math.max(...arr, 1);

  arr.forEach((value, index) => {
    const col = document.createElement("div");
    col.className = "flex flex-col items-center";

    const bar = document.createElement("div");
    bar.style.height = `${(value / maxVal) * 10}rem`;
    let colorClass = "bg-indigo-500";

    if (sortedIndices.includes(index)) {
      colorClass = "bg-green-500";
    } else if (activeIndices.includes(index)) {
      colorClass = "bg-red-500";
    }

    bar.className = `${colorClass} w-8 rounded-t`;

    const label = document.createElement("span");
    label.className = "mt-2 text-sm font-bold";
    label.textContent = value;

    col.appendChild(bar);
    col.appendChild(label);
    container.appendChild(col);
  });
}

// ====== Input Listeners ======
inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    let val = (e.target.value = e.target.value.replace(/\D/g, ""));
    arr[index] = Number(val) || 0;
    updateBars();

    if (val.length === 2 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && index < inputs.length - 1) {
      e.preventDefault();
      inputs[index + 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputs[index - 1].focus();
    } else if (e.key === "Backspace" && !input.value && index > 0) {
      e.preventDefault();
      inputs[index - 1].focus();
    } else if (
      e.key === "Delete" &&
      !input.value &&
      index < inputs.length - 1
    ) {
      e.preventDefault();
      inputs[index + 1].focus();
    }
  });
});

// ====== Delay Helper ======
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// ====== Bubble Sort ======
async function bubbleSort() {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      updateBars([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        updateBars([j, j + 1]);
      }
      await delay(500);
    }
  }
  updateBars([], [...Array(n).keys()]);
}

// ====== Selection Sort ======
async function selectionSort() {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      updateBars([minIdx, j], [...Array(i).keys()]);
      if (arr[j] < arr[minIdx]) minIdx = j;
      await delay(500);
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      updateBars([i, minIdx], [...Array(i + 1).keys()]);
    }
    await delay(500);
  }
  updateBars([], [...Array(n).keys()]);
}

// ====== Insertion Sort ======
async function insertionSort() {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      updateBars([j, j + 1], [...Array(i).keys()]);
      await delay(500);
      j--;
    }
    arr[j + 1] = key;
    updateBars([j + 1], [...Array(i + 1).keys()]);
    await delay(500);
  }
  updateBars([], [...Array(n).keys()]);
}

// ====== Button Events ======
document
  .querySelector("#bubble-sort-btn")
  .addEventListener("click", bubbleSort);
document
  .querySelector("#selection-sort-btn")
  .addEventListener("click", selectionSort);
document
  .querySelector("#insertion-sort-btn")
  .addEventListener("click", insertionSort);

// ====== Initial Render ======
updateBars();

function resetArray() {
  arr = [...originalArr];
  updateBars();
}