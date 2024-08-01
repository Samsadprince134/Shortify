import React from 'react'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import * as Yup from "Yup"
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'
import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UrlState } from '@/context'
export default function Login() {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const {loading, error, fn: fnLogin, data} = useFetch(login, formData);
      const {fetchUser} = UrlState();
      useEffect(() => {
        console.log("data is" , data)
        if (error === null && data) {
          fetchUser();
          navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
      }, [error, data]);


      const handleLogin = async () => {
        setErrors([]);
        try {
          const schema = Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          });
    
          await schema.validate(formData, {abortEarly: false});
          await fnLogin();
        } catch (e) {
          const newErrors = {};
    
          e?.inner?.forEach((err) => {
            newErrors[err.path] = err.message;
          });
    
          setErrors(newErrors);
        }
      };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you already have one</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  )
}
