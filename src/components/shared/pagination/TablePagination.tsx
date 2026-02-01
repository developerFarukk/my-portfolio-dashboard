"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  page: number;
  totalPage: number;
  onChangePage: (page: number) => void;
}

const TablePagination = ({
  page,
  totalPage,
  onChangePage,
}: TablePaginationProps) => {
  if (totalPage <= 1) return null;

  return (
    <div className="py-4">
      <Pagination>
        <PaginationContent className="flex items-center gap-2">
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onChangePage(page - 1);
              }}
              className={`px-3 py-1 rounded border transition-all ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              ⬅ Prev
            </PaginationPrevious>
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  onChangePage(p);
                }}
                className={`px-3 py-1 rounded border transition-all ${
                  p === page
                    ? "bg-gray-300 dark:bg-slate-700 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPage) onChangePage(page + 1);
              }}
              className={`px-3 py-1 rounded border transition-all ${
                page === totalPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              Next ➡
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
