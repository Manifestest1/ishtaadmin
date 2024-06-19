import { createContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Filtersform from 'src/views/filters/Filtersform';
import ProtectedRoute from '../../components/ProtectedRoute'; 
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'  

const AllUsers = () => {

   

    return (
        <ProtectedRoute>
        <ApexChartWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Filtersform/>
            </Grid>
          </Grid>
        </ApexChartWrapper>
        </ProtectedRoute> 
      )
}
export default AllUsers 