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

export class ShoppingList {
  constructor(shoppingListDiv) {
    this.shoppingListDiv = shoppingListDiv;
    this.ul = this.shoppingListDiv.querySelector("ul");
    const qrcodeContainer = shoppingListDiv.querySelector("#qrcode");

    // Create a QR code instance
    this.qrcode = new QRCode(qrcodeContainer, {
      text: '', // The content you want to encode in the QR code
      width: 120, // Width of the QR code
      height: 120 // Height of the QR code
    });
    qrcodeContainer.addEventListener("click", () => {
        navigator.clipboard.writeText(this.getUrl());
    })

    this.items = null;

    const url = new URL(window.location.href);
    if (url.searchParams.has("items")) {
      try {
        const itemNames = JSON.parse(url.searchParams.get("items"));
        this.items = itemNames ? itemNames.map(itemName => new ListItem(itemName, this)) : [];
        url.searchParams.delete("items");
        history.replaceState({}, document.title, url);
      } catch (error) {
        console.error(error);
      }
    }

    // If no parameters were given, or if loading didn't work, try to
    // load from localStorage
    if (this.items === null) {
      try {
        const itemNames = JSON.parse(localStorage.getItem("items"));
        this.items = itemNames ? itemNames.map(itemName => new ListItem(itemName, this)) : [];
      } catch (error) {
        console.error(error);
      }
    }

    // fallback if nothing else works
    if (this.items === null) {
      this.items = [];
    }
    this.render();
  }

  // noinspection JSUnusedGlobalSymbols
  toJSON() {
    return this.items.map(item => item.itemName);
  }

  save() {
    localStorage.setItem("items", JSON.stringify(this));
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

  getUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("items", JSON.stringify(this));
    return url.toString();
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

    try {
      this.qrcode.clear();
      this.qrcode.makeCode(this.getUrl());
    } catch (error) {
      console.error(error);
    }
  };
}

const sl = new ShoppingList(document.getElementById("shoppingListDiv"));
