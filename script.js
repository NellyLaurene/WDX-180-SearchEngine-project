const datalist = document.querySelector('datalist');
const inputBox = document.getElementById('book-choice');
const list1 = document.getElementById('list1');
const list2 = document.getElementById('list2');
const list3 = document.getElementById('list3');
const bubbles = document.querySelectorAll('.bubble');
const resultBubble = document.querySelector('.results span')
const button = document.querySelector('.total');
const reset = document.querySelector('.reset');


// DataList dynamic implementation with functionality
const optionList = [
    'Mystery',
    'Thriller',
    'Romance',
    'True Crime',
    'Epic Fantasy'
];

for(let i=0; i < optionList.length; i++) {
    const option = `<option value="${optionList[i]}"></option>`
    datalist.innerHTML += option;
}


// Adding Genre list on the page from the array dynamically
const fictionList = ['Mystery', 'Thriller', 'Romance', 'Historical Fiction', 'Literary Fiction'];
const nonFictionList = ['Biography', 'Memoir', 'Self-help', 'True Crime', 'Business/Finance'];
const fantasyList = ['Epic Fantasy', 'High Fantasy', 'Low Fantasy', 'Magical Realism', 'Urban Fantasy']; 

function addItem (ulList, arrayList) {
    for(let i=0; i < arrayList.length; i++){
        const list = document.createElement('li');
        list.textContent = arrayList[i];
        ulList.appendChild(list)
    }
}

// Event Listeners

function initApp() {

    // Function to handle each list box functionality instead of repeating it 3 times
    function listFunctionality(arrayOfGerne, liTagInArray, inputValue) {

       let counter = 0;

       // Reset of the list
        liTagInArray.forEach(li => {
            li.style.color = 'white';
            li.innerHTML = arrayOfGerne[arrayOfGerne.indexOf(li.textContent)]; // To set back the array element as it was without the formatting
        })

        // Lopping through the array
        for(let i=0; i < arrayOfGerne.length; i++) {
            const genreItem = arrayOfGerne[i].toLowerCase();

            if(genreItem.includes(inputValue)) {
                counter++;

                const startIndex = genreItem.indexOf(inputValue);
                const endIndex = startIndex + inputValue.length;

                const beforeMatch = arrayOfGerne[i].slice(0, startIndex);
                const match = arrayOfGerne[i].slice(startIndex, endIndex);
                const afterMatch = arrayOfGerne[i].slice(endIndex);

                liTagInArray[i].innerHTML = `${beforeMatch}<span style="color:magenta">${match}</span>${afterMatch}`
            }
        }

        if(inputValue === '') {
            liTagInArray.forEach(li => {
                li.style.color = 'white';
            })
            counter = 0;
        }
        return counter;
    }

    // InputHandle to handle any change that happens in input box
    function inputHandler() {
        const inputValue = inputBox.value.toLowerCase(); // for case sensitiye
        const listA = list1.querySelectorAll('li');
        const listB = list2.querySelectorAll('li');
        const listC = list3.querySelectorAll('li');

        // Calling the listFunctionality with each array and ul -> li
        const counterA = listFunctionality(fictionList, listA, inputValue);
        const counterB = listFunctionality(nonFictionList, listB, inputValue);
        const counterC = listFunctionality(fantasyList, listC, inputValue);

        const totalCounter = counterA + counterB + counterC;

        // Update bubbles number(counter) for each list starting from 1 because 0 is for results span
        bubbles[1].textContent = counterA; 
        bubbles[2].textContent = counterB; 
        bubbles[3].textContent = counterC;


        // Show or hide bubbles based on counter values
        if (counterA > 0) {
            bubbles[1].classList.remove('invisible');
        } else {
            bubbles[1].classList.add('invisible');
        }
        
        if (counterB > 0) {
            bubbles[2].classList.remove('invisible');
        } else {
            bubbles[2].classList.add('invisible');
        }
        
        if (counterC > 0) {
            bubbles[3].classList.remove('invisible');
        } else {
            bubbles[3].classList.add('invisible');
        }

        if (inputValue === '') {
            resultBubble.textContent = 0; 
        }

        return totalCounter;
    }

    // Click event to be able to see the total when you cick on the button
    button.addEventListener('click', () => {
        const inputValue = inputBox.value.toLowerCase(); 

        const counter = inputHandler(); 
        resultBubble.textContent = counter; 

        if (inputValue === '') {
            resultBubble.textContent = 0; 
        }
    });

    // Reset button functionality
    reset.addEventListener('click', () => {
        const inputValue = inputBox.value.toLowerCase(); 
        const list = document.querySelectorAll('ul li');
        const spans = document.querySelectorAll('li span');

        // Change the result back to 0
        resultBubble.textContent = 0; 

        // Make the input box empty in case there is sth there
        if (inputValue !== '') {
            inputBox.value = '';
        }

        // Make bubble circles to 0
        bubbles[1].textContent = 0; 
        bubbles[2].textContent = 0; 
        bubbles[3].textContent = 0;

        // Mkaing the bubble circles starting from the 2 invisible
        for(let i=1; i < bubbles.length; i++) {
            bubbles[i].classList.add('invisible')
        }

        // Not neccessaly
        // list.forEach(li => {
        //     li.style.color = 'white';
        // })

        spans.forEach(span => {
            span.style.color = 'white';
        })
    })

    inputBox.addEventListener('input', inputHandler);
    //inputBox.addEventListener('change', changeHandler);
}


addItem(list1, fictionList);
addItem(list2, nonFictionList);
addItem(list3, fantasyList);
initApp();

