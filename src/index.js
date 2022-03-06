document.addEventListener('DOMContentLoaded', () => {
    renderDogImages();
    getDogBreedList()
    .then(listObj => {
        console.log(listObj);
        renderDogBreedList(listObj);
    });
})

function renderDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then( res => res.json())
    .then( data => {
        // find image container in DOM
        const imgContainer = document.getElementById('dog-image-container');

        data.message.forEach(img => {
            // create image element
            const imgElement = document.createElement('img');
            imgElement.src = img;

            // append images to container
            imgContainer.appendChild(imgElement);
        });
    })
    .catch( error => console.log(error.message));
}

// function renderDogBreedList() {
//     fetch('https://dog.ceo/api/breeds/list/all')
//     .then( res => res.json())
//     .then( data => {
//         // find dog breed list ul in DOM and clear its contents
//         const dogBreedList = document.getElementById('dog-breeds');
//         dogBreedList.innerHTML = "";

//         for (const breed in data.message) {
//             // create li element
//             const li = document.createElement('li');
//             li.textContent = breed;
//             li.addEventListener('click', () => li.style.color = randomColor());

//             // append li element to DOM
//             dogBreedList.appendChild(li);
//         };
//     })
//     .catch( error => console.log(error.message));
// }

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// dropdown filter
const filterDropdown = document.getElementById('breed-dropdown');
filterDropdown.addEventListener('change', (e) => renderFilteredDogList(e))

function renderFilteredDogList(e) {
    // get letter selected for filtering
    let letter = e.target.value;

    // get server list
    fetch('https://dog.ceo/api/breeds/list/all')
    .then( res => res.json())
    .then( data => {
        // find dog breed list ul in DOM and clear its contents
        const dogBreedList = document.getElementById('dog-breeds');
        dogBreedList.innerHTML = "";

        for (const breed in data.message) {
            if (breed.startsWith(letter)) {
                // create li element
                const li = document.createElement('li');
                li.textContent = breed;
                li.addEventListener('click', () => li.style.color = randomColor());

                // append li element to DOM
                dogBreedList.appendChild(li);
            }
        };
    })
    .catch( error => console.log(error.message));
}


// Alt Solution

function getDogBreedList() {
    return fetch('https://dog.ceo/api/breeds/list/all')
    .then( res => res.json())
    .then( data => data.message)
    .catch( error => console.log(error.message));
}

function renderDogBreedList(listObj) {
    console.log(listObj);
    console.log(listObj.keys);

    // find dog breed list ul in DOM and clear its contents
    const dogBreedList = document.getElementById('dog-breeds');
    dogBreedList.innerHTML = "";

    for (const breed in listObj) {
        // create li element
        const li = document.createElement('li');
        li.textContent = breed;
        li.addEventListener('click', () => li.style.color = randomColor());

        // append li element to DOM
        dogBreedList.appendChild(li);
    };
}