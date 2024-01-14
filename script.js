const summaryTable = document.getElementById('summaryTable');
const totalSalesInput = document.getElementById('totalSales');
const totalQuantitySoldTable = document.getElementById('totalQuantitySoldTable');
const itemQuantitySold = {};
const items = document.querySelectorAll('.item');

let totalSales = 0;
let selectedItem = null;

function addToSummary() {
  const itemName = document.querySelector('.item.selected h3').textContent;
  const itemPrice = parseFloat(document.querySelector('.item.selected p').textContent.replace('$', ''));
  const quantity = parseInt(document.getElementById('quantity').value);
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

  if (itemQuantitySold[itemName]) {
    itemQuantitySold[itemName].quantity += quantity;
  } else {
    itemQuantitySold[itemName] = {
      price: itemPrice,
      quantity: quantity
    };
  }

  updateTotalQuantitySoldTable();

  document.getElementById('calculatorForm').reset();
  itemDetails.textContent = '';
}

function updateTotalQuantitySoldTable() {
  totalQuantitySoldTable.innerHTML = `
    <tr>
      <th>Item</th>
      <th>Price</th>
      <th>Quantity Sold</th>
    </tr>
  `;

  items.forEach(item => {
    const itemName = item.querySelector('h3').textContent;
    const itemPrice = parseFloat(item.querySelector('p').textContent.replace('$', ''));
    const quantitySold = itemQuantitySold[itemName] ? itemQuantitySold[itemName].quantity : 0;

    const newRow = totalQuantitySoldTable.insertRow(-1);
    const itemCell = newRow.insertCell(0);
    const priceCell = newRow.insertCell(1);
    const quantitySoldCell = newRow.insertCell(2);

    itemCell.textContent = itemName;
    priceCell.textContent = `$${itemPrice.toFixed(2)}`;
    quantitySoldCell.textContent = quantitySold;
  });
}
function selectItem(item) {
    
    if (selectedItem) {
      selectedItem.classList.remove('selected');
    }
    selectedItem = item;
    selectedItem.classList.add('selected');
    
    const itemName = item.querySelector('h3').textContent;
    const itemPrice = parseFloat(item.querySelector('p').textContent.replace('$', ''));
    itemDetails.textContent = `Selected Item: ${itemName}`;
    document.getElementById('itemPrice').value = itemPrice.toFixed(2);
  }

  items.forEach((item) => {
    item.addEventListener('click', () => {
      selectItem(item);
    });
  });