"use client";

import { useEffect, useState } from "react";
import { Plus, Minus, StarIcon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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
  label = "Project Features 1",
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
      <div className="flex justify-end">
        <motion.button
          type="button"
          onClick={addFeature}
          whileTap={{ scale: 1.15 }}
          className="dark:bg-slate-700 bg-gray-400/30 hover:bg-slate-400/50 hover:dark:bg-slate-700/80 text-black dark:text-white text-md font-semibold rounded-3xl px-3 py-1"
        >
          <div className="flex items-center gap-2 text-lg font-semibold italic">
            <Plus size={20} />
            <h2>Add Feature</h2>
          </div>
        </motion.button>
      </div>

      {/* Features */}
      {features.map((feature, fIdx) => (
        <div key={fIdx} className="border rounded-md p-3 space-y-3 bg-muted/30">
          <FormLabel className="font-semibold italic">
            {`Project Feature ${fIdx + 1}`}{" "}
            <span className="text-xs text-red-600">(Optional)</span>
          </FormLabel>
          {/* Feature Title */}
          <div className="flex gap-2 justify-start items-center">
            <div className="lg:w-24 w-16 italic">
              <h2>Title {`${fIdx + 1}`} :</h2>
            </div>
            <Input
              placeholder={`Inpute feature title ${fIdx + 1}`}
              value={feature.pFeatureTitle ?? ""}
              onChange={(e) => updateFeatureTitle(fIdx, e.target.value)}
            />
          </div>

          {/* Descriptions */}
          <div className="space-y-2 border p-2 rounded-md bg-fuchsia-100 dark:bg-cyan-950">
            <div className="text-center italic">
              <h2 className="text-md font-medium p-1 mb-2">Descriptions</h2>
            </div>
            {feature.pFeatureDescriptions?.map((desc, dIdx) => (
              <div key={dIdx} className="mt-2">
                <div className="lg:flex gap-2 lg:items-start">
                  {/* <div className=" italic flex justify-center items-center m-2">
                    <h2 className="border rounded-full p-1 border-blue-200 dark:border-amber-900">{` ${fIdx + 1}`}</h2>
                  </div> */}

                  <div className="flex justify-center items-center my-2 lg:my-0 italic">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-blue-200 dark:border-amber-900 text-sm font-semibold">
                      {fIdx + 1}
                    </div>
                  </div>

                  <Input
                    placeholder={`Point ${fIdx + 1} (Optional) `}
                    value={desc}
                    onChange={(e) =>
                      updateDescription(fIdx, dIdx, e.target.value)
                    }
                    className="max-w-xs my-2 lg:my-0"
                  />
                  <div>
                    
                  </div>
                  <Textarea
                    placeholder={`Inpute feature description ${fIdx + 1}`}
                    value={desc}
                    onChange={(e) =>
                      updateDescription(fIdx, dIdx, e.target.value)
                    }
                    className="lg:py-0 py-2"
                  />

                  {dIdx > 0 && (
                    <motion.button
                      type="button"
                      onClick={() => removeDescription(fIdx, dIdx)}
                      whileTap={{ scale: 1.2 }}
                      className="hover:border hover:rounded-full hover:dark:border-white"
                    >
                      <Minus size={18} />
                    </motion.button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => addDescription(fIdx)}
                className="text-xs dark:text-blue-200 border p-1 rounded-2xl border-amber-800"
              >
                + Add description
              </button>
            </div>
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
