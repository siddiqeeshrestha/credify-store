import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orderData = [
  {
    id: "101",
    date: "21 Sep, 2024",
    total: "1200৳ (1 Products)",
    status: "Processing",
  },
  {
    id: "102",
    date: "22 Sep, 2024",
    total: "1200৳ (4 Product)",
    status: "On the way",
  },
  {
    id: "103",
    date: "23 Sep, 2024",
    total: "1200৳ (1 Products)",
    status: "Completed",
  },
  {
    id: "104",
    date: "24 Sep, 2024",
    total: "1200৳ (5 Products)",
    status: "Completed",
  },
  {
    id: "105",
    date: "25 Sep, 2024",
    total: "1200৳ (3 Products)",
    status: "Completed",
  },
  {
    id: "106",
    date: "26 Sep, 2024",
    total: "1200৳ (7 Products)",
    status: "Completed",
  },
  {
    id: "106",
    date: "26 Sep, 2024",
    total: "1200৳ (7 Products)",
    status: "Completed",
  },
  {
    id: "106",
    date: "26 Sep, 2024",
    total: "1200৳ (7 Products)",
    status: "Completed",
  },
  {
    id: "106",
    date: "26 Sep, 2024",
    total: "1200৳ (7 Products)",
    status: "Completed",
  },
  {
    id: "106",
    date: "26 Sep, 2024",
    total: "1200৳ (7 Products)",
    status: "Completed",
  },
];

export const OrderHistorySection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-2.5 pt-0 pb-16 px-0 relative w-full bg-white">
      <Card className="w-full max-w-[1040px] bg-white rounded-2xl border border-solid border-[#6c7174] shadow-[0px_2px_2px_#000000]">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-8">
            <h2 className="[font-family:'Neology-Bold-Bold',Helvetica] font-bold text-[#191919] text-xl tracking-[0] leading-[30px]">
              Recet Order History
            </h2>
            <Button className="w-[140px] h-10 bg-[#98042d] rounded-[36px] shadow-[0px_2px_2px_#00000099] hover:bg-[#98042d]/90 h-auto">
              <span className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-center leading-6 text-sm tracking-[0]">
                View All
              </span>
            </Button>
          </div>

          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-scalegray-50 border border-solid border-[#6c7174]">
                  <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                    ORDER ID
                  </TableHead>
                  <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                    DATE
                  </TableHead>
                  <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                    TOTAL
                  </TableHead>
                  <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                    STATUS
                  </TableHead>
                  <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                    ACTION
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData.map((order, index) => (
                  <React.Fragment key={`order-${index}`}>
                    <TableRow>
                      <TableCell className="px-6 py-3">
                        <div className="flex items-center">
                          <span className="[font-family:'Poppins',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[21px]">
                            #
                          </span>
                          <span className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[21px]">
                            {order.id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        <span className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[21px]">
                          {order.date}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        <span className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[21px]">
                          {order.total}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        <span className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[21px]">
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-3">
                        <button className="[font-family:'Roboto',Helvetica] font-medium text-[#98042d] text-sm tracking-[0] leading-[21px] hover:underline">
                          View Details
                        </button>
                      </TableCell>
                    </TableRow>
                    {index < orderData.length - 1 && (
                      <TableRow>
                        <TableCell colSpan={5} className="p-0">
                          <div className="w-full h-0.5 bg-[#c4c4c4] rounded-[10px]" />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
