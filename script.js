const accessKey = 'S3126JKadtCEfcq-Uz4aLSKlLJhKVCUVw9zDV5Rmum8';
const count = 10;
const imageApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

const quoteApiUrl = 'https://type.fit/api/quotes';

let apiQuotes = [];
let imageArray = [];

let ready = false;
let imagesLoaded = 0;
//count images loaded, check to load more
function loadMoreImages(){
    imagesLoaded++;
    if(imagesLoaded === count){
        imagesLoaded = 0;
        ready = true;
    }
}

//get quote from API
async function getQuotesAndPhotos(){
    try{
        const quoteResponse = await fetch(quoteApiUrl);
        apiQuotes = await quoteResponse.json();
    } catch(error){
        console.log('No quote', error);
    }

    try{
        const imageResponse = await fetch(imageApiUrl);
        imageArray = await imageResponse.json();
        displayPhotosWithQuotes();
    } catch(error){
        console.log('Could not get image', error);
    }
}

function displayPhotosWithQuotes(){
    //getQuotesAndPhotos();
    console.log(imageArray.length);
    imageArray.forEach((arrayImage) => {
        //create new image container
        const imageContainer = document.createElement('div');
        imageContainer.setAttribute('class', 'image-container');

        // create image
        const image = document.createElement('img');
        image.setAttribute('src', arrayImage.urls.regular);

        image.addEventListener('load', loadMoreImages);//checks if more images need to be loaded
        
        // create text container for quote and author
        const textContainer = document.createElement('div');
        textContainer.setAttribute('class', 'text-container');
        
        //create container for quote
        const quoteText = document.createElement('div');
        quoteText.setAttribute('class', 'quote-text');
        let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        quoteText.innerText = quote.text;

        //create container for author
        const authorText = document.createElement('div');
        authorText.setAttribute('class', 'author-text');
        //let author = 'AUTHOOORRRR';
        authorText.innerText = quote.author;
        
        //quote text
        // let quote = 'example quote';
        // const quoteSpan = document.createElement('span');
        // quoteSpan.setAttribute('id', 'quote');
        // quoteSpan.innerText = quote;
        
        //quoteText.appendChild(quoteSpan);
        textContainer.appendChild(quoteText);
        textContainer.appendChild(authorText);
        
        imageContainer.appendChild(image);
        imageContainer.appendChild(textContainer);
        document.body.appendChild(imageContainer);
    });

}

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        imagesLoaded = 0;
        console.log('load more');
        getQuotesAndPhotos();
    }
});

//on load
//displayPhotosWithQuotes();
getQuotesAndPhotos();