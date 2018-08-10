const tags = ['dogs', 'candy', 'beach', 'cars', 'plane', 'money', 'orange'];
let cells = document.getElementsByClassName('display-tag');

// box = []//coorectGuess
 
// let correctGuess = ''; //dog
function correctTags(){
	console.log(cells);
	correctGuess = tags[Math.floor(Math.random() * (tags.length - 1))] //cities

	// box.push(correctGuess)
	tags.splice(tags.indexOf(correctGuess),1);
	console.log(correctGuess);
	// return correctGuess
	console.log(Math.floor(Math.random() * cells.length));
	cells[Math.floor(Math.random() * (cells.length -1))].innerHTML = correctGuess;
}

const fariz = document.getElementsByClassName('display-tag');

for (i = 0; i < fariz.length; i++ ){
	fariz[i].onclick = function(event){
		event.preventDefault();
		console.log(event.target);
		if (event.target.innerHTML == correctGuess) {
			window.alert('Good guess!');
			location.reload();
		} else {
			window.alert('Owh... you did not get the right answer');
			location.reload();
		}
	}	
}

function tagFill(correctGuess){
	for(i = 0; i < cells.length; i++){
		if (cells[i].innerHTML == ''){
			let num = Math.floor(Math.random() * (tags.length -1 ));
			let wrong = tags[num];
			tags.splice(num,1);
			cells[i].innerHTML = wrong;
		}
	}
}

function boxFill(){
	for(i = 0; i < (cells.length - 1); i++){
		tags[Math.floor(Math.random() * (tags.length - 1))]
	}
}


correctTags();
tagFill();
//Query form
const form = document.getElementById('query-form');

// test input field
const query = document.getElementById('query');

const list = document.getElementById('list-data');

// set onsubmit
// form.onsubmit = function(event){
// 	event.preventDefault();

// 	// get value in input field
// 	const queryTerm = query.value;
// 	console.log(queryTerm);

// 	getTaggedPhotos(queryTerm);
// }
// getTaggedPhotos(correctGuess)
function getTaggedPhotos(tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=AvZCqKSQgrQXiu23to4nKomVWUy4yjYKcq6Df33lTVNHiTWCNr')
	.then(function(response){
		console.log(response)
		if(!response.ok){
		window.alert('Sorry, something went wrong. please contact me.')

			return;
		}
	return response.json();
	})
	.then(function(result){
		if(!result){
			return;
		}
		// clear list
		list.innerHTML = '';

		const items = result.response;

		for(let i = 0; i < items.length; i++){
			const item = items[i];

			if(item.photos != undefined){
				const altSizes = item.photos[0].alt_sizes
				const imgSrc = altSizes[altSizes.length - 3].url;

				const img = document.createElement('img');
				img.src = imgSrc;

				const li = document.createElement('li');
				li.appendChild(img);
				// li.innerHTML = imgSrc;

				list.appendChild(li);
			}
		}
	})
	.catch(function(err){
		window.alert('Sorry, please try agian in a bit.')
		console.log('message:', err)
	})
	}

getTaggedPhotos(correctGuess);
// getTaggedPhotos('dogs')