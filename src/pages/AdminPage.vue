<template>
  <div>
    <div class="card">
      <h3>
        Admin Panel - logged in as: <i>{{ userName }}</i>
      </h3>
      <div class="container">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="table-tab"
              data-bs-toggle="tab"
              data-bs-target="#table"
              type="button"
              role="tab"
              aria-controls="table"
              aria-selected="true"
            >
              Tables
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="menuitems-tab"
              data-bs-toggle="tab"
              data-bs-target="#menuitems"
              type="button"
              role="tab"
              aria-controls="menuitems"
              aria-selected="false"
            >
              Meals
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="category-tab"
              data-bs-toggle="tab"
              data-bs-target="#category"
              type="button"
              role="tab"
              aria-controls="category"
              aria-selected="false"
            >
              Categories
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="table"
            role="tabpanel"
            aria-labelledby="table-tab"
          >
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Table Number</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(table, index) in tables"
                  :key="index"
                  :value="table"
                >
                  <th scope="row">{{ index }}</th>
                  <td>{{ table.tableNumber }}</td>
                  <td>{{ table.capacity }}</td>
                  <td>{{ table.status }}</td>
                  <td>
                    <button
                      class="btn btn-secondary"
                      @click="showAndSend(table)"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="showAndSend(table, true, 'table')"
                      v-if="
                        table.status != 'Reserved' && table.status != 'Occupied'
                      "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="btn-group">
              <button class="btn btn-secondary" @click="showAdd('table')">
                Add New
              </button>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="menuitems"
            role="tabpanel"
            aria-labelledby="menuitems-tab"
          >
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(items, index) in menuItems.items"
                  :key="index"
                  :value="items"
                >
                  <th scope="row">{{ index }}</th>
                  <td>{{ items.name }}</td>
                  <td>{{ items.description }}</td>
                  <td>{{ items.categoryName }}</td>
                  <td>{{ items.price }}.00</td>
                  <td>
                    <button
                      class="btn btn-secondary"
                      @click="showAndSend(items)"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="showAndSend(items, true, 'menuItems')"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="btn-group">
              <button class="btn btn-secondary" @click="showAdd('menuItems')">
                Add New
              </button>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="category"
            role="tabpanel"
            aria-labelledby="category-tab"
          >
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Menu Items Count</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(category, index) in categories.items"
                  :key="index"
                  :value="category"
                >
                  <th scope="row">{{ index }}</th>
                  <td>{{ category.categoryName }}</td>
                  <td>{{ category.menuItems.length }}</td>
                  <td>
                    <button
                      class="btn btn-secondary"
                      @click="showAndSend(category)"
                    >
                      Edit
                    </button>
                  </td>
                  <td v-if="category.menuItems.length == 0">
                    <button
                      class="btn btn-danger"
                      @click="showAndSend(category, true, 'category')"
                    >
                      Delete
                    </button>
                  </td>
                  <td v-else></td>
                </tr>
              </tbody>
            </table>
            <div class="btn-group">
              <button class="btn btn-secondary" @click="showAdd('category')">
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>

      <a-modal v-if="showModal" @close="closeModal">
        <div slot="header">
          <div v-if="this.isDelete">Delete item?</div>
          <div v-else>
            <span v-if="sentData != undefined">
              <span v-if="sentData.tableNumber != undefined"
                ><h4>Changing table: {{ sentData.tableNumber }}</h4></span
              ><span v-if="sentData.childCategories != undefined"
                ><h4>Changing category: {{ sentData.categoryName }}</h4></span
              ><span v-if="sentData.name != undefined"
                ><h4>Changing Menu Item: {{ sentData.name }}</h4></span
              >
            </span>
            <span v-else>
              <h4 v-if="sentType == 'table'">New Table</h4>
              <h4 v-if="sentType == 'menuItems'">New Menu Item</h4>
              <h4 v-if="sentType == 'category'">New Category</h4>
            </span>
          </div>
        </div>
        <div slot="body">
          <div v-if="!this.isDelete">
            <span v-if="sentData != undefined">
              <span v-if="sentData.tableNumber != undefined">
                <div class="edit">
                  <form>
                    <label>Table Number: </label>
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      :value="sentData.tableNumber"
                      id="tableNumber"
                    />
                    <label>Table Capacity: </label>
                    <input
                      class="form-control"
                      type="number"
                      min="2"
                      :value="sentData.capacity"
                      id="tableCapacity"
                    />
                    <input
                      class="form-control"
                      type="hidden"
                      id="dataId"
                      :value="sentData.id"
                    />
                  </form>
                </div>
              </span>
              <span v-if="sentData.childCategories != undefined">
                <div class="edit">
                  <form>
                    <label>Category name: </label>
                    <input
                      class="form-control"
                      type="text"
                      :value="sentData.categoryName"
                      id="categoryName"
                    />
                    <input
                      class="form-control"
                      type="hidden"
                      id="dataId"
                      :value="sentData.id"
                    />
                  </form>
                </div>
              </span>
              <span v-if="sentData.name != undefined">
                <div class="edit">
                  <form>
                    <label>Menu Item name: </label>
                    <input
                      class="form-control"
                      type="text"
                      :value="sentData.name"
                      id="menuItemName"
                    />
                    <label>Menu Item description: </label>
                    <input
                      class="form-control"
                      type="text"
                      :value="sentData.description"
                      id="menuItemDescription"
                    />
                    <label>Menu Item price: </label>
                    <input
                      class="form-control"
                      type="number"
                      :value="sentData.price"
                      id="menuItemPrice"
                    />
                    <label>Category: </label>
                    <select id="selectCategory" class="form-control">
                      <option
                        v-for="(category, index) in allCategories"
                        :key="index"
                        :value="category.id"
                        :selected="
                          checkSelected(
                            category.categoryName,
                            sentData.categoryName
                          )
                        "
                      >
                        {{ category.categoryName }}
                      </option>
                    </select>
                    <input
                      class="form-control"
                      type="hidden"
                      id="dataId"
                      :value="sentData.id"
                    />
                  </form>
                </div>
              </span>
            </span>
            <span v-else>
              <span v-if="sentType == 'table'">
                <div class="edit">
                  <form>
                    <label>Table Number: </label>
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      id="tableNumber"
                    />
                    <label>Table Capacity: </label>
                    <input
                      class="form-control"
                      type="number"
                      min="2"
                      id="tableCapacity"
                    />
                  </form>
                </div>
              </span>
              <span v-if="sentType == 'category'">
                <div class="edit">
                  <form>
                    <label>Category name: </label>
                    <input class="form-control" type="text" id="categoryName" />
                  </form>
                </div>
              </span>
              <span v-if="sentType == 'menuItems'">
                <div class="edit">
                  <form>
                    <label>Menu Item name: </label>
                    <input class="form-control" type="text" id="menuItemName" />
                    <label>Menu Item description: </label>
                    <input
                      class="form-control"
                      type="text"
                      id="menuItemDescription"
                    />
                    <label>Menu Item price: </label>
                    <input
                      class="form-control"
                      type="number"
                      id="menuItemPrice"
                    />
                    <label>Cateogory: </label>
                    <select id="selectCategory" class="form-control">
                      <option
                        v-for="(category, index) in allCategories"
                        :key="index"
                        :value="category.id"
                      >
                        {{ category.categoryName }}
                      </option>
                    </select>
                  </form>
                </div>
              </span>
            </span>
          </div>
          <div v-else>
            <span v-if="sentType == 'table'"
              >Are you sure you want to delete this Table?
              <input type="hidden" id="dataId" :value="sentData.id" />
            </span>
            <span v-if="sentType == 'menuItems'"
              >Are you sure you want to delete this Menu item?
              <input type="hidden" id="dataId" :value="sentData.id" />
            </span>
            <span v-if="sentType == 'category'"
              >Are you sure you want to delete this Category?
              <input type="hidden" id="dataId" :value="sentData.id" />
            </span>
          </div>
        </div>
        <div slot="footer">
          <div v-if="this.isDelete">
            <span v-if="sentType == 'table'">
              <button class="btn btn-danger" @click="removeTable">Yes</button>
            </span>
            <span v-if="sentType == 'menuItems'">
              <button class="btn btn-danger" @click="removeMenuItem">
                Yes
              </button>
            </span>
            <span v-if="sentType == 'category'">
              <button class="btn btn-danger" @click="removeCategory">
                Yes
              </button>
            </span>
          </div>
          <div v-else-if="!this.isDelete && sentData != undefined">
            <span v-if="sentData.tableNumber != undefined">
              <button class="btn btn-secondary" @click="changeTable">
                Change
              </button></span
            >
            <span v-if="sentData.childCategories != undefined">
              <button class="btn btn-secondary" @click="changeCategory">
                Change
              </button></span
            >
            <span v-if="sentData.name != undefined">
              <button class="btn btn-secondary" @click="changeMenuItem">
                Change
              </button></span
            >
          </div>
          <div v-else>
            <span v-if="this.sentType == 'category'">
              <button class="btn btn-secondary" @click="addNewCategory">
                Add
              </button>
            </span>
            <span v-if="this.sentType == 'table'">
              <button class="btn btn-secondary" @click="addNewTable">
                Add
              </button>
            </span>
            <span v-if="this.sentType == 'menuItems'">
              <button class="btn btn-secondary" @click="addNewMenuItem">
                Add
              </button>
            </span>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showModal: false,
      sentData: undefined,
      isDelete: false,
      sentType: "table",
      allCategories: [],
    };
  },
  created() {
    this.allCategories = this.getCategories.items;
    console.log(this.allCategories);
  },
  methods: {
    closeModal() {
      // console.log(this.showModal);
      if (this.showModal == true) {
        this.isDelete = false;
        this.showModal = false;
        this.sentData = undefined;
        this.sentType = "";
      }
    },
    showAndSend(item, isDelete = false, type = null) {
      if (isDelete) {
        this.isDelete = true;
      } else {
        this.isDelete = false;
      }
      if (type == null) {
        this.sentData = item;
        this.showModal = true;
        // if(sentData.categoryName == category.categoryName)
      } else {
        this.sentType = type;
        this.sentData = item;
        this.showModal = true;
      }
      console.log(this.sentData);
    },
    showAdd(type) {
      this.sentType = type;
      this.showModal = true;
    },

    checkSelected(cat, check) {
      console.log(cat);
      console.log(check);
      if (cat == check) {
        return true;
      }
    },
    ...mapActions("tables", {
      newTable: "NEW_TABLE",
      updateTable: "UPDATE_TABLE",
      deleteTable: "DELETE_TABLE",
      loadTables: "LOAD_TABLES",
    }),
    ...mapActions("categories", {
      newCategory: "NEW_CATEGORY",
      updateCategory: "UPDATE_CATEGORY",
      deleteCategory: "DELETE_CATEGORY",
      loadCategories: "LOAD_CATEGORIES",
    }),
    ...mapActions("menuItems", {
      newMenuItem: "NEW_MENUITEM",
      updateMenuItem: "UPDATE_MENUITEM",
      deleteMenuItem: "DELETE_MENUITEM",
      loadMenuItems: "LOAD_MENUITEMS",
    }),

    addNewTable() {
      //! VALIDACIJA

      let tableNumber = parseInt(document.getElementById("tableNumber").value);
      let tableCapacity = parseInt(
        document.getElementById("tableCapacity").value
      );
      let data = {
        tableNumber: tableNumber,
        capacity: tableCapacity,
      };
      console.log(data);
      this.newTable(data);
      setTimeout(() => {
        this.loadTables(this.$api);
        this.closeModal();
      }, 1500);
    },
    addNewCategory() {
      //! VALIDACIJA

      let categoryName = document.getElementById("categoryName").value;
      let data = {
        categoryName: categoryName,
      };

      this.newCategory(data);
      setTimeout(() => {
        this.loadCategories(this.$api);
        this.loadMenuItems(this.$api);
        this.closeModal();
      }, 1500);
    },
    addNewMenuItem() {
      //! VALIDACIJA
      let menuItemName = document.getElementById("menuItemName").value;
      let menuItemDescription = document.getElementById(
        "menuItemDescription"
      ).value;
      let selectCategory = document.getElementById("selectCategory").value;
      console.log(selectCategory);
      let menuItemPrice = document.getElementById("menuItemPrice").value;

      let data = {
        menuItemName: menuItemName,
        menuItemDescription: menuItemDescription,
        categoryId: selectCategory,
        menuItemPrice: menuItemPrice,
      };

      this.newMenuItem(data);
      setTimeout(() => {
        this.loadMenuItems(this.$api);
        this.loadCategories(this.$api);
        this.closeModal();
      }, 1500);
    },
    changeTable() {
      let tableNumber = parseInt(document.getElementById("tableNumber").value);
      let tableCapacity = parseInt(
        document.getElementById("tableCapacity").value
      );
      let tableId = parseInt(document.getElementById("dataId").value);
      let data = {
        tableNumber: tableNumber,
        capacity: tableCapacity,
        tableId: tableId,
      };
      console.log(data);
      this.updateTable(data);
      setTimeout(() => {
        this.loadTables(this.$api);
        this.closeModal();
      }, 1500);
    },
    changeCategory() {
      let categoryName = document.getElementById("categoryName").value;
      let categoryId = parseInt(document.getElementById("dataId").value);

      let data = {
        categoryId: categoryId,
        categoryName: categoryName,
      };
      // console.log(data);
      console.log(data);
      this.updateCategory(data);
      setTimeout(() => {
        this.loadCategories(this.$api);
        this.closeModal();
      }, 1500);
    },
    changeMenuItem() {
      let menuItemName = document.getElementById("menuItemName").value;
      let menuItemDescription = document.getElementById(
        "menuItemDescription"
      ).value;
      let menuItemPrice = parseFloat(
        document.getElementById("menuItemPrice").value
      );
      let selectCategory = parseInt(
        document.getElementById("selectCategory").value
      );
      let menuItemId = parseInt(document.getElementById("dataId").value);

      let data = {
        menuItemName: menuItemName,
        menuItemDescription: menuItemDescription,
        menuItemPrice: menuItemPrice,
        selectCategory: selectCategory,
        menuItemId: menuItemId,
      };
      // console.log(data);
      console.log(data);
      this.updateMenuItem(data);
      setTimeout(() => {
        this.loadMenuItems(this.$api);
        this.closeModal();
      }, 1500);
    },
    removeTable() {
      let dataId = parseInt(document.getElementById("dataId").value);
      this.deleteTable(dataId);
      setTimeout(() => {
        this.loadTables(this.$api);
        this.closeModal();
      }, 1500);
    },
    removeCategory() {
      let dataId = parseInt(document.getElementById("dataId").value);
      this.deleteCategory(dataId);
      setTimeout(() => {
        this.loadCategories(this.$api);
        this.loadMenuItems(this.$api);
        this.closeModal();
      }, 1500);
    },
    removeMenuItem() {
      let dataId = parseInt(document.getElementById("dataId").value);
      this.deleteMenuItem(dataId);
      setTimeout(() => {
        this.loadMenuItems(this.$api);
        this.loadCategories(this.$api);
        this.closeModal();
      }, 1500);
    },
  },
  computed: {
    getTableNumber() {
      return this.$route.params.id;
    },
    ...mapGetters("tables", {
      getTables: "GET_TABLES",
    }),
    ...mapGetters("menuItems", {
      getMenuItems: "GET_MENUITEMS",
    }),
    ...mapGetters("categories", {
      getCategories: "GET_CATEGORIES",
    }),
    ...mapGetters("login", {
      getUserRole: "getUserRole",
      getToken: "getToken",
      getUserName: "getUserName",
    }),
    ...mapGetters(["isLoggedIn"]),
    tables() {
      return this.getTables;
    },
    roleCheck() {
      // console.log(this.getUserRole);
      return this.getUserRole;
    },
    userName() {
      // console.log(this.getUserRole);
      return this.getUserName;
    },
    returnToken() {
      return this.getToken;
    },
    menuItems() {
      return this.getMenuItems;
    },
    categories() {
      return this.getCategories;
    },
  },
};
</script>
<style lang="stylus" scoped></style>
