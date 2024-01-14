const summaryTable = document.getElementById('summaryTable');
const totalSalesInput = document.getElementById('totalSales');
const itemDetails = document.getElementById('itemDetails');
let totalSales = 0;

let selectedQuantity = 1; // Added variable to track selected quantity

function addToSummary() {
    const itemName = document.querySelector('.item.selected h3').textContent;
    const itemPrice = parseFloat(document.querySelector('.item.selected p').textContent.replace('$', ''));
    const quantity = parseInt(document.getElementById('quantity').value); // Use the input value for quantity
    const totalPrice = itemPrice * quantity;
    const time = new Date().toLocaleTimeString();

    const newRow = summaryTable.insertRow(-1);
    const itemCell = newRow.insertCell(0);
    const priceCell = newRow.insertCell(1);
    const quantityCell = newRow.insertCell(2);
    const timeCell = newRow.insertCell(3);

    itemCell.textContent = itemName;
    priceCell.textContent = `$${itemPrice.toFixed(2)}`;
    quantityCell.textContent = quantity;
    timeCell.textContent = time;

    totalSales += totalPrice;
    totalSalesInput.textContent = `Total Sales: $${totalSales.toFixed(2)}`;

    // Reset the form
    document.getElementById('calculatorForm').reset();
    itemDetails.textContent = '';
  }

function selectItem(item) {
    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      item.classList.remove('selected');
    });
    
    item.classList.add('selected');

    const itemName = item.querySelector('h3').textContent;
    const itemPrice = parseFloat(item.querySelector('p').textContent.replace('$', ''));
    itemDetails.textContent = `Selected Item: ${itemName}`;
    document.getElementById('itemPrice').value = itemPrice.toFixed(2);
  }

const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      selectItem(item);
    });
  });