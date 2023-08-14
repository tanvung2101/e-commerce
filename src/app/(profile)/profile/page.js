"use client"
import { lazy, Suspense } from 'react';
import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, } from 'yup';
import AuthApis from "@/apis/authApis";
import { useRouter } from "next/navigation";
import { setProfileAuth } from "@/redux/accountSlice";
import { toast } from "react-toastify";
import useLocationForm from "@/components/location-vn";
import Loading from '@/components/Loading';
import NavbarUser from '@/components/NavbarUser';
import CartProfile from '@/components/CartProfile';
import Layout from '@/components/Layout';
import InputCopy from '@/components/InputCopy';
import { Button, Input, SelectCustom } from '@/components';
import PhoneInput from '@/components/PhoneInput';
import { getCookies } from 'cookies-next';


const PageProfile = () => {
  // const {token: token1} = getCookies()
  // console.log(token1)
  const { token, info } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false)


  const schema = object({
    fullName: string().required().min(3).max(50).trim(),
    phoneCode: string().max(5).trim().required().nullable(),
    phoneNumber: string().min(9).max(20).trim().required().nullable(),
    address: string().max(255).trim().required("Trường bắt buộc").nullable(),
    userCode: string(),
    cityCode: number().integer().required().nullable(),
    districtCode: number().integer().required().nullable(),
    wardCode: number().integer().required().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: info?.userInformation?.fullName,
      phoneCode: info?.phoneCode || "84",
      phoneNumber: info?.phoneNumber,
      address: info?.userInformation?.address,
      userCode: info?.userCode,
      cityCode: info?.userInformation?.cityCode,
      districtCode: info?.userInformation?.districtCode,
      wardCode: info?.userInformation?.wardCode,
    },
  });
  const { phoneCode, userCode } =
    useWatch({
      control,
    });
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(
      true,
      info?.userInformation
    );
  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;
  const onSubmit = (data) => {
    const {
      fullName,
      phoneCode,
      phoneNumber,
      address,
      userCode,
      cityCode,
      districtCode,
      wardCode,
    } = data;
    setLoadingUpdateProfile(true)
    console.log({
      id: info?.id,
      fullName,
      phoneNumber: `${+phoneNumber}`,
      phoneCode: `${+phoneCode}`,
      address,
      cityCode: `${+cityCode}`,
      districtCode: `${+districtCode}`,
      wardCode: `${+wardCode}`,
    });
    AuthApis.updateProfileUser({
      id: info?.id,
      fullName,
      phoneNumber: `${+phoneNumber}`,
      phoneCode: `${+phoneCode}`,
      address,
      cityCode: `${+cityCode}`,
      districtCode: `${+districtCode}`,
      wardCode: +wardCode,
    })
      .then(() => {
        return AuthApis.getProfile();
      })
      .then((res) => {
        toast.success('Ban da cap nhat thanh cong')
        dispatch(setProfileAuth(res));
        setLoadingUpdateProfile(false)
        reset({
          fullName,
          phoneNumber: `+${phoneNumber}`,
          phoneCode: +phoneCode,
          address,
          cityCode: +cityCode.id,
          districtCode: +districtCode.id,
          wardCode: +wardCode.is,
        });
      });
  };



  useEffect(() => {
    AuthApis.getProfile()
      .then((res) => dispatch(setProfileAuth(res)))
      .catch((err) => console.log(err))
      .finally(() => {
        console.log('thành công');
      });
  }, [token, dispatch]);
  // useEffect(() => {
    if (!token) return router.push('/login', '', { shallow: true })
  // }, [router, token])
  return (
    <>
      {token && <Suspense fallback={<Loading></Loading>}>
        <div className="flex items-start justify-center gap-5 px-24 mt-8 mb-20 max-lg:px-8 max-md:flex-col max-md:px-3 max-sm:mb-8">
          <NavbarUser bgPage='profile'></NavbarUser>
          <div className="w-[75%] flex-col items-start max-md:w-full max-md:mt-4">
            <CartProfile></CartProfile>
            <form className="px-1" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-start justify-between gap-8 max-md:flex-col">
                <div className="flex-col items-center justify-between gap-8 w-[50%] max-md:w-full">
                  <Layout label='ID giới thiệu'>
                    <InputCopy
                      value={userCode}
                      disabled
                      placeholder="ID giới thiệu"
                    ></InputCopy>
                  </Layout>
                  <Layout label='Họ và tên' errors={errors?.fullName?.message} icon={true}>
                    <Input
                      {...register("fullName")}
                      placeholder="Họ và tên"
                      type="text"
                      errors={errors?.fullName?.message}
                    />
                  </Layout>
                  <Layout label='Email'>
                    <Input
                      placeholder="Địa chỉ"
                      defaultValue={info?.email}
                      disabled
                      type="text"
                      className={`inline-block w-full py-3 pl-4 pr-10 bg-[#fff] rounded-md outline-none text-sm border border-slate-300 hover:border hover:border-slate-500 cursor-not-allowed`}
                    />
                  </Layout>
                  <Layout label='Số điện thoại' errors={errors?.phoneNumber?.message}>
                    <PhoneInput
                      phoneCode={phoneCode?.toString() || "84"}
                      onChangePhoneNumber={(newValue) => {
                        // console.log(newValue);
                        setValue("phoneNumber", +newValue, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      onChangePhoneCode={(newValue) => {
                        setValue("phoneCode", +newValue, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      namePhoneCode="phoneCode"
                      namePhoneNumber="phoneNumber"
                      register={register}
                    ></PhoneInput>
                  </Layout>
                </div>
                <div className="flex-col items-center justify-between gap-8 w-[50%] max-md:w-full">
                  <Layout label='Địa chỉ' errors={errors?.address?.message} icon={true}>
                    <Input
                      {...register("address")}
                      placeholder="Địa chỉ"
                      type="text"
                      errors={errors?.address?.message}
                    />
                  </Layout>
                  <Layout label='Tỉnh/Thành' errors={errors?.cityCode?.message}>
                    <SelectCustom
                      {...register("cityCode")}
                      key={`cityCode_${selectedCity?.value}`}
                      isDisabled={cityOptions.length === 0}
                      options={cityOptions}
                      onChange={(option) => {
                        option.value !== selectedCity?.value &&
                          onCitySelect(option);
                        option.value === 0 &&
                          setValue("cityCode", null, {
                            shouldDirty: true,
                          });
                        setValue("wardCode", null);
                        setValue("districtCode", null);
                        option.value !== 0 &&
                          setValue("cityCode", option.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                      }}
                      placeholder={'Tỉnh/Thành'}
                      defaultValue={selectedCity}
                      className="select-custom"
                      classNamePrefix="select-custom"
                    />
                  </Layout>
                  <Layout label='Quận/Huyện' errors={errors?.districtCode?.message}>
                    <SelectCustom
                      {...register("districtCode")}
                      key={`districtCode_${selectedDistrict?.value}`}
                      isDisabled={districtOptions.length === 0}
                      options={districtOptions}
                      onChange={(option) => {
                        option.value !== selectedDistrict?.value &&
                          onDistrictSelect(option);
                        setValue("wardCode", null);
                        setValue("districtCode", option.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      placeholder={'Quận/Huyện'}
                      defaultValue={selectedDistrict}
                      className="select-custom"
                      classNamePrefix="select-custom"
                    />
                  </Layout>
                  <Layout label='Phường/Xã' errors={errors?.wardCode?.message}>
                    <SelectCustom
                      {...register("wardCode")}
                      key={`wardCode_${selectedWard?.value}`}
                      isDisabled={wardOptions.length === 0}
                      options={wardOptions}
                      placeholder="Phường/Xã"
                      onChange={(option) => {
                        onWardSelect(option);
                        setValue("wardCode", option.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      defaultValue={selectedWard}
                      className="select-custom"
                      classNamePrefix="select-custom"
                    />
                  </Layout>
                  <div className="flex items-end justify-end mt-6">
                    <Button className='!w-[200px]' hiddent={true} type={'submit'} disabled={!isDirty} loading={loadingUpdateProfile || !isDirty}>Cập nhật thông tin</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Suspense>}
    </>
  );
};

export default PageProfile;
