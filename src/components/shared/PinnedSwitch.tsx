/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Switch } from "@/components/ui/switch";
import { updatProject } from "@/service/projectService";
import { updatSkills } from "@/service/skillService";
import { useState } from "react";
import { toast } from "sonner";

export type PinnedSwitchProps = {
  projectId: string;
  initialPinned: boolean;
};

export type PinnedSwitchSkillsProps = {
  id: string;
  initialPinned: boolean;
};

// Project pinned componnets
export const ProjectPinnedSwitch = ({
  projectId,
  initialPinned,
}: PinnedSwitchProps) => {
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

// Skills pinned componnets
export const SkillsPinnedSwitch = ({
  id,
  initialPinned,
}: PinnedSwitchSkillsProps) => {
  const [pinned, setPinned] = useState(initialPinned);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (value: boolean) => {
    // console.log(value);
    
    if (loading) return;

    setPinned(value);
    setLoading(true);

    try {
      const res = await updatSkills(id, { sPinned: value });
       console.log(res);

      toast.success(
        value ? "Skill pinned success" : "Skill unpinned success",
      );
    } catch (error: any) {
      console.log(error);
      
      setPinned(!value);
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
