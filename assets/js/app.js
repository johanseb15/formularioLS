//Variables
const listaTweets = document.getElementById('lista-tweets');



//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
}
    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);


//Funciones
//Añadir tweet del formulario
    function agregarTweet(e){
        e.preventDefault();
        //Leer el valor del text area
        const tweet = document.getElementById('tweet').value;
        //Crear botón de eliminar
        const botonBorrar =document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        
        //Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //Añade el botón borrar al tweet
        li.appendChild(botonBorrar);
        //Añade el tweet a la lista
        listaTweets.appendChild(li);

        //Agrega el tweet al local storage
        agregarTweetLocalStorage(tweet);
}

//Elimina el tweet del DOM
    function borrarTweet(e){
        e.preventDefault();
        if(e.target.className === 'borrar-tweet'){
            e.target.parentElement.remove();
            borrarTweetLocalStorage(e.target.parentElement.innerText);
        }

    };


//Mostrar datos del localStorage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        //Crear botón de eliminar
        const botonBorrar =document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        
        //Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //Añade el botón borrar al tweet
        li.appendChild(botonBorrar);
        //Añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

//Agrega tweet al localStorage
    function agregarTweetLocalStorage(tweet){
        let tweets;
        tweets = obtenerTweetsLocalStorage();
        //Añadir el nuevo tweet
        tweets.push(tweet);
        //Convertir de string a arreglo para local storage
        localStorage.setItem('tweets', JSON.stringify(tweets) );
}

//Comprobar que haya elementos en localStorage //Retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valoes de local storage
    if(localStorage.getItem('tweets') === null) {
         tweets = []; 
    } else {
         tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

//Elminar tweet del localStorage
    function borrarTweetLocalStorage(tweet){
        let tweets, tweetBorrar;
        //Elimina la X del tweet
        tweetBorrar = tweet.substring(0 , tweet.length - 1);

        tweets = obtenerTweetsLocalStorage();

        tweets.forEach(function(tweet, index){
           if(tweetBorrar === tweet){
               tweets.splice(index, 1);
           }
        });

        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
