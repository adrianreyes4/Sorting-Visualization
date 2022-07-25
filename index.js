let listNums = []
let total = 500;

for (let i = 0; i < total; i++){
    listNums[i] = i + 1
}
//Durstenfeld shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffle(listNums)

//selecting the class element
let listEl = document.querySelector('.list-el')

//prints out bars in their current list order
function bars(){
    for (let i = 0; i < total; i++){
        let bar = document.createElement("div")
        bar.innerHTML = `
        <div id="${listNums[i]}" style="width: 2px; height: ${listNums[i]}px; margin: 0px; margin-top: 2px; background-color: red;"></div>
            `;
        listEl.appendChild(bar);
    }
    //solves the issue of the last call for bars making another set
    if(listEl.childElementCount > total){
        listEl.innerText = ""
        bars()
    }
}
bars()

const shuffleBtn = document.getElementById("shuffle-btn")
shuffleBtn.addEventListener("click", function(){
    shuffle(listNums);
    bars();
})

const selectionBtn = document.getElementById("select-btn")
selectionBtn.addEventListener("click", function(){
    for(let i = 0; i < listNums.length; i++){
        setTimeout(() => {
            let min = i;
            for(let j = i+1; j < listNums.length; j++){
                listEl.innerText = "";
                if(listNums[j] < listNums[min]){
                    min = j;
                }
            }
            if(min != i){
                let temp = listNums[i];
                listNums[i] = listNums[min];
                listNums[min] = temp;
            }
            bars()
        }, i * 10, i);
    }
})

const bubbleBtn = document.getElementById("bubble-btn");
bubbleBtn.addEventListener("click", function(){
    for (let i = 0; i < listNums.length; i++){
        setTimeout(() => {
            for (let j = 0; j < listNums.length - i - 1; j++){
                if(listNums[j] > listNums[j+1]){
                    let temp = listNums[j];
                    listNums[j] = listNums[j+1];
                    listNums[j+1] = temp;
                }
            }
            bars()
        }, i * 10, i);
    }
})

const insertionBtn = document.getElementById("insertion-btn");
insertionBtn.addEventListener("click", function(){
    for (let i = 1; i < listNums.length - 1; i++){
        setTimeout(() => {
            let j = i;
            while (j > 0 && listNums[j-1] > listNums[j]){
                let temp = listNums[j];
                listNums[j] = listNums[j-1];
                listNums[j-1] = temp;
                j = j-1
            }
            bars()
        }, i * 10, i);
    }
})

//https://www.geeksforgeeks.org/merge-sort-visualization-in-javascript/
let itmd = [];
function mergeArray(start, end) {
    // >> 1 works like / 2
    let mid = parseInt((start + end) >> 1);
    let start1 = start, start2 = mid + 1
    let end1 = mid 
    let end2 = end
     
    // Initial index of merged subarray
    let index = start
 
    while (start1 <= end1 && start2 <= end2) {
        if (listNums[start1] <= listNums[start2]) {
            itmd[index] = listNums[start1]
            index = index + 1
            start1 = start1 + 1;
        }
        else if (listNums[start1] > listNums[start2]) {
            itmd[index] = listNums[start2]
            index = index + 1
            start2 = start2 + 1;
        }
    }
 
    // Copy the remaining elements of
    // listNums[], if there are any
    while (start1 <= end1) {
        itmd[index] = listNums[start1]
        index = index + 1
        start1 = start1 + 1;
    }
 
    while (start2 <= end2) {
        itmd[index] = listNums[start2]
        index = index + 1
        start2 = start2 + 1;
    }
 
    index = start
    while (index <= end) {
        listNums[index] = itmd[index];
        index++;
    }
}
// Waiting interval between two bars
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Merge Sorting
const mergeSort = async (start, end) => {
    if (start < end) {
        let mid = parseInt((start + end) >> 1);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await mergeArray(start, end);
        await bars();
        // Waiting time is 10ms
        await timeout(10);
    }
}
const performer = async () => {
    await mergeSort(0, listNums.length - 1)
}

const mergeBtn = document.getElementById("merge-btn");
mergeBtn.addEventListener("click", function(){
    performer()
})

//https://www.geeksforgeeks.org/quick-sorthoares-partition-visualization-using-javascript/
async function hoare_partition(l, r, delay = 10) {
    let pivot = listNums[l]
  
    var i = l - 1;
    var j = r + 1;
  
    while (true) {
        // Find leftmost element greater than
        // or equal to pivot
        do {
            i++;
        } while (listNums[i] < pivot);
  
        // Find rightmost element smaller than
        // or equal to pivot
        do {
            j--;
        } while (listNums[j] > pivot);
  
        // If two pointers met.
        if (i >= j) {
            return j;
        }
  
        //swapping ith and jth element
        let temp1 = listNums[i];
        listNums[i] = listNums[j];
        listNums[j] = temp1;
        bars()
        await timeout(10);
    }
}

// Asynchronous QuickSort function
async function quickSort(l, r, delay = 10) {
    // QuickSort Algorithm
    if (l < r) {
        //Storing the index of pivot element after partition
        let pivot_idx = await hoare_partition(l, r);
        //Recursively calling quicksort for left partition
        await quickSort(l, pivot_idx);
        //Recursively calling quicksort for right partition
        await quickSort(pivot_idx + 1, r);
    }
}

//"pivot" used to divide and work with left and right pointer to find its place
const quickBtn = document.getElementById("quick-btn");
quickBtn.addEventListener("click", function(){
    quickSort(0, listNums.length - 1)
})

//geeksforgeeks.org/heap-sort/
async function heapSort( arr)
    {
        let n = arr.length;
  
        // Build heap (rearrange array)
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
            heapify(arr, n, i);
  
        // One by one extract an element from heap
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            bars()
            await timeout(10);

            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
}
  
    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
function heapify(arr, n, i)
    {
        let largest = i; // Initialize largest as root
        let l = 2 * i + 1; // left = 2*i + 1
        let r = 2 * i + 2; // right = 2*i + 2

        // If left child is larger than root
        if (l < n && arr[l] > arr[largest])
            largest = l;
  
        // If right child is larger than largest so far
        if (r < n && arr[r] > arr[largest])
            largest = r;
  
        // If largest is not root
        if (largest != i) {
            let swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
  
            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
}
const heapBtn = document.getElementById("heap-btn");
heapBtn.addEventListener("click", function(){
    heapSort(listNums);
})

//https://medium.com/javascript-algorithms/javascript-algorithms-counting-sort-c94a5fd70c9c#:~:text=Counting%20sort%20is%20a%20stable,in%20O(n)%20time.
async function countingSort(arr, min, max)
{
    let i = min,
        j = 0,
        len = arr.length,
        count = [];
    for (i; i <= max; i++) {
        count[i] = 0;
    }
    for (i = 0; i < len; i++) {
        count[arr[i]] += 1;
    }
    for (i = min; i <= max; i++) {
        while (count[i] > 0) {
            arr[j] = i;
            j++;
            count[i]--;
            bars()
        }
        await timeout(10);
    }
    bars()
}
const countingBtn = document.getElementById("counting-btn");
countingBtn.addEventListener("click", function(){
    countingSort(listNums, 1, 500);
})