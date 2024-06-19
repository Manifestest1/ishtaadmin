 // ** React Imports
import { useState,useEffect, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'
import {getFiltersCategory,addFiltersData} from 'src/context/api/apiService';

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

const Filtersform = () => {
    
  const [allCategory, setAllCategory] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');  
        if (token) 
        {
            getFiltersCategory()
                .then(response => {
                    console.log(response.data,"Check Api");
                    setAllCategory(response.data);
                
                })
                .catch((error) => {
                    if (error.response.status === 401) 
                    {
                      // Handle unauthorized access
                    }
                });
        } 
       
    }, []);

  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

//   const onChange = (file: ChangeEvent) => {
//     const reader = new FileReader()
//     const { files } = file.target as HTMLInputElement
//     if(files && files.length !== 0) 
//     {
//       reader.onload = () => setImgSrc(reader.result as string)

//       reader.readAsDataURL(files[0])
//       setUploadedImage(files[0]);
//     }
//   }

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     // await addFiltersCategory(categoryName, categoryOrder);
// };

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(file);
      setUploadedImage(file);
    }
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('category_id', selectedCategory);
    formData.append('sub_category', subCategory);
    if(uploadedImage) 
    {
      formData.append('image', uploadedImage);
    }

    console.log(selectedCategory,subCategory,uploadedImage,"Check Dataa");
  
    // Assuming you have an API service function to handle the upload
    try 
    {
        addFiltersData(formData)
        .then(response => {
            console.log(response,"Filter Data Added");
            setSuccessMessage('Data inserted successfully!');
        })
        .catch((error) => {
            if (error.response.status === 401) 
            {
            // Handle unauthorized access
            }
        });
      // Handle success (e.g., show a success message, reset form, etc.)
      
    } 
    catch (error) 
    {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>

                <Select label="Status" value={selectedCategory} defaultValue="Select Category" onChange={(e) => setSelectedCategory(e.target.value as string)}>
                    <MenuItem value='Select Category'>Select Category</MenuItem>
                    {allCategory && allCategory.map(category => (
                        <MenuItem key={category.id} value={category.id}>
                        {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField fullWidth label='Sub Category' value={subCategory} placeholder='Added Field' onChange={(e) => setSubCategory(e.target.value)} />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>

                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
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

export default Filtersform
