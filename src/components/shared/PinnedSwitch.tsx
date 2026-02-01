/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Switch } from "@/components/ui/switch";
import { updatProject } from "@/service/projectService";
import { useState } from "react";
import { toast } from "sonner";

type PinnedSwitchProps = {
  projectId: string;
  initialPinned: boolean;
};

const PinnedSwitch = ({ projectId, initialPinned }: PinnedSwitchProps) => {
  const [pinned, setPinned] = useState(initialPinned);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (value: boolean) => {
    if (loading) return;

    setPinned(value); // 🔥 optimistic update
    setLoading(true);

    try {
      await updatProject(projectId, { pPinned: value });
      //  console.log(res);

      toast.success(
        value ? "Project pinned success" : "Project unpinned success",
      );
    } catch (error: any) {
      setPinned(!value); // rollback
      toast.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={pinned}
      onCheckedChange={handleToggle}
      disabled={loading}
    />
  );
};

export default PinnedSwitch;
