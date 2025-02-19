"use client";
import React, { Suspense } from "react";
import { setCookie } from "cookies-next";
import Loading from "@/components/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LOGIN_TYPE } from "@/constants";
import AuthApis from "@/apis/authApis";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setProfileAuth, setToken } from "@/redux/accountSlice";
import useToggleValue from "@/hook/useToggleValue";
import Link from "next/link";
import Layout from "@/components/Layout";
import IconPassword from "@/components/IconPassword";
import { Button, Input } from "@/components";
import { useMutation, useQuery } from "@tanstack/react-query";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Trường bắt buộc")
      .max(255)
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không đúng định dạng"
      ),
    password: yup
      .string()
      .required("Trường bắt buộc")
      .min(6, "Tối thiểu 6 kí tự")
      .max(30, "Tối đa 30 kí tự")
      .trim(),
    type: yup.number().required(),
  })
  .required("Trường bắt buộc");

const PageLogin = () => {
  // const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();

  const { value, handleToggleValue } = useToggleValue();


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: LOGIN_TYPE.USER,
    },
  });
  const {
    mutateAsync: login,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: AuthApis.login,
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      console.log(data.token);
      if (data) router.push("/");
      setCookie("token", data.token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });
      dispatch(setToken(data.token));
      toast.success('Đăng nhập thành công')
    },
    onError: () => toast.error('Mật khẩu hoặc email sai')
  });
  // console.log(data);
  const { data: getProfile, } = useQuery({
    queryKey: ["get-profile"],
    queryFn: AuthApis.getProfile,
    enabled: !!data
  });
  if(getProfile) dispatch(setProfileAuth(getProfile));

  const onSubmit = async (values) => {
    await login(values);
  };
  // useEffect(() => {
  // if (token) return router.push('/', undefined, { shallow: true })
  // }, [router, token])
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex items-center my-20">
          <div className="mx-auto min-w-[25%] max-md:min-w-[80%]">
            <h3 className="text-[28px] font-bold">Đăng nhập</h3>
            <form
              className="inline-block w-full bg-white max-md:block"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Layout
                label={"Email"}
                errors={errors?.email?.message}
                icon={true}
              >
                <Input
                  {...register("email")}
                  placeholder={"Nhập email của bạn"}
                  type="text"
                  errors={errors?.email?.message}
                />
              </Layout>
              <Layout label={"Mật khẩu"} errors={errors?.password?.message}>
                <Input
                  {...register("password")}
                  placeholder={"Nhập mật khẩu của bạn"}
                  type={value ? "text" : "password"}
                  errors={errors?.password?.message}
                />
                <IconPassword
                  onClick={handleToggleValue}
                  hiddentPass={value}
                ></IconPassword>
              </Layout>
              <div className="mt-4 cursor-pointer mb-10">
                <Link
                  href="/forgot-password"
                  className="text-sm text-regal-red hover:text-yellow-400"
                >
                  Quên mật khẩu
                </Link>
              </div>
              <Button
                className="w-full"
                loading={isSuccess}
                disabled={isSuccess}
              >
                {"Đăng nhập"}
              </Button>
              <div className="flex items-center justify-center mt-5">
                <span className="text-xs text-center">
                  Bạn đã có tài khoản SHESHI?
                  <Link
                    href="/sign-up"
                    className="ml-1 text-[14px] text-regal-red font-medium hover:text-yellow-400"
                  >
                    Đăng ký
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default PageLogin;
