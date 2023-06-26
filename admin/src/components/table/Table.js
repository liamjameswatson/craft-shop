import "./table.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import React from "react";

const List = () => {
  const rows = [
    {
      id: 1146543,
      product: "brixham painting",
      customer: "John Sminth",
      date: "1 Apr 2023",
      amount: 784,
      paymentMethod: "card",
      deliveryStatus: "pending",
    },
    {
      id: 433645,
      product: "abstract sculpture",
      customer: "Emily Johnson",
      date: "15 May 2023",
      amount: 245,
      paymentMethod: "credit card",
      deliveryStatus: "shipped",
    },
    {
      id: 230065,
      product: "watercolor landscape",
      customer: "Michael Brown",
      date: "3 Jul 2023",
      amount: 612,
      paymentMethod: "debit card",
      deliveryStatus: "delivered",
    },
    {
      id: 777435,
      product: "oil portrait",
      customer: "Sarah Thompson",
      date: "26 Apr 2023",
      amount: 980,
      paymentMethod: "cash",
      deliveryStatus: "pending",
    },
    {
      id: 524712,
      product: "handmade ceramic vase",
      customer: "David Wilson",
      date: "9 Aug 2023",
      amount: 347,
      paymentMethod: "credit card",
      deliveryStatus: "pending",
    },
    {
      id: 991035,
      product: "abstract collage",
      customer: "Jennifer Lee",
      date: "14 May 2023",
      amount: 502,
      paymentMethod: "paypal",
      deliveryStatus: "shipped",
    },
    {
      id: 812349,
      product: "sculptural installation",
      customer: "Matthew Davis",
      date: "20 Jul 2023",
      amount: 892,
      paymentMethod: "credit card",
      deliveryStatus: "pending",
    },
    {
      id: 305498,
      product: "acrylic abstract painting",
      customer: "Emma Thompson",
      date: "5 Jun 2023",
      amount: 619,
      paymentMethod: "cash",
      deliveryStatus: "delivered",
    },
    {
      id: 680924,
      product: "wooden sculpture",
      customer: "Daniel Smith",
      date: "30 Aug 2023",
      amount: 178,
      paymentMethod: "debit card",
      deliveryStatus: "shipped",
    },
    {
      id: 129372,
      product: "pastel portrait",
      customer: "Olivia Wilson",
      date: "7 Sep 2023",
      amount: 433,
      paymentMethod: "paypal",
      deliveryStatus: "pending",
    },
    {
      id: 298106,
      product: "mixed media collage",
      customer: "Sophia Anderson",
      date: "18 Jun 2023",
      amount: 760,
      paymentMethod: "credit card",
      deliveryStatus: "delivered",
    },
    {
      id: 550938,
      product: "oil landscape painting",
      customer: "Jacob Taylor",
      date: "12 Jul 2023",
      amount: 395,
      paymentMethod: "cash",
      deliveryStatus: "pending",
    },
    {
      id: 945708,
      product: "pottery set",
      customer: "Andrew Martin",
      date: "9 May 2023",
      amount: 682,
      paymentMethod: "credit card",
      deliveryStatus: "delivered",
    },
    {
      id: 304557,
      product: "paper quilling art",
      customer: "Oliver Davis",
      date: "28 Sep 2023",
      amount: 572,
      paymentMethod: "paypal",
      deliveryStatus: "pending",
    },
  ];

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Products</TableCell>
              <TableCell className="tableCell">Customers</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.product}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.paymentMethod}</TableCell>
                <TableCell className="tableCell">
                  {row.deliveryStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default List;
