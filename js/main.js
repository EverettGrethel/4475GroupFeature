"use strict";
  const items = document.querySelectorAll(".accordion a");
const questionsList = document.querySelector('#accordion');
const form = document.querySelector('#my-form');


  function toggleAccordion(){
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
  }

//saving data
form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (form.input.value && form.input2.value) {
		db.collection('questions').add({
			question: form.input.value,
			answer: form.input2.value,
			timestamp: new Date()
		});
		//reset the form
		form.input.value = "";
		form.input2.value = "";
	}
})

function renderAccordion(doc) {
	let div = document.createElement("div");
	div.classList.add("accordion-item");
	let a = document.createElement('a');
	a.addEventListener('click', toggleAccordion);
	let div2 = document.createElement("div");
    div2.classList.add("content");
	let p = document.createElement('p');
	
	//retrieve data from database and store it in nodes
	let node = document.createTextNode(doc.data().question);
	let node2 = document.createTextNode(doc.data().answer);
	
	div.appendChild(a);
	a.appendChild(node);
	div2.appendChild(p);
	p.appendChild(node2);
	div.appendChild(div2);
	questionsList.appendChild(div);
}

//real-time listener to update changes
db.collection('questions').orderBy('timestamp').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			renderAccordion(change.doc);
		} else if (change.type == 'removed') {
			let li = cafeList.querySelector('[data-d=' + change.doc.id + ']');
			cafeList.removedChild(li);
		}
	})
})

// Add the event listener to all EXISTING anchors
/*items.forEach(item => item.addEventListener('click', toggleAccordion));*/