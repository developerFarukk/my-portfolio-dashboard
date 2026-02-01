/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoaderCustom from "@/components/shared/LoaderCustom";
import NotFundData from "@/components/shared/NotFundData";
import ClearFilterButton from "@/components/shared/pagination/ClearFilterButton";
import LimitSelect from "@/components/shared/pagination/LimitSelect";
import SearchInput from "@/components/shared/pagination/SearchInput";
import SortComponents from "@/components/shared/pagination/SortComponents";
import TablePagination from "@/components/shared/pagination/TablePagination";
import TitleHooks from "@/components/shared/TitleHook";
import { getAllprojects } from "@/service/projectService";
import { TGlobalMeta, TMetaProjectResponse } from "@/types/global";
import { TProjects } from "@/types/projectType";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

const AllProjectClient = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [status, setStatus] = useState("");
  //   const [startDate, setStartDate] = useState("");
  //   const [endDate, setEndDate] = useState("");

  const { data, isLoading, isError, error } = useQuery<
    TMetaProjectResponse,
    Error
  >({
    queryKey: ["projects", page, limit, searchTerm, sort],
    queryFn: () =>
      getAllprojects({
        page,
        limit,
        searchTerm,
        sort,
      }),
    staleTime: 5000,
  });

  const resultData: TProjects[] = data?.result || [];

  console.log("project data", resultData);

  const meta: TGlobalMeta = data?.meta || {
    page: 1,
    limit: 5,
    total: 0,
    totalPage: 0,
  };

  console.log(meta);

  if (isError) return <p>Error: {(error as any).message}</p>;

  // Clear All Filters Function
  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSort("-createdAt");
    setLimit(5);
    setPage(1);
    setStatus("");
    // setStartDate("");
    // setEndDate("");
  };

  //   search submit handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  //   clear filters handler
  const handleClearFilters = () => {
    setSearchTerm("");
    setPage(1);
    setSort("-createdAt");
    setLimit(5);
    // setStartDate("");
    // setEndDate("");
  };

  // motion row variants
  const rowVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="mt-4">
      {/* Title */}
      <div className="mb-4">
        <TitleHooks
          title="ALL PROJECTS"
          icon={<FolderKanban />}
          count={meta?.total || 0}
        />
      </div>

      {/* Clear filter and date filter option */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">
        {/* 🧹 Clear Filter Button */}
        <div className="flex justify-start lg:justify-start italic">
          <ClearFilterButton filterClick={handleClearAllFilters} />
        </div>

        {/* Date Filtering */}
        {/* <div className="w-full lg:w-auto">
          <DateFilter
            key={`${startDate}-${endDate}`}
            startDate={startDate}
            endDate={endDate}
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        </div> */}
      </div>

      {/* search and other filter function */}
      <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-4 py-4 mb-2">
        {/* 🔍 Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full md:w-auto flex-1 min-w-[250px]"
        >
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={handleClearFilters}
            placeholder="Search by project name, title, id..."
          />
        </form>

        {/* 🧭 Sort Dropdown */}
        <div className="w-full sm:w-[48%] md:w-auto">
          <SortComponents
            value={sort}
            onChange={(value) => setSort(value)}
            placeholder="Select sort"
            label="Sort By"
            options={[
              { value: "-createdAt", label: "Newest" },
              { value: "createdAt", label: "Oldest" },
              { value: "name", label: "Name A-Z" },
              { value: "-name", label: "Name Z-A" },
              { value: "sPinned", label: "Pinned" },
            ]}
          />
        </div>

        {/* 📦 Status Dropdown */}
        <div className="w-full sm:w-[48%] md:w-auto">
          <SortComponents
            value={status}
            onChange={(value) => setStatus(value)}
            placeholder="Select Category"
            label="Project Category"
            options={[
              { value: "Feature", label: "Feature" },
              { value: "Recent", label: "Recent" },
              { value: "Upcoming", label: "Upcoming" },
              { value: "Alfa", label: "Alfa" },
              { value: "Subscription", label: "Subscription" },
            ]}
          />
        </div>

        {/* 🔢 Limit Dropdown */}
        <div className="w-full sm:w-[48%] md:w-auto">
          <LimitSelect value={limit} onChange={(value) => setLimit(value)} />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <div className="overflow-x-auto rounded-lg">
          {/* Table */}
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-300 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-700 italic">
              <tr>
                <th className="px-4 py-3 text-left font-bold">SL</th>
                <th className="px-4 py-3 text-left font-bold">Project Name</th>
                <th className="px-4 py-3 text-left font-bold">Category</th>
                <th className="px-4 py-3 text-left font-bold">Visibility</th>
                <th className="px-4 py-3 text-left font-bold">Type</th>
                <th className="px-4 py-3 text-left font-bold">Pinned</th>
                {/* <th className="px-4 py-3 text-left font-bold">
                  <ToltipHooks title="Number" tole="Order Phone Number" />
                </th> */}
                <th className="px-2 py-3 text-center font-bold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="text-center py-6">
                    <LoaderCustom />
                  </td>
                </tr>
              ) : resultData?.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-6">
                    <NotFundData />
                  </td>
                </tr>
              ) : (
                resultData.map((project: TProjects, index) => (
                  <motion.tr
                    key={project._id}
                    variants={rowVariant}
                    initial="hidden"
                    animate="show"
                    className="hover:bg-gray-100 dark:hover:bg-slate-950 transition-colors duration-500 ease-in-out"
                  >
                    <td className="px-4 py-4 whitespace-nowrap font-medium">
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            project?.pLogoLink ||
                            "https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-illustration-svg-download-png-6515859.png"
                          }
                          alt={project?.pName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover border border-gray-300 dark:border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {project?.pName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {project?._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* <td className="px-4 py-4 whitespace-nowrap">
                      {project?.pName}
                    </td> */}

                    <td className="px-4 py-4 whitespace-nowrap">
                      {project?.pCategory}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {project?.pVisibility}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {project?.pType}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {/* {project?.pType} */}
                      <Switch checked={project?.pPinned === true} />
                    </td>

                    {/* <td className="px-4 py-4 whitespace-nowrap">
                      {order?.email ? order?.email : "N/A"}
                    </td> */}

                    {/* <DateTimeCell date={order?.createdAt} /> */}

                    {/* <td className="px-4 py-4 whitespace-nowrap">
                      {order?.division}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {order?.districts}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {order?.upozila}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {order?.fullAddress}
                    </td> */}
                    {/* <td className="px-2 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {order?.division}, {order?.districts},{" "}
                          {order?.upozila}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {order?.fullAddress}
                        </span>
                      </div>
                    </td> */}

                    {/* order status updated */}
                    {/* <td className="px-4 py-4 whitespace-nowrap">
                      <UpdateOrderStatus
                        orderId={order?.orderId}
                        currentStatus={order.orderStatus}
                        options={[
                          { value: "Pending", label: "Pending" },
                          { value: "Processing", label: "Processing" },
                          { value: "Shipped", label: "Shipped" },
                          { value: "Delivered", label: "Delivered" },
                          { value: "Cancelled", label: "Cancelled" },
                        ]}
                      />
                    </td> */}

                    {/* Action */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center items-center border-1 p-1 rounded-md">
                        {/* Show Details */}
                        {/* <Link href={`/dashboard/orders/${order?.orderId}`}>
                          <ActionTultipButton
                            iconButton={
                              <ActionButton
                                variant="outline"
                                size="sm"
                                iconLeft={<Eye />}
                              />
                            }
                            tole="See Order Details"
                          />
                        </Link> */}
                        {/* <OrderDetailsModal orderData={order?.orderId} /> */}
                        {/* Edite Order */}
                        {/* <Link href={`/dashboard/orders/${order?.orderId}`}>
                          <ActionTultipButton
                            iconButton={
                              <ActionButton
                                variant="outline"
                                size="sm"
                                iconLeft={<Pencil />}
                              />
                            }
                            tole="Edite Order"
                          />
                        </Link> */}
                        Project details
                        {/* Download Order Ricipt */}
                        {/* <ActionTultipButton
                          iconButton={
                            <ActionButton
                              variant="outline"
                              size="sm"
                              iconLeft={<Download />}
                            />
                          }
                          tole="Download Order Recipt"
                        /> */}
                        {/* <InvoiceDownload orders={order} /> */}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <TablePagination
          page={page}
          totalPage={meta?.totalPage || 1}
          onChangePage={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default AllProjectClient;
