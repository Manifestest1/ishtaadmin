// ** MUI Imports
import { createContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer' 
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import {userStatusUpdate,getAllUsers,userDelete} from 'src/context/api/apiService';

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

interface RowType {
  age: number
  name: string
  date: string
  email: string
  salary: string
  status: string
  designation: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const rows: RowType[] = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist'
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative'
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it'
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]

const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const DashboardTable = () => {

  const [isActive, setIsActive] = useState(null);

  const [alluser, setAllUser] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('token');  
      if (token) 
      {
          getAllUsers()
              .then(response => {
                  console.log(response.data,"Check Api");
                  setAllUser(response.data);
              
              })
              .catch((error) => {
                  if (error.response.status === 401) 
                  {
                    // Handle unauthorized access
                  }
              });
      } 
     
  }, []);

  const handleClick = (userId, currentStatus) => {
    // Toggle the status (this is a simplified approach; you might have a more complex logic)
    const newStatus = !currentStatus;
    console.log(userId,newStatus,"id and status");

    // Assuming statusUpdate API updates the status for a user
    userStatusUpdate(userId, newStatus)
      .then(response => {
        console.log(response,"User UPdate");
        const updatedUsers = alluser.map(user =>
          user.id === userId ? { ...user, isActive: newStatus } : user
        );
        setAllUser(updatedUsers);
      })
      .catch(error => {
        console.error('Error updating user status:', error);
        // Handle error state or notify user about the error
      });
  };

  const handleClickUserDelete = (userId) => {
    console.log(userId,"In Delete Function");

    if (confirm('Are you sure you want to delete this user?')) 
    {
      userDelete(userId)
      .then(response => {
        console.log(response,"User UPdate");
        setAllUser(alluser.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error updating user status:', error);
        // Handle error state or notify user about the error
      });
     
    }

  }
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Serinal No.</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Register Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alluser && alluser.map((user, index) => (
              <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                   <TableCell>{index + 1}</TableCell>
                   <TableCell>{user.id}</TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{format(new Date(user.createdAt), 'yyyy-MM-dd')}</TableCell>
                <TableCell onClick={() => handleClick(user.id, user.isActive)}>
                <IconButton aria-label="status">
                 {user.isActive ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                 </IconButton>
                </TableCell>
                <TableCell onClick={() => handleClickUserDelete(user.id)}>
                  <IconButton aria-label="delete">
                      <DeleteIcon color="error"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
