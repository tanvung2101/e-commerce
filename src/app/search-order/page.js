"use client"
import orderApis from "@/apis/orderApis";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams  } from "next/navigation";
import {
  MASTER_DATA_NAME,
  STATUS_ORDER,
} from "@/constants";
import { useLocation } from "@/hook/useLocation";
import axios from "axios";
import moment from "moment/moment";
import Swal from "sweetalert2";
import OrderContent from "@/components/OrderContent";
import OrderDetailsRow from "@/components/OrderDetailsRow";

async function fetchMasterCapacity(params) {
  const res = await axios.get(`http://localhost:3001/api/master`, {
    params: {
      idMaster: params,
    },
  });
  return res.data.rows;
}

const PageSearchOrder = () => {
  const searchParamsEmail = useSearchParams();
  const searchParamsOrderCode   = useSearchParams ();
  const email = searchParamsEmail.get('email')
  const orderCode = searchParamsOrderCode.get('orderCode')
  console.log(email, orderCode)
  const [orderSearchItem, setOrderSerachItem] = useState();
  // console.log("orderSearchItem", orderSearchItem);
  const [masterCapacity, setMasterCapacity] = useState();
  const [masterUnit, setMasterUnit] = useState();
  const [masterOrderStatus, setMasterOrderStatus] = useState();
  const [product, setProduct] = useState();

  const address = useLocation(
    orderSearchItem?.cityCode,
    orderSearchItem?.districtCode,
    orderSearchItem?.wardCode
  );

  const fetchMasterData = async () => {
    const masterOrder = await fetchMasterCapacity(
      MASTER_DATA_NAME.STATUS_ORDER
    );
    const DataMasterCapacity = await fetchMasterCapacity(
      MASTER_DATA_NAME.CAPACITY_PRODUCT
    );
    const DataMasterUnit = await fetchMasterCapacity(
      MASTER_DATA_NAME.UNIT_PRODUCT
    );
    setMasterCapacity(DataMasterCapacity);
    setMasterUnit(DataMasterUnit);
    setMasterOrderStatus(masterOrder);
  };
  const getCartItemsInfo = useCallback(async () => {
    let cartItemsInfo = [];
    const productOption = [];
    if (!email && !orderCode) return;
    const orderUser = await orderApis.getOrderByOrderCode({
      email: email,
      orderCode: orderCode,
    });
    if (orderUser?.data === null) {
      setOrderSerachItem();
      return;
    }
    setOrderSerachItem(orderUser);
    await Promise.all(
      orderUser.orderItem.map(async (item) => {
        const params = {
          productId: item.productId,
          id: item.subProductId,
        };
        const data = await axios.get(
          "http://localhost:3001/api/product/get-capacity-product",
          { params }
        );
        cartItemsInfo.push(data.data);
      })
    );
    // console.log('cartItemsInfo', cartItemsInfo)
    if (masterCapacity?.length > 0) {
      // console.log('cartItemsInfo', item)
      cartItemsInfo.map((e) => {
        // console.log("capacity", e);
        const capacity = masterCapacity?.find((cap) => cap.id === e.capacityId);
        const unit = masterUnit?.find((un) => un.id === e.unitId);
        productOption.push({
          capacityId: capacity?.id,
          unitId: unit?.id,
          price: e.price,
          value: capacity?.id + " " + unit?.id,
          name: capacity?.name + " " + unit?.name,
          id: e.id,
          productId: e.productId,
        });
        setProduct(productOption);
      });
    }
  }, [email, masterCapacity, masterUnit, orderCode]);


  const cancelOrder = async () => {
    const body = {
      status: STATUS_ORDER.REJECT,
      productDetail: orderSearchItem.orderItem,
    };
    Swal.fire({
      title: "Bạn thật sự",
      text: "muốn huỷ đơn hàng không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        orderApis
          .cancelOrder(orderSearchItem.id, body)
          .then(() => { })
          .catch((err) => toast.error(err.mesage))
          .finally(() => {
            getCartItemsInfo()
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    // return orderApis.cancelOrder(order.id, body)
    // .then(() => toast.success('Bạn đã huỷ đơn hành thành công'))
    // .catch(err => toast.error(err.mesage))
    // .finally(() => {
    //   getCartItemsInfo()
    // });
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  useEffect(() => {
    getCartItemsInfo();
  }, [getCartItemsInfo]);
//   if (!Object.values(query).length === 0) return null;

  return (
    <>
      <div className="min-h-[350px]">
        <div className="flex flex-col items-center justify-center gap-5 mt-10 mb-10">
          <h1 className="font-sans text-4xl font-medium">Tìm kiếm</h1>
          {!!orderSearchItem && (
            <p className="text-center">
              Kết quả tìm kiếm cho{" "}
              <strong className="font-bold">
                email={email || ""} và orderCode={orderCode || ""}
              </strong>
            </p>
          )}
          {!orderSearchItem && (
            <p className="text-center">
              Không tìm thấy đơn hàng nào nào với{" "}
              <strong className="font-bold">
                email={email || ""} và orderCode={orderCode || ""}
              </strong>
            </p>
          )}
        </div>
        {!!orderSearchItem ? (
          <div className="flex flex-col py-8 px-44 w-full max-lg:px-28 max-md:px-14 max-sm:px-10">
            <div className="flex items-center justify-between max-sm:items-start">
              <div className="flex flex-col items-start justify-center gap-4 mb-14">
                <span>
                  Hóa đơn: {orderSearchItem && `#${orderSearchItem.orderCode}`}
                </span>
                <span>
                  Đặt ngày{" "}
                  {orderSearchItem &&
                    moment(orderSearchItem?.orderDate).format(
                      "DD-MM-YYY h:mm:ss"
                    )}
                </span>
                <span>
                  Trạng thái đơn hàng:{" "}
                  {orderSearchItem &&
                    masterOrderStatus?.find(
                      (e) => e.id === orderSearchItem.orderStatus
                    )?.name}
                </span>
              </div>
              <button
                disabled={
                  orderSearchItem?.orderStatus !== STATUS_ORDER.WAITTING_CONFIRM
                }
                onClick={() => cancelOrder()}
                className={`relative px-3 py-2 font-serif text-base font-light text-white border rounded-md bg-regal-red 
                ${orderSearchItem?.orderStatus !== STATUS_ORDER.WAITTING_CONFIRM
                    ? "cursor-not-allowed after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-slate-200 after:bg-opacity-30"
                    : ""
                  }`}
              >
                <span>Hủy đơn hàng</span>
              </button>
            </div>
            <OrderContent
              orderSearchItem={orderSearchItem}
              address={address}
            ></OrderContent>
            <OrderDetailsRow order={orderSearchItem} product={product}></OrderDetailsRow>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PageSearchOrder;
