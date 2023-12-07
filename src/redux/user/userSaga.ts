import {
  call,
  put,
  delay,
  all,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { userActions } from "./userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { useFetch } from "../../hooks/useFetch";
import { API_URI } from "src/api/auth";
import { Router } from "next/router";
import apiUploadCall from "src/api/apiUploadCall";
import { toast } from "react-toastify";
// import type { AppState } from "../store";
// import { selects } from "../hooks";

export function* userAllMembersHandler(
  action: PayloadAction<{
    results: number;
    url: string;
  }>
): Generator<any, any, any> {
  console.warn("allMembers", action);

  try {
    const url = action.payload.url;
    const data = yield call(useFetch, url, "GET", "");
    yield put(userActions.setAllMembers(data.results));
  } catch (err) {
  } finally {
  }
}

export function* createProductHandler(
  action: PayloadAction<{
    name: string;
    material_type: string;
    material_size: string;
    example_image: any;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("createProduct", action);

  try {
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}/api/v1/product/create`;

    console.log(url);

    const data = new FormData();
    const filepath = action.payload.example_image.name;
    data.append("name", action.payload.name);
    data.append("material_type", action.payload.material_type);
    data.append("material_size", action.payload.material_size);
    data.append("example_image", action.payload.example_image, filepath);
    console.log(data);

    const results = yield call(
      apiUploadCall,
      url,
      data,
      "POST",
      action.payload.token
    );
    console.log(results.data);
    toast.success("Success creation !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    yield put(userActions.setNewProduct(results.data.result));
    // yield put(
    //   userActions.setProfilePicture(
    //     `${API_URI}/get_profile_image/${action.payload.address}`
    //   )
    // );
    yield put(userActions.setDataLoading(false));
    // yield call([Router, "push"], `/onboarding/tutorial`);
  } catch (err) {
    console.log("error===>", err);
    toast.error("Failed creation !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getMyProductsHandler(
  action: PayloadAction<{
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getMyProductsHandler", action);
  const url = `${API_URI}/api/v1/product/my-products`;
  try {
    yield put(userActions.setDataLoading(true));

    const data = yield call(useFetch, url, "GET", action.payload.token);
    yield put(userActions.setMyProducts(data.result));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* uploadQRCodeHandler(
  action: PayloadAction<{
    file: any;
    batch_name: string;
    product_id: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("uploadQRCode", action);

  try {
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}/api/v1/product/upload-qrcode`;

    console.log(url);

    const data = new FormData();
    const filepath = action.payload.file.name;
    data.append("batch_name", action.payload.batch_name);
    data.append("product_id", action.payload.product_id);
    data.append("file", action.payload.file, filepath);
    console.log(data);

    const results = yield call(
      apiUploadCall,
      url,
      data,
      "POST",
      action.payload.token
    );
    toast.success("Success Generation !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    if (err.status === "success") {
      toast.success("Success Generation !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Failed Generation !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* reportCreationHandler(
  action: PayloadAction<{
    mission_id: string;
    product_id: string;
    start_date: string;
    end_date: string;
    filetype: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("reportCreation", action);

  try {
    yield put(userActions.setDataLoading(true));

    const url = `${API_URI}/api/v1/product/report-creation`;

    const data = {
      mission_id: action.payload.mission_id,
      product_id: action.payload.product_id,
      start_date: action.payload.start_date,
      end_date: action.payload.end_date,
      filetype: action.payload.filetype,
    };

    const headers = {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${action.payload.token}`,
    };

    const response = yield fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = yield response.json();
      yield put(userActions.setReportId(data.result));
    }
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log("error===>", err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getReportsHandler(
  action: PayloadAction<{
    mission_id: string;
    start_date: string;
    end_date: string;
    sort_by: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getReportsHandler", action);

  try {
    yield put(userActions.setDataLoading(true));

    const url = `${API_URI}/api/v1/product/get-reports`;

    const data = {
      mission_id: action.payload.mission_id,
      start_date: action.payload.start_date,
      end_date: action.payload.end_date,
      sort_by: action.payload.sort_by,
    };

    const headers = {
      Authorization: `Bearer ${action.payload.token}`,
      "Content-Type": "application/json",
    };

    const response = yield call(fetch, url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = yield response.json();
      yield put(userActions.setGetReportsData(responseData.result));
    }

    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log("error===>", err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getAllItemsBatchListHandler(
  action: PayloadAction<{
    token: string;
    product_id: string;
    page: number;
    page_size: number;
  }>
): Generator<any, any, any> {
  const url = `${API_URI}/api/v1/product/get-all-items-batch-list`;

  try {
    yield put(userActions.setDataLoading(true));

    const data = yield call(fetch, url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${action.payload.token}`,
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        product_id: action.payload.product_id,
        page: action.payload.page,
        page_size: action.payload.page_size,
      }),
    });

    const result = yield call([data, "json"]);

    yield put(userActions.setGetAllItemsBatchList(result));

    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log("Error:", err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getAllBatchListHandler(
  action: PayloadAction<{
    token: string;
    product_id: string;
    page: number;
    page_size: number;
  }>
): Generator<any, any, any> {
  const url = `${API_URI}/api/v1/product/get-all-batch-list`;

  try {
    yield put(userActions.setDataLoading2(true));

    const data = yield call(fetch, url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${action.payload.token}`,
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        product_id: action.payload.product_id,
        page: action.payload.page,
        page_size: action.payload.page_size,
      }),
    });

    const result = yield call([data, "json"]);

    yield put(userActions.setGetAllBatchList(result));

    yield put(userActions.setDataLoading2(false));
  } catch (err) {
    console.log("Error:", err);
    yield put(userActions.setDataLoading2(false));
  } finally {
    yield put(userActions.setDataLoading2(false));
  }
}

export function* getNotUsedBatchListHandler(
  action: PayloadAction<{
    token: string;
    product_id: string;
    page: number;
    page_size: number;
  }>
): Generator<any, any, any> {
  const url = `${API_URI}/api/v1/product/get-not-used-batch-list`;

  try {
    yield put(userActions.setDataLoading(true));

    const data = yield call(fetch, url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${action.payload.token}`,
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        product_id: action.payload.product_id,
        page: action.payload.page,
        page_size: action.payload.page_size,
      }),
    });

    const result = yield call([data, "json"]);

    yield put(userActions.setGetNotUsedBatchList(result));

    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log("Error:", err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* createBountyHandler(
  action: PayloadAction<{
    accessToken: string;
    formData: FormData;
  }>
): Generator<any, any, any> {
  try {
    const { accessToken, formData } = action.payload;
    // yield put(userActions.setDataLoading(true));
    yield put(userActions.setCreateBounty(["loading"]));
    const url = `${API_URI}api/v1/bounty/create`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: formData,
    };

    const response = yield call(fetch, url, options);
    const data = yield response.json();

    if (response.ok) {
      yield put(userActions.setCreateBounty(data.id));
      // yield put(userActions.setDataLoading(false));
    } else {
      alert(data.messages);
      yield put(userActions.setCreateBounty([]));
      // yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setCreateBounty([]));
    // yield put(userActions.setDataLoading(false));
  }
}

export function* generateQRCodeHandler(
  action: PayloadAction<{
    batch_size: string;
    batch_name: string;
    product_id: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("generateQRCode", action);

  try {
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}/api/v1/product/generate-qrcode`;

    console.log(url);

    const data = new FormData();
    data.append("batch_name", action.payload.batch_name);
    data.append("product_id", action.payload.product_id);
    data.append("batch_size", action.payload.batch_size);
    console.log(data);

    const results = yield call(
      apiUploadCall,
      url,
      data,
      "POST",
      action.payload.token
    );
    console.log(results);
    toast.success("Success Generation !", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    // yield put(userActions.setUploadQRCodeResult("uploaded successfully"));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log("error===>", err);
    // yield put(userActions.setUploadQRCodeResult(err.status));
    if (err.status === "success") {
      toast.success("Success Generation !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Failed Generation !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export default function* userWalletSaga() {
  yield all([
    takeEvery(userActions.allMembers.type, userAllMembersHandler),
    takeLatest(userActions.createProduct.type, createProductHandler),
    takeLatest(userActions.getMyProducts.type, getMyProductsHandler),
    takeLatest(userActions.uploadQRCode.type, uploadQRCodeHandler),
    takeLatest(userActions.reportCreation.type, reportCreationHandler),
    takeLatest(userActions.getReportsData.type, getReportsHandler),
    takeLatest(
      userActions.getAllItemsBatchList.type,
      getAllItemsBatchListHandler
    ),
    takeLatest(userActions.getAllBatchList.type, getAllBatchListHandler),
    takeLatest(
      userActions.getNotUsedBatchList.type,
      getNotUsedBatchListHandler
    ),
    takeEvery(userActions.createBounty.type, createBountyHandler),
    takeLatest(userActions.generateQRCode.type, generateQRCodeHandler),
  ]);

  delay(1000);
}
