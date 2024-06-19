import { createContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Table from 'src/views/dashboard/Table' 
import ProtectedRoute from '../../components/ProtectedRoute'; 
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