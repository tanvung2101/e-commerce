"use client"
import React, { useMemo, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthApis from "@/apis/authApis";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import useToggleValue from "@/hook/useToggleValue";
import Layout from "@/components/Layout";
import { Input } from "@/components";
import IconPassword from "@/components/IconPassword";



const PageRegister = () => {
  const router = useRouter();
  // const { t } = useTranslation('common');

  const { value: hiddentPass, handleToggleValue: handlePassword } = useToggleValue()
  const { value: hiddentConfirmPass, handleToggleValue: handleConfirmPass } = useToggleValue()

  const schema = useMemo(() => yup
    .object()
    .shape({
      referralCode: yup
        .string()
        .notRequired()
        .nullable()
        .matches(/(^\s*$|(^SS)[0-9]{6}$)/, "ID giới thiệu không đúng định dạng"),
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Trường bắt buộc")
        .max(255)
        .matches(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          "Vui long nhap email hop le"
        )
        .trim(),
      fullName: yup
        .string()
        .required("Trường bắt buộc")
        .min(3, "Tối thiểu 3 kí tự")
        .max(50, "Tối đa 50 kí tự")
        .trim(),
      password: yup.string().required("Trường bắt buộc").min(6, 'Tối thiểu 6 kí tự').max(30, 'Tối đa 30 kí tự').trim(),
      confirmPass: yup
        .string()
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: () =>
            yup
              .string()
              .oneOf([yup.ref("password")], "Mật khẩu không giống nhau"),
        })
        .required("Trường bắt buộc")
        .trim(),
    })
    .required(), [])
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(isValid)
    const { fullName, email, password, referralCode, } = data;
    console.log(data)
    AuthApis.signUpUser({ email, password, fullName, referralCode })
      .then(() => {
        toast.success('Đăng ký tài khoản thành công')
        router.push('/login')
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        console.log(err)
      })
    .finally(() => console.log("thành công"));
  };

  return (
    <>
      <Suspense>
        <div className="flex items-center my-20">
          <div className="mx-auto min-w-[30%] max-md:min-w-[80%]">
            <h3 className="text-2xl">Đăng ký</h3>
            <div>
              <form
                className="inline-block w-full bg-white"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Layout label='Họ và tên' errors={errors?.fullName?.message} icon={true}>
                  <Input
                    {...register("fullName")}
                    placeholder={'Họ và tên'}
                    type="text"
                    errors={errors?.fullName?.message}
                  />
                </Layout>
                <Layout label={'Email'} errors={errors?.email?.message} icon={true}>
                  <Input
                    {...register("email")}
                    placeholder={'Nhập email của bạn'}
                    type="text"
                    errors={errors?.email?.message}
                  />
                </Layout>
                <Layout label={'Mật khẩu'} errors={errors?.password?.message}>
                  <Input
                    {...register("password")}
                    placeholder={'Mật khẩu'}
                    type={hiddentPass ? "text" : "password"}
                    errors={errors?.password?.message}
                  />
                  <IconPassword onClick={handlePassword} hiddentPass={hiddentPass}></IconPassword>
                </Layout>
                <Layout label={'Xác nhận mật khẩu'} errors={errors?.confirmPass?.message}>
                  <Input
                    {...register("confirmPass")}
                    placeholder={'Xác nhận mật khẩu'}
                    type={hiddentConfirmPass ? "text" : "password"}
                    errors={errors?.confirmPass?.message}
                  />
                  <IconPassword onClick={handleConfirmPass} hiddentPass={hiddentConfirmPass}></IconPassword>
                </Layout>
                <Layout label={'ID giới thiệu'} errors={errors?.referralCode?.message} icon={true}>
                  <Input
                    {...register("referralCode")}
                    placeholder={'ID giới thiệu'}
                    type="referralCode"
                    errors={errors?.referralCode?.message}
                  />
                </Layout>
                <button className="inline-block w-full py-2 mt-10 text-lg text-white rounded-md cursor-pointer bg-regal-red">
                  Đăng ký
                </button>
                <div className="flex items-center justify-center mt-5">
                  <span className="text-xs text-center">
                  Bạn đã có tài khoản SHESHI?
                    <Link href='/login' className="ml-1 text-[14px] text-regal-red hover:text-yellow-400 cursor-pointer">
                      Đăng nhập
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};


export async function getStaticProps({ locale }) {
  console.log(locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en'])),
      // Will be passed to the page component as props
    },
  }
}

export default PageRegister;
