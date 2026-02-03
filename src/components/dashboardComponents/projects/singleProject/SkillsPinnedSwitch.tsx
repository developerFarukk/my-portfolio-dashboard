/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Switch } from "@/components/ui/switch";
import { updatSkills } from "@/service/skillService";
import { useState } from "react";
import { toast } from "sonner";

export type PinnedSwitchSkillsProps = {
  id: string;
  initialPinned: boolean | undefined;
};

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
      await updatSkills(id, { sPinned: value });
      //   console.log(res);

      toast.success(value ? "Skill pinned success" : "Skill unpinned success");
    } catch (error: any) {
      //   console.log(error);

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
