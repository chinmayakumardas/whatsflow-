'use client'
import DashboardLayout from '@/components/layout/DashboardLayout'
// components/Tabs.js
import { Tabs } from '@mantine/core';  // Import Tabs only
import { Tab } from '@mantine/core';  // Remove this import
import BuyerTab from '@/components/testing/BuyerTab';
import SellerTab from '@/components/testing/SellerTab';
import React from 'react';

const page = () => {
  return (
    <DashboardLayout>
      <Tabs defaultValue="buyer">
        <Tabs.List>
          <Tabs.Tab value="buyer">Buyer</Tabs.Tab> {/* Use Tabs.Tab */}
          <Tabs.Tab value="seller">Seller</Tabs.Tab> {/* Use Tabs.Tab */}
        </Tabs.List>

        <Tabs.Panel value="buyer">
          <BuyerTab />
        </Tabs.Panel>

        <Tabs.Panel value="seller">
          <SellerTab />
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  )
}

export default page;
