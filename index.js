// get the items
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
console.log(list);
// the application's state
let items = [];

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
  // fire a custom  event
  list.dispatchEvent( new CustomEvent('itemsUpdated'));
}

function displayItems() {
  // create a string with items in array and put them inside the list
  const html = items.map(item =>
    `<li class="list-item">
      <input type="checkbox" value="${item.id}"
      ${item.complete ? "checked" : ""}>
        <span> ${item.name}</span>
        <button
          aria-label="remove ${item.name}"
          class="btn-close"
          value="${item.id}"
          ><span>&times;</span>
        </button>
    </li>`
  ).join('');
  list.innerHTML = html;
}

function mirrorLocalStorage() {
  console.info('Saving items in local storage');
  // localStorage stores only text
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('Restoring from localStorage');
  //pull items from localStorage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if(lsItems.length) {
    // items = lsItems; // if items is const , this doesn't work
    //We could use a forEach loop also

    items.push(...lsItems); // spreading operator
  }
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function deleteItem(id) {
  console.log(`deleting item id: ${id}`);
  // update items -> overwrite the array
  items = items.filter(item => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsCompleted(id) {
  console.log('marking as complete: ',id);
  const itemRef = items.find(item => item.id === id);
  // toggle complete
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
// listen for submitting
shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorLocalStorage);

// Event delegation: we listen to the list but if button was clicked
// the event is delegated to it.
list.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  if(e.target.matches('button')) {
    deleteItem(id);
  }
  if(e.target.matches('input[type="checkbox"]')) {
    markAsCompleted(id);
  }
});
restoreFromLocalStorage();
