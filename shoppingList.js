class ListItem {
  /**
   * @param {string} itemName
   * @param {ShoppingList} shoppingList
   */
  constructor(itemName, shoppingList) {
    this.itemName = itemName;
    this.shoppingList = shoppingList;
    this.render();
  }

  render() {
    const elem = document.createElement("li");
    elem.classList.add("list-group-item");
    elem.innerText = this.itemName;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "float-right");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", () => {
      this.shoppingList.deleteItem(this);
    })
    elem.appendChild(deleteButton);

    return elem;
  }
}

class AddItemForm {
  constructor(shoppingList) {
    this.shoppingList = shoppingList;
  }

  render() {
    const form = document.createElement("form");
    form.classList.add("form-inline");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "newItemInput";
    input.classList.add("form-control", "mr-2", "w-75");
    input.autocomplete = "off";

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Add Item";
    button.classList.add("btn", "btn-primary", "float-right");
    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener("submit", (e) => {
      this.shoppingList.addItem(input.value)
      e.preventDefault();
    });
    return form;
  }
}

class ShoppingList {
  constructor(shoppingListDiv) {
    this.shoppingListDiv = shoppingListDiv;
    this.ul = this.shoppingListDiv.querySelector("ul");
    const qrcodeContainer = shoppingListDiv.querySelector("#qrcode");

    // Create a QR code instance
    this.qrcode = new QRCode(qrcodeContainer, {
      text: '', // The content you want to encode in the QR code
      width: 80, // Width of the QR code
      height: 80 // Height of the QR code
    });

    this.load();
    this.render();
  }

  load() {
    this.items = (JSON.parse(localStorage.getItem("items")) || [])
      .map((itemName, index) => new ListItem(itemName, this));
  }

  save() {
    localStorage.setItem("items", JSON.stringify(this.items.map(item => item.itemName)));
  }

  addItem(name) {
    if (!name) return;
    this.items.push(new ListItem(name, this));
    this.save();
    this.render();
  }

  deleteItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.save();
    this.render();
  }

  render() {
    this.ul.innerHTML = "";

    this.items.forEach(item => {
      this.ul.appendChild(item.render());
    });

    const form = (new AddItemForm(this)).render();
    const formLi = document.createElement("li");
    formLi.classList.add("list-group-item");
    formLi.appendChild(form);
    this.ul.appendChild(formLi);

    const newItemInput = document.getElementById("newItemInput");
    newItemInput.focus();

    this.qrcode.clear();
    this.qrcode.makeCode(JSON.stringify(this.items.map(item => item.itemName)));
  };
}
