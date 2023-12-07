import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  user: any;
  members: [];
  isDataLoading: boolean;
  newProduct: any;
  myProducts: any;
  uploadQRCodeResult: string;
  reportId: string;
  getReportsData: any;
  getAllItemsBatchList: any;
  getAllBatchList: any;
  getNotUsedBatchList: any;
  createBounty: any[];
  isDataLoading2: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: {},
  members: [],
  isDataLoading: false,
  newProduct: { id: "" },
  myProducts: [],
  uploadQRCodeResult: "",
  reportId: "",
  getReportsData: null,
  getAllItemsBatchList: {},
  getAllBatchList: {},
  getNotUsedBatchList: {},
  createBounty: [],
  isDataLoading2: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.members = [];
      state.user = {};
      state.reportId = "";
      state.getReportsData = null;
      state.getAllItemsBatchList = {};
      state.getAllBatchList = {};
      state.getNotUsedBatchList = {};
      state.createBounty = [];
    },
    authenticate: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    restoreAuthState: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setAllMembers: (state, action: PayloadAction<any>) => {
      state.members = action.payload;
    },
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    setDataLoading2: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading2 = action.payload;
    },
    setNewProduct: (state, action: PayloadAction<any>) => {
      state.newProduct = action.payload;
      state.myProducts = [...state.myProducts, action.payload];
    },
    setMyProducts: (state, action: PayloadAction<any>) => {
      state.myProducts = action.payload;
    },
    setUploadQRCodeResult: (state, action: PayloadAction<any>) => {
      state.uploadQRCodeResult = action.payload;
    },
    setReportId: (state, action: PayloadAction<string>) => {
      state.reportId = action.payload;
    },
    setGetReportsData: (state, action: PayloadAction<any>) => {
      state.getReportsData = action.payload;
    },
    setGetAllItemsBatchList: (state, action: PayloadAction<any>) => {
      state.getAllItemsBatchList = action.payload;
    },
    setGetAllBatchList: (state, action: PayloadAction<any>) => {
      state.getAllBatchList = action.payload;
    },
    setGetNotUsedBatchList: (state, action: PayloadAction<any>) => {
      state.getNotUsedBatchList = action.payload;
    },
    setCreateBounty: (state, action: PayloadAction<any>) => {
      state.createBounty = action.payload;
    },
  },
});

export const userActions = {
  ...userSlice.actions,
  allMembers: createAction<{ url: string }>("user/allMembers"),
  createProduct: createAction<{
    name: string;
    material_type: string;
    material_size: string;
    example_image: any;
    token: string;
  }>("user/createProduct"),
  getMyProducts: createAction<{ token: string }>("user/getMyProducts"),
  uploadQRCode: createAction<{
    file: any;
    batch_name: string;
    product_id: string;
    token: string;
  }>("user/uploadQRCode"),
  generateQRCode: createAction<{
    batch_name: string;
    batch_size: string;
    product_id: string;
    token: string;
  }>("user/generateQRCode"),
  reportCreation: createAction<{
    mission_id: string;
    product_id: string;
    start_date: string;
    end_date: string;
    filetype: string;
    token: string;
  }>("user/reportCreation"),
  getReportsData: createAction<{
    mission_id: string;
    start_date: string;
    end_date: string;
    sort_by: string;
    token: string;
  }>("user/getReportsData"),
  getAllItemsBatchList: createAction<{
    token: string;
    product_id: string;
    page: number;
    page_size: number;
  }>("user/getAllItemsBatchList"),
  getAllBatchList: createAction<{
    token: string;
    product_id: string;
    page: number;
    page_size: number;
  }>("user/getAllBatchList"),
  getNotUsedBatchList: createAction<{
    token: string;
    product_id: string;
    page: number;
    page_size: number;
  }>("user/getNotUsedBatchList"),
  createBounty: createAction<{
    accessToken: string;
    formData: FormData;
  }>("user/createBounty"),
  getBatchList: createAction<{
    token: string;
    product_id: string;
    page: number;
    page_size: number;
  }>("user/getNotUsedBatchList"),
};

export default userSlice.reducer;
