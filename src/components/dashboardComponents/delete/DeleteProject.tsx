/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ActionTultipButton from "@/components/shared/ActionTultipButton";
import ActionButton from "@/components/ui/ActionButton";
import { deleteProject } from "@/service/projectService";

interface TProjectDeleteProps {
  projectId: string;
}

const DeleteProject = ({ projectId }: TProjectDeleteProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      // 🔥 refetch projects list automatically
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await mutateAsync();

      await Swal.fire({
        title: "Deleted!",
        text: "Project deleted successfully",
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <ActionTultipButton
      tole="Delete this project"
      iconButton={
        <ActionButton
          variant="outline"
          size="sm"
          iconLeft={<Trash2 />}
          onClick={handleDelete}
          disabled={isPending} // ✅ CORRECT
        />
      }
    />
  );
};

export default DeleteProject;
