

// import { useState, useEffect } from 'react';
// import { Button, Box, Card, Text, Group, Stepper } from '@mantine/core';

// export default function SellerTab() {
//   const [orderStatus, setOrderStatus] = useState([]);

//   // Read orders from localStorage on initial render
//   useEffect(() => {
//     const storedOrders = JSON.parse(localStorage.getItem('orderList')) || [];
//     setOrderStatus(storedOrders);
//   }, []);

//   const updateStatus = (orderId, status) => {
//     // Create a new updated array without mutating the existing state
//     const updatedOrders = orderStatus.map(order => 
//       order.orderId === orderId ? { ...order, orderStatus: status } : order
//     );

//     // Update the state with the new updated orders array
//     setOrderStatus(updatedOrders);

//     // Update the orders in localStorage to persist the change
//     localStorage.setItem('orderList', JSON.stringify(updatedOrders));
//   };

//   return (
//     <Box>
//       <h3>Orders</h3>
//       {orderStatus.map((order) => (
//         <Card shadow="sm" padding="lg" key={order.id} mb="md">
//           <Text>Buyer: {order.mobile}</Text>
//           <Text>Product: {order.productName}</Text>
//           <Stepper
//             active={order.orderStatus} // Each stepper has its own active state
//             onStepClick={(step) => updateStatus(order.orderId, step)} // Update only the clicked order's status
//             color="teal"
//           >
//             <Stepper.Step label="Order Placed" description="Buyer has placed the order" />
//             <Stepper.Step label="Processing" description="Seller is processing the order" />
//             <Stepper.Step label="Shipped" description="Order has been shipped" />
//             <Stepper.Step label="Delivered" description="Order has been delivered" />
//           </Stepper>
//           <Group position="right" mt="md">
//             {/* Only enable button for orders that are not delivered */}
//             {order.orderStatus <= 3 && ( // Ensure the button is disabled if the order is delivered
//               <Button
//                 onClick={() => updateStatus(order.orderId, order.orderStatus + 1)} // Update only the clicked order's step
//               >
//                 Next Step
//               </Button>
//             )}
//           </Group>
//         </Card>
//       ))}
//     </Box>
//   );
// }



// import { useState, useEffect } from 'react';
// import { Button, Box, Card, Text, Group, Stepper } from '@mantine/core';
// import axios from 'axios';

// export default function SellerTab() {
//   const [orderStatus, setOrderStatus] = useState([]);

//   // Read orders from localStorage on initial render
//   useEffect(() => {
//     const storedOrders = JSON.parse(localStorage.getItem('orderList')) || [];
//     setOrderStatus(storedOrders);
//   }, []);

//   const updateStatus = async (orderId, status) => {
//     // Update the order status locally
//     const updatedOrders = orderStatus.map(order =>
//       order.orderId === orderId ? { ...order, orderStatus: status } : order
//     );
//     setOrderStatus(updatedOrders);

//     // Update the orders in localStorage to persist the change
//     localStorage.setItem('orderList', JSON.stringify(updatedOrders));

//     // Call the API to update the order status on the server
//     try {
//       const order = updatedOrders.find(order => order.orderId === orderId);
//       const updatedOrderPayload = {
//         orderId,
//         orderStatus: status,
//       };
      
//       await axios.post(
//         "http://192.168.0.101:3001/api/send-order-message", // New API endpoint for updating status
//         updatedOrderPayload
//       );

//       alert("Order status updated successfully!");
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   return (
//     <Box>
//       <h3>Orders</h3>
//       {orderStatus.map((order) => (
//         <Card shadow="sm" padding="lg" key={order.orderId} mb="md">
//           <Text>Buyer: {order.mobile}</Text>
//           <Text>Product: {order.productName}</Text>
//           <Stepper
//             active={order.orderStatus} // Each stepper has its own active state
//             onStepClick={(step) => updateStatus(order.orderId, step)} // Update only the clicked order's status
//             color="teal"
//           >
//             <Stepper.Step label="Order Placed" description="Buyer has placed the order" />
//             <Stepper.Step label="Processing" description="Seller is processing the order" />
//             <Stepper.Step label="Shipped" description="Order has been shipped" />
//             <Stepper.Step label="Delivered" description="Order has been delivered" />
//           </Stepper>
//           <Group position="right" mt="md">
//             {/* Only enable button for orders that are not delivered */}
//             {order.orderStatus < 3 && ( // Ensure the button is disabled if the order is delivered
//               <Button
//                 onClick={() => updateStatus(order.orderId, order.orderStatus + 1)} // Update only the clicked order's step
//               >
//                 Next Step
//               </Button>
//             )}
//           </Group>
//         </Card>
//       ))}
//     </Box>
//   );
// }





import { useState, useEffect } from 'react';
import { Button, Box, Card, Text, Group, Stepper } from '@mantine/core';
import axios from 'axios';

export default function SellerTab() {
  const [orderStatus, setOrderStatus] = useState([]);

  // Read orders from localStorage on initial render
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderList')) || [];
    setOrderStatus(storedOrders);
  }, []);

  // Map numeric stepper states to order status values
  const statusMap = ["order-placed", "order-packed", "order-in-transit", "out-for-delivery", "order-delivered"];

  const updateStatus = async (orderId, statusIndex) => {
    const updatedOrders = orderStatus.map(order =>
      order.orderId === orderId ? { ...order, orderStatus: statusMap[statusIndex] } : order
    );
    setOrderStatus(updatedOrders);
    localStorage.setItem('orderList', JSON.stringify(updatedOrders));

    try {
      const order = updatedOrders.find(order => order.orderId === orderId);
      if (order) {
        const updatedOrderPayload = {
          phoneNumber:   `+91${order.mobile}`,
          productName: order.productName,
          productSize: order.size,
          productPrice: order.productPrice,
          discount: order.discount,
          deliveryCharge: order.deliveryCharge,
          orderStatus: statusMap[statusIndex],
          estimatedDeliveryDate: order.estimatedDeliveryDate,
          paymentMode: order.paymentMode,
          address: order.address,
          quantity: order.quantity,
          category: order.category,
          deliveryDate: order.deliveryDate || null
        };

        await axios.post(
          "http://192.168.0.101:3001/api/send-order-message",
          updatedOrderPayload,
          console.log(updatedOrderPayload)
        );
        alert("Order status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <Box>
      <h3>Orders</h3>
      {orderStatus.map((order) => (
        <Card shadow="sm" padding="lg" key={order.orderId} mb="md">
          <Text>Buyer: {order.phoneNumber}</Text>
          <Text>Product: {order.productName}</Text>
          <Stepper
            active={statusMap.indexOf(order.orderStatus)} // Convert status to step index
            onStepClick={(step) => updateStatus(order.orderId, step)}
            color="teal"
          >
            <Stepper.Step label="Order Placed" description="Buyer has placed the order" />
            <Stepper.Step label="Packed" description="Order has been packed" />
            <Stepper.Step label="In Transit" description="Order is on the way" />
            <Stepper.Step label="Out for Delivery" description="Order is out for delivery" />
            <Stepper.Step label="Delivered" description="Order has been delivered" />
          </Stepper>
          <Group position="right" mt="md">
          {statusMap.indexOf(order.orderStatus) < statusMap.length - 1 && (
  <Button
    onClick={() => {
      const currentIndex = statusMap.indexOf(order.orderStatus);
      if (currentIndex >= 0 && currentIndex < statusMap.length - 1) {
        updateStatus(order.orderId, currentIndex + 1);
      }
    }}
  >
    Next Step
  </Button>
)}

          </Group>
        </Card>
      ))}
    </Box>
  );
}
