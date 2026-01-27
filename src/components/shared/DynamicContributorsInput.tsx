"use client";

import { useEffect, useState } from "react";
import { Plus, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { motion } from "framer-motion";
import { ImageUrlPreview } from "./ImageUrlPreview";
import { WebsitePreviewUrl } from "./WebsitePreviewUrl";

export type TPContributors = {
  name?: string;
  role?: string;
  profileLink?: string;
  portfolioLink?: string;
  gitHubLink?: string;
};

interface DynamicContributorsInputProps {
  value?: TPContributors[];
  onChange?: (value: TPContributors[]) => void;
}

export const DynamicContributorsInput = ({
  value = [],
  onChange,
}: DynamicContributorsInputProps) => {
  const [contributors, setContributors] = useState<TPContributors[]>([
    {
      name: "",
      role: "",
      profileLink: "",
      portfolioLink: "",
      gitHubLink: "",
    },
  ]);

  useEffect(() => {
    setContributors(
      value && value.length > 0
        ? value
        : [
            {
              name: "",
              role: "",
              profileLink: "",
              portfolioLink: "",
              gitHubLink: "",
            },
          ],
    );
  }, [value]);

  const update = (updated: TPContributors[]) => {
    setContributors(updated);
    onChange?.(updated);
  };

  const updateField = (
    index: number,
    key: keyof TPContributors,
    val: string,
  ) => {
    const updated = [...contributors];
    updated[index] = { ...updated[index], [key]: val };
    update(updated);
  };

  const addContributor = () => {
    update([
      ...contributors,
      {
        name: "",
        role: "",
        profileLink: "",
        portfolioLink: "",
        gitHubLink: "",
      },
    ]);
  };

  const removeContributor = (index: number) => {
    update(contributors.filter((_, i) => i !== index));
  };

  const isValidUrl = (url?: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-4">
      {/* Add button */}
      <div className="flex justify-end">
        <motion.button
          type="button"
          onClick={addContributor}
          whileTap={{ scale: 1.15 }}
          className="rounded-3xl px-3 py-1 bg-gray-400/30 dark:bg-slate-700"
        >
          <div className="flex items-center gap-2 italic font-semibold">
            <Plus size={18} />
            Add Contributor
          </div>
        </motion.button>
      </div>

      {contributors.map((c, idx) => (
        <div key={idx} className="border rounded-md p-4 space-y-4 bg-muted/30">
          <FormLabel className="italic font-semibold">
            Contributor {idx + 1}
          </FormLabel>

          {/* Name & Role */}
          <div className="grid md:grid-cols-2 gap-3">
            <Input
              placeholder="Contributor name"
              value={c.name ?? ""}
              onChange={(e) => updateField(idx, "name", e.target.value)}
            />
            <Input
              placeholder="Role"
              value={c.role ?? ""}
              onChange={(e) => updateField(idx, "role", e.target.value)}
            />
          </div>

          {/* Profile Image URL */}
          <Input
            placeholder="Profile image URL"
            value={c.profileLink ?? ""}
            onChange={(e) => updateField(idx, "profileLink", e.target.value)}
          />

          {isValidUrl(c.profileLink) && (
            <ImageUrlPreview
              url={c.profileLink!}
              onClear={() => updateField(idx, "profileLink", "")}
            />
          )}

          {/* Portfolio URL */}
          <Input
            placeholder="Portfolio website URL"
            value={c.portfolioLink ?? ""}
            onChange={(e) => updateField(idx, "portfolioLink", e.target.value)}
          />

          {isValidUrl(c.portfolioLink) && (
            <WebsitePreviewUrl
              url={c.portfolioLink!}
              onClear={() => updateField(idx, "portfolioLink", "")}
            />
          )}

          {/* GitHub */}
          <div className="flex items-center gap-2">
            <Github size={18} />
            <Input
              placeholder="GitHub profile link"
              value={c.gitHubLink ?? ""}
              onChange={(e) => updateField(idx, "gitHubLink", e.target.value)}
            />
          </div>

          {/* Remove */}
          {idx > 0 && (
            <button
              type="button"
              onClick={() => removeContributor(idx)}
              className="text-xs text-red-600 border border-red-400 rounded-2xl px-2 py-1"
            >
              Remove Contributor
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
