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
import { PINNED_OPTIONS, TProjects } from "@/types/projectType";
import { useQuery } from "@tanstack/react-query";
import { Eye, FolderKanban, Pencil, Pipette } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PinnedSwitch from "@/components/shared/PinnedSwitch";
import Link from "next/link";
import ActionTultipButton from "@/components/shared/ActionTultipButton";
import ActionButton from "@/components/ui/ActionButton";
import DeleteProject from "../../delete/DeleteProject";
import ProjectDetailsModal from "../singleProject/ProjectDetailsModal";

const AllProjectClient = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [category, setCategory] = useState("");
  const [pinned, setPinned] = useState("");

  const { data, isLoading, isError, error } = useQuery<
    TMetaProjectResponse,
    Error
  >({
    queryKey: ["projects", page, limit, searchTerm, sort, category, pinned],
    queryFn: () =>
      getAllprojects({
        page,
        limit,
        searchTerm,
        sort,
        pCategory: category,
        pPinned:
          pinned === "true" ? true : pinned === "false" ? false : undefined,
      }),
    staleTime: 5000,
  });

  const resultData: TProjects[] = data?.result || [];

  // console.log("project data", resultData);

  const meta: TGlobalMeta = data?.meta || {
    page: 1,
    limit: 5,
    total: 0,
    totalPage: 0,
  };

  // console.log(meta);

  if (isError) return <p>Error: {(error as any).message}</p>;

  // Clear All Filters Function
  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSort("-createdAt");
    setLimit(5);
    setPage(1);
    setCategory("");
    setPinned("");
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
    setPinned("");
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
            ]}
          />
        </div>

        {/* 📦 Project Category Filter Dropdown */}
        <div className="w-full sm:w-[48%] md:w-auto">
          <SortComponents
            value={category}
            onChange={(value) => setCategory(value)}
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

        {/* 🔢 Project Pinned Dropdown */}
        <div className="w-full sm:w-[48%] md:w-auto">
          <SortComponents
            value={pinned}
            onChange={(val) => setPinned(val)}
            placeholder="Select Pinned Status"
            label="Pinned Status"
            options={PINNED_OPTIONS}
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
                <th className="px-4 py-3 text-left font-bold">Live URL</th>
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
                          width={40}
                          height={40}
                          alt="pic_name"
                          className="rounded-full object-cover border border-gray-300 dark:border-slate-700"
                        />
                        <div>
                          <p className="flex justify-start items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
                            {project?.pName}
                            {project?.pPinned === true ? (
                              <Pipette size={18} />
                            ) : null}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {project?._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {project?.pCategory}
                    </td>

                    {/* Live url */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        href={project?.pLiveClientLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h2 className="underline hover:text-blue-400">
                          {project?.pLiveClientLink}
                        </h2>
                      </Link>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {project?.pVisibility}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {project?.pType}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {project?._id && (
                        <PinnedSwitch
                          projectId={project._id}
                          initialPinned={project.pPinned}
                        />
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center items-center border-1 p-1 rounded-md">
                        {/* Show Details */}
                        <ProjectDetailsModal projectData={project?._id} />

                        {/* Edite project */}
                        <Link href={`/dashboard/project/${project?._id}`}>
                          <ActionTultipButton
                            iconButton={
                              <ActionButton
                                variant="outline"
                                size="sm"
                                iconLeft={<Pencil />}
                              />
                            }
                            tole="Edite project"
                          />
                        </Link>

                        {/* Delete Project */}
                        {project?._id && (
                          <DeleteProject projectId={project?._id} />
                        )}

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
