"use client";

import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

export type TProjectDescriptionTitle = {
  pDescriptionTitle?: string;
  pDescriptionPoints?: string;
};

export type TProjectFeature = {
  pFeatureTitle?: string;
  pFeatureDescriptions?: string[];
  pFeaturesDescriptionWithTitle?: TProjectDescriptionTitle[];
};

interface DynamicFeaturesInputProps {
  value?: TProjectFeature[];
  onChange?: (value: TProjectFeature[]) => void;
  label?: string;
}

/* ================= COMPONENT ================= */

export const DynamicFeaturesInput = ({
  value = [],
  onChange,
  label = "Project Features",
}: DynamicFeaturesInputProps) => {
  const [features, setFeatures] = useState<TProjectFeature[]>([
    {
      pFeatureTitle: "",
      pFeatureDescriptions: [""],
    },
  ]);

  /* sync RHF -> local state */
  useEffect(() => {
    if (value && value.length) {
      setFeatures(value);
    }
  }, [value]);

  const update = (updated: TProjectFeature[]) => {
    setFeatures(updated);
    onChange?.(updated);
  };

  /* ---------- Feature handlers ---------- */

  const addFeature = () => {
    update([...features, { pFeatureTitle: "", pFeatureDescriptions: [""] }]);
  };

  const removeFeature = (index: number) => {
    update(features.filter((_, i) => i !== index));
  };

  const updateFeatureTitle = (index: number, title: string) => {
    const updated = [...features];
    updated[index].pFeatureTitle = title;
    update(updated);
  };

  /* ---------- Description handlers ---------- */

  const updateDescription = (
    featureIndex: number,
    descIndex: number,
    value: string,
  ) => {
    const updated = [...features];
    const descs = [...(updated[featureIndex].pFeatureDescriptions || [])];
    descs[descIndex] = value;
    updated[featureIndex].pFeatureDescriptions = descs;
    update(updated);
  };

  const addDescription = (featureIndex: number) => {
    const updated = [...features];
    updated[featureIndex].pFeatureDescriptions = [
      ...(updated[featureIndex].pFeatureDescriptions || []),
      "",
    ];
    update(updated);
  };

  const removeDescription = (featureIndex: number, descIndex: number) => {
    const updated = [...features];
    updated[featureIndex].pFeatureDescriptions = updated[
      featureIndex
    ].pFeatureDescriptions?.filter((_, i) => i !== descIndex);
    update(updated);
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <FormLabel className="font-semibold italic">
          {label} <span className="text-xs text-red-600">(Optional)</span>
        </FormLabel>

        <motion.button
          type="button"
          onClick={addFeature}
          whileTap={{ scale: 1.15 }}
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Features */}
      {features.map((feature, fIdx) => (
        <div key={fIdx} className="border rounded-md p-3 space-y-3 bg-muted/30">
          {/* Feature Title */}
          <Input
            placeholder={`Feature ${fIdx + 1} Title`}
            value={feature.pFeatureTitle ?? ""}
            onChange={(e) => updateFeatureTitle(fIdx, e.target.value)}
          />

          {/* Descriptions */}
          <div className="space-y-2">
            {feature.pFeatureDescriptions?.map((desc, dIdx) => (
              <div key={dIdx} className="flex gap-2 items-center">
                <Input
                  placeholder="Feature description"
                  value={desc}
                  onChange={(e) =>
                    updateDescription(fIdx, dIdx, e.target.value)
                  }
                />

                {dIdx > 0 && (
                  <motion.button
                    type="button"
                    onClick={() => removeDescription(fIdx, dIdx)}
                    whileTap={{ scale: 1.2 }}
                  >
                    <Minus size={18} />
                  </motion.button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addDescription(fIdx)}
              className="text-xs text-blue-600"
            >
              + Add description
            </button>
          </div>

          {/* Remove Feature */}
          {fIdx > 0 && (
            <button
              type="button"
              onClick={() => removeFeature(fIdx)}
              className="text-xs text-red-600"
            >
              Remove Feature
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
