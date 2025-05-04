"use server"
import {date, object, optional, z} from "zod";
import { redirect } from 'next/navigation';

export async function userlist() {
	const userlist = await fetch(process.env.url,{ cache: 'no-store' });
	return userlist.json();
}

export async function userget(id) {
	const userget = await fetch(process.env.url+"?id="+id,{ cache: 'no-store' });
	return userget.json();
}

export async function useradd(prevState: {
    message: string;
  },formData: FormData) {
        const schema = z.object({
                name: z.string({required_error:"Name is required"}).min(1),
                password: z.string().min(8),
                email: z.string().email(),
		dob:z.string({required_error:"DOB is required"}).min(1).date(),
        });
	//console.log(formData);
	//return;
        const userData:any = Object.fromEntries(formData);
	const dateParts = userData.dob.split("/");
	userData.dob = dateParts[2]+'-'+dateParts[0]+'-'+dateParts[1];
        const parse = schema.safeParse(userData);
	console.log(userData);
        if(!parse.success) {
                return parse.error.format();
        }
	console.log(parse.data);
	const response = await fetch(process.env.url, {
                        method:'POST',
                        headers: {
                                "Content-Type":"application/json",
                        },
                        body: JSON.stringify(parse.data)
                });
	console.log(response);
                //if(!response.ok) {
                //        throw new Error(`Response status: ${response.status}`);
                //}
	if(response.ok) {
		redirect("/");
	}
	//console.log(parse.data);
}

export async function useredit(prevState: {
    message: string;
  },formData: FormData) {
	  const schema = z.object({
                name: z.string({required_error:"Name is required"}).min(1),
                email: z.string().email(),
                dob:z.string({required_error:"DOB is required"}).min(1).date(),
        });
        const userData:any = Object.fromEntries(formData);
        const dateParts = userData.dob.split("/");
        userData.dob = dateParts[2]+'-'+dateParts[0]+'-'+dateParts[1];
        const parse = schema.safeParse(userData);
        console.log(userData);
        if(!parse.success) {
                return parse.error.format();
        }
        console.log(parse.data);
        const response = await fetch(process.env.url+'?id='+userData.user__id, {
                        method:'PUT',
                        headers: {
                                "Content-Type":"application/json",
                        },
                        body: JSON.stringify(parse.data)
                });
        console.log(response);
                //if(!response.ok) {
                //        throw new Error(`Response status: ${response.status}`);
                //}
        if(response.ok) {
                redirect("/");
        }
}
