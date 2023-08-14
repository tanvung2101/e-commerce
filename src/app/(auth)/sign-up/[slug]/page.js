"use client"
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthApis from "@/apis/authApis";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Input } from "@/components";


const schema = yup
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
    .required();

const PageRegister = () => {
    const {slug} = useParams();
    const router = useRouter()
    const { token } = useSelector((state) => state.account);

    const [hiddentPass, setHiddentPass] = useState(true);
    const [hiddentConfirmPass, setHiddentConfirmPass] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const onSubmit = (data) => {
        console.log(isValid)
        const { fullName, email, password, referralCode, username } = data;
        console.log(data)
        AuthApis.signUpUser({ email, password, fullName, referralCode })
            .then(() => {
                toast.success(t("sign_up_success"))
                router.push('/login')
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                console.log(err)
            })
        // .finally(() => console.log("thành công"));
    };

    useEffect(() => {
        setValue('referralCode', slug)
    }, [setValue, slug])

    // useEffect(() => {
        if (token) return router.push('/', undefined, { shallow: true })
    // }, [router, token])

    return (
        <>
            {!token && <>
                <div className="flex items-center my-20">
                    <div className="mx-auto min-w-[30%] max-md:min-w-[80%]">
                        <h3 className="text-2xl">{'Đăng nhập'}</h3>
                        <div>
                            <form
                                className="inline-block w-full bg-white"
                                onSubmit={handleSubmit(onSubmit)}

                            >
                                <div className="flex-col mt-4">
                                    <label
                                        className="inline-block mb-3 text-sm font-normal text-black"
                                        htmlFor=""
                                    >
                                        {'Họ và tên'}
                                    </label>
                                    <div className="relative">
                                        <Input
                                            {...register("fullName")}
                                            placeholder={'Họ và tên'}
                                            type="text"
                                            errors={errors?.fullName?.message}
                                            autoComplete="off"
                                        />
                                        {errors?.fullName?.message && (
                                            <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2">
                                                <BiErrorCircle className="text-lg text-red-500" />
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-sans text-sm font-normal text-red-500">
                                        {errors?.fullName?.message}
                                    </span>
                                </div>
                                <div className="flex-col mt-4">
                                    <label
                                        className="inline-block mb-3 text-sm font-normal text-black"
                                        htmlFor=""
                                    >
                                        {'Email'}
                                    </label>
                                    <div className="relative">
                                        <Input
                                            {...register("email")}
                                            placeholder={'Nhập email của bạn'}
                                            type="text"
                                            errors={errors?.email?.message}
                                            autoComplete="off"
                                        />
                                        {errors?.email?.message && (
                                            <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2">
                                                <BiErrorCircle className="text-lg text-red-500" />
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-sans text-sm font-normal text-red-500">
                                        {errors?.email?.message}
                                    </span>
                                </div>
                                <div className="flex-col mt-4">
                                    <label
                                        className="inline-block mb-3 text-sm font-normal text-black"
                                        htmlFor=""
                                    >
                                        {'Mật khẩu'}
                                    </label>
                                    <div className="relative">
                                        <Input
                                            {...register("password")}
                                            placeholder={'Mật khẩu'}
                                            type={hiddentPass ? "password" : "text"}
                                            errors={errors?.password?.message}
                                            autoComplete="off"
                                        />
                                        <span
                                            className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2"
                                            onClick={() => setHiddentPass(!hiddentPass)}
                                        >
                                            {hiddentPass ? (
                                                <AiOutlineEyeInvisible className="opacity-60"></AiOutlineEyeInvisible>
                                            ) : (
                                                <AiOutlineEye className="opacity-60"></AiOutlineEye>
                                            )}
                                        </span>
                                    </div>
                                    <span className="font-sans text-sm font-normal text-red-500">
                                        {errors?.password?.message}
                                    </span>
                                </div>
                                <div className="flex-col mt-4">
                                    <label
                                        className="inline-block mb-3 text-sm font-normal text-black"
                                        htmlFor=""
                                    >
                                        {'Xác nhật mật khẩu'}
                                    </label>
                                    <div className="relative">
                                        <Input
                                            {...register("confirmPass")}
                                            placeholder={'Xác nhật mật khẩu'}
                                            type={hiddentConfirmPass ? "password" : "text"}
                                            // className={`inline-block w-full py-2 pl-4 pr-10 bg-[#fff] rounded-md outline-none border text-sm ${errors?.confirmPass?.message
                                            //     ? "focus:ring-2 focus:ring-red-300 border border-red-500 "
                                            //     : "border border-slate-300 hover:border hover:border-slate-500"
                                            //     }`}
                                            errors={errors?.confirmPass?.message}
                                            autoComplete="off"
                                        />
                                        <span
                                            className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2"
                                            onClick={() => setHiddentConfirmPass(!hiddentConfirmPass)}
                                        >
                                            {hiddentConfirmPass ? (
                                                <AiOutlineEyeInvisible className="opacity-60"></AiOutlineEyeInvisible>
                                            ) : (
                                                <AiOutlineEye className="opacity-60"></AiOutlineEye>
                                            )}
                                        </span>
                                    </div>
                                    <span className="font-sans text-sm font-normal text-red-500">
                                        {errors?.confirmPass?.message}
                                    </span>
                                </div>
                                <div className="flex-col mt-4">
                                    <label
                                        className="inline-block mb-3 text-sm font-normal text-black"
                                        htmlFor="referralCode"
                                    >
                                        {'ID giới thiệu'}
                                    </label>
                                    <div>
                                        <Input
                                            {...register("referralCode")}
                                            placeholder={'ID giới thiệu'}
                                            type="referralCode"
                                            errors={errors?.referralCode?.message}
                                            disabled={slug}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <span className="font-sans text-sm font-normal text-red-500">
                                        {errors?.referralCode?.message}
                                    </span>
                                </div>
                                <button className="inline-block w-full py-2 mt-10 text-lg text-white rounded-md cursor-pointer bg-regal-red">
                                    {'Đăng kí'}
                                </button>
                                <div className="flex items-center justify-center mt-5">
                                    <span className="text-xs text-center">
                                        {'Bạn đã có tài khoản SHESHI?'}
                                        <Link href='/login' className="ml-1 text-[14px] text-regal-red hover:text-yellow-400 cursor-pointer">
                                            {'Đăng nhập'}
                                        </Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>}
        </>
    );
};





export default PageRegister;
