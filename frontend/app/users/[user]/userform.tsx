"use client"
//import * as React from 'react';
import {useActionState,useReducer} from 'react';
import {Send} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useradd,useredit} from '@/app/actions/user';
import dayjs from "dayjs";
import { visuallyHidden } from '@mui/utils';

const initialState:any = {
	name: '',
	email:'',
	dob:null,
	password:''
}

const UserForm = (props) => {
	const usersave:any = props.user__id != 0 ? useredit:useradd;

	const [state, formAction,pending] = useActionState(usersave,initialState);

	const reducer = (state,action) => {
                return {
                        ...state,
                        [action.field]: action.payload
                };
        }
        const [form,dispatch] = useReducer(reducer, props.user_details);
        const handleChange = (e) => {
                dispatch({"field":e.target.name,"payload":e.target.value});
        }

	function handleDateChange(field,value) {
    dispatch({
      field: field,
      payload: value
    });
  }

	return (
		<Box
		component="form"
                      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },
			      display:'flex',
			      flexDirection:'column',
		      }}
                      noValidate
                      autoComplete="off"
                      action = {formAction}
          >
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
	        error={state?.name?._errors?.length > 0}
                                helperText={state?.name?._errors?.length > 0 ? state.name._errors[0]: ""}
				value={form.name}
                            onChange={handleChange}
                id="name"
                type="name"
                name="name"
                placeholder="Jon"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
	      error={state?.email?._errors?.length > 0}
                                helperText={state?.email?._errors?.length > 0 ? state.email._errors[0]: ""}
				value={form.email}
                            onChange={handleChange}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dob">Date of Birth</FormLabel>
	    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
	name="dob"
	value={dayjs(form.dob)}
        onChange={(value)=> {handleDateChange('dob', value)}}
	/>
    </LocalizationProvider>
    </FormControl>
    {props.user__id == 0 ?
	    <>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
	        error={state?.password?._errors?.length > 0}
                                helperText={state?.password?._errors?.length > 0 ? state.password._errors[0]: ""}
				value={form.password}
                            onChange={handleChange}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
	    </>
	    :
    <Box sx={visuallyHidden}>
        <input
          name='user__id'
          type={"hidden"}
          value={props.user__id}
        />
        </Box>
    }
	    <Box sx={{display:"flex",justifyContent:"center"}}>
                <Button
                type="submit"
                loading={pending}
                loadingPosition="end"
                endIcon={<Send/>}>
                Submit
                </Button>
                </Box>
          </Box>
	);
}

export {UserForm}
