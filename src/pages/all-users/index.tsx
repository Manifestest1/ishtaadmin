import { createContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Table from 'src/views/dashboard/Table' 
import ProtectedRoute from '../../components/ProtectedRoute'; 
import { getAllUsers } from 'src/context/api/apiService';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts' 

const AllUsers = () => {

   

    return (
        <ProtectedRoute>
        <ApexChartWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Table/>
            </Grid>
          </Grid>
        </ApexChartWrapper>
        </ProtectedRoute> 
      )
}
export default AllUsers 