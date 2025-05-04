import {User} from './user';
import {userlist } from './actions/user';
import {Button,Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
export default async function Page() {
  let users = await userlist();
  return (
	  <Box>
	  <Box sx={{m:1}}>
	  <Button variant="contained" endIcon={<AddIcon />} href="users/0">
	  Add User
      </Button>
      	</Box>
	  <User users={users}/>
	  </Box>
  );
}
