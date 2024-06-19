 // ** React Imports
 import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

 // ** MUI Imports
 import Grid from '@mui/material/Grid'
 import { styled } from '@mui/material/styles'
 import MenuItem from '@mui/material/MenuItem'
 import TextField from '@mui/material/TextField'
 import CardContent from '@mui/material/CardContent'
 import Typography from '@mui/material/Typography'
 import Button, { ButtonProps } from '@mui/material/Button'
 import {addFiltersCategory} from 'src/context/api/apiService';
 import { useRouter } from 'next/router';
 
 // ** Icons Imports
 import Close from 'mdi-material-ui/Close'
 
 const ImgStyled = styled('img')(({ theme }) => ({
   width: 120,
   height: 120,
   marginRight: theme.spacing(6.25),
   borderRadius: theme.shape.borderRadius
 }))
 
 const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
   [theme.breakpoints.down('sm')]: {
     width: '100%',
     textAlign: 'center'
   }
 }))
 
 const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
   marginLeft: theme.spacing(4.5),
   [theme.breakpoints.down('sm')]: {
     width: '100%',
     marginLeft: 0,
     textAlign: 'center',
     marginTop: theme.spacing(4)
   }
 }))
 
 const Filterscategoryform = () => {

    const router = useRouter();
   // ** State
   const [categoryName, setCategoryName] = useState('');
   const [categoryOrder, setCategoryOrder] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

   const handleSubmit = async (e:any) => {
    e.preventDefault();
    // await addFiltersCategory(categoryName, categoryOrder);

    addFiltersCategory(categoryName, categoryOrder)
      .then(response => {
        console.log(response,"Category Added Succefully");
        setSuccessMessage('Data inserted successfully!');
      })
      .catch(error => {
        console.error('Error updating user status:', error);
      });
};

 
   return (
     <CardContent>
       <form onSubmit={handleSubmit}>
         <Grid container spacing={7}>

           <Grid item xs={12} sm={6}>
             <TextField autoFocus fullWidth id='email' label='Category' required sx={{ marginBottom: 4 }} onChange={(e) => setCategoryName(e.target.value)}/>
           </Grid>
          
           <Grid item xs={12} sm={6}>
             <TextField
               fullWidth
               type='integer'
               label='Order No'
               placeholder='Enter Order No'
               onChange={(e) => setCategoryOrder(e.target.value)}
             />
           </Grid>
 
           <Grid item xs={12}>
             <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
               Save Changes
             </Button>
           </Grid>
         </Grid>
       </form>

       {/* Display success message if set */}
       {successMessage && <Typography sx={{ color: 'green', marginRight: 3.5, mt: 4 }}>{successMessage}</Typography>}
     </CardContent>
   )
 }
 
 export default Filterscategoryform
 