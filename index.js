// get the items
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
console.log(list);
// the application's state
const items = [];

function handleSubmit(e) {
  e.preventDefault();
  console.log('submittin!');
  // input is available through/via its parent.
  // the addEventListener is on the form, no the input
  const name = e.currentTarget.item.value;
  if(!name) return;
  
  const item = {
    name : name,
    id : Date.now(),
    complete: false,
  }
  // pust item into state
  items.push(item);
  // clear the form
  e.target.reset();
  // show the items
  displayItems();
}

function displayItems() {
  // create a string with items in array and put them inside the list
  const html = items.map(item =>
    `<li>
      <input type="checkbox">
        <span> ${item.name}</span>
        <button aria-label="remove ${item.name}">&times;</button>
    </li>`
  ).join('');
  list.innerHTML = html;
}

// listen for submitting
shoppingForm.addEventListener('submit', handleSubmit);
