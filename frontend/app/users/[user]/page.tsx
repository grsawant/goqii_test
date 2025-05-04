import {UserForm} from './userform';
import {userget} from '@/app/actions/user';
import {Box,Paper,Typography} from '@mui/material';

const Page = async({
        params
        }: {
        params: Promise<{ user : number }>
        }) => {
        const  { user } = await params;
        var user_details = {id:0};
        if(user != 0) {
                user_details =await userget(user);
		console.log(user_details);
        //if('detail' in user_details) {
        //        redirect('/user');
        //}
        }
	return (
		<Box sx={{display:'flex',justifyContent:'center'}}>
          <Paper
          // elevation="24"
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="elevation"
      >
        <div>
          <Typography component="h1">
            <b>User Form</b>
          </Typography>
          <Typography>Edit user details.</Typography>
        </div>
		<UserForm user__id={user} user_details={user_details}/>
		</Paper>
		</Box>
	)
}

export default Page;
