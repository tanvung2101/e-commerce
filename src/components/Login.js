import React from 'react'
import Layout from './Layout'
import Input from './Input'
import IconPassword from './IconPassword'
import Link from 'next/link'
import Button from './Button'

const Login = () => {
  return (
    <form
              className="inline-block w-full bg-white max-md:block"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Layout label={''} errors={errors?.email?.message} icon={true}>
                <Input
                  {...register("email")}
                  placeholder={''}
                  type="text"
                  errors={errors?.email?.message}
                />
              </Layout>
              <Layout label={''} errors={errors?.password?.message}>
                <Input
                  {...register("password")}
                  placeholder={''}
                  type={hiddentPass ? "text" : "password"}
                  errors={errors?.password?.message}
                />
                <IconPassword onClick={handlePassword} hiddentPass={hiddentPass}></IconPassword>
              </Layout>
              <div className="mt-4 cursor-pointer mb-10">
                <Link href='/forgot-password' className="text-sm text-regal-red hover:text-yellow-400">
                  
                </Link>
              </div>
              <Button className='w-full' loading={loading} disabled={loading}>{'t("login")'}</Button>
              <div className="flex items-center justify-center mt-5">
                <span className="text-xs text-center">
                  
                  <Link href='/sign-up' className="ml-1 text-[14px] text-regal-red font-medium hover:text-yellow-400">
                    
                  </Link>
                </span>
              </div>
            </form>
  )
}

export default Login