import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import commissionSlice from './slice/commissionSlice'
import auctionSlice from './slice/auctionSlice'
import bidSlice from './slice/bidSlice'
import superAdminSlice from './slice/superAdminSlice'

export const store = configureStore({
    reducer:{
        user : userReducer,
        commission : commissionSlice,
        auction: auctionSlice,
        bid:bidSlice,
        superAdmin:superAdminSlice
    },
});

