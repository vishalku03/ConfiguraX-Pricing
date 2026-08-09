import { createSlice } from "@reduxjs/toolkit";

const initialComponents = [

  {
    id: "cpu-1",
    name: "Intel Core i7-14700H",
    category: "Processor",
    price: 30000,
    description: "14th Gen high-performance processor",
    isActive: true
  },

  {
    id: "ram-1",
    name: "16GB DDR5",
    category: "RAM",
    price: 5000,
    description: "16GB DDR5 memory",
    isActive: true
  },

  {
    id: "ssd-1",
    name: "512GB NVMe SSD",
    category: "Storage",
    price: 4000,
    description: "Fast NVMe storage",
    isActive: true
  },

  {
    id: "gpu-1",
    name: "NVIDIA RTX 4060",
    category: "Graphics Card",
    price: 35000,
    description: "8GB dedicated graphics",
    isActive: true
  },

  {
    id: "display-1",
    name: "15.6-inch FHD IPS",
    category: "Display",
    price: 8000,
    description: "Full HD IPS display",
    isActive: true
  },

  {
    id: "battery-1",
    name: "70Wh Battery",
    category: "Battery",
    price: 4000,
    description: "High-capacity battery",
    isActive: true
  },

  {
    id: "keyboard-1",
    name: "Backlit Keyboard",
    category: "Keyboard",
    price: 2000,
    description: "Full-size backlit keyboard",
    isActive: true
  },

  {
    id: "os-1",
    name: "Windows 11 Pro",
    category: "Operating System",
    price: 8000,
    description: "Windows 11 Pro license",
    isActive: true
  }

];

const initialState = {
  items: initialComponents,
  loading: false,
  error: null
};

const componentSlice = createSlice({
  name: "components",

  initialState,

  reducers: {

    addComponent(state, action) {
      state.items.unshift(action.payload);
    },

    updateComponent(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deactivateComponent(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.isActive = false;
      }
    }

  }
});

export const {
  addComponent,
  updateComponent,
  deactivateComponent
} = componentSlice.actions;

export default componentSlice.reducer;