/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionTultipButton from "@/components/shared/ActionTultipButton";
import ActionButton from "@/components/ui/ActionButton";
import { deleteSkill } from "@/service/skillService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
interface TSkillDeleteProps {
  skillId: string;
}

const DeleteSkill = ({ skillId }: TSkillDeleteProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteSkill(skillId),
    onSuccess: () => {
      // 🔥 refetch projects list automatically
      queryClient.invalidateQueries({ queryKey: ["skills"] });
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
        text: "Skill deleted successfully",
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
      tole="Delete this skill"
      iconButton={
        <ActionButton
          variant="outline"
          size="sm"
          iconLeft={<Trash2 />}
          onClick={handleDelete}
          disabled={isPending}
        />
      }
    />
  );
};

export default DeleteSkill;
