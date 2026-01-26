
"use client";

import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormLabel } from "@/components/ui/form";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

export type TProjectDescriptionTitle = {
  pDescriptionTitle?: string;
  pDescriptionPoints?: string;
};

export type TProjectFeature = {
  pFeatureTitle?: string;
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
}: DynamicFeaturesInputProps) => {
  const [features, setFeatures] = useState<TProjectFeature[]>([
    {
      pFeatureTitle: "",
      pFeaturesDescriptionWithTitle: [
        { pDescriptionTitle: "", pDescriptionPoints: "" },
      ],
    },
  ]);

  /* sync RHF -> local */
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
    update([
      ...features,
      {
        pFeatureTitle: "",
        pFeaturesDescriptionWithTitle: [
          { pDescriptionTitle: "", pDescriptionPoints: "" },
        ],
      },
    ]);
  };

  const removeFeature = (fIdx: number) => {
    update(features.filter((_, i) => i !== fIdx));
  };

  const updateFeatureTitle = (fIdx: number, value: string) => {
    const updated = [...features];
    updated[fIdx].pFeatureTitle = value;
    update(updated);
  };

  /* ---------- Description handlers ---------- */

  const updateDescription = (
    fIdx: number,
    dIdx: number,
    key: keyof TProjectDescriptionTitle,
    value: string,
  ) => {
    const updated = [...features];
    const descs = updated[fIdx].pFeaturesDescriptionWithTitle ?? [];
    descs[dIdx] = { ...descs[dIdx], [key]: value };
    updated[fIdx].pFeaturesDescriptionWithTitle = descs;
    update(updated);
  };

  const addDescription = (fIdx: number) => {
    const updated = [...features];
    updated[fIdx].pFeaturesDescriptionWithTitle = [
      ...(updated[fIdx].pFeaturesDescriptionWithTitle ?? []),
      { pDescriptionTitle: "", pDescriptionPoints: "" },
    ];
    update(updated);
  };

  const removeDescription = (fIdx: number, dIdx: number) => {
    const updated = [...features];
    const filtered =
      updated[fIdx].pFeaturesDescriptionWithTitle?.filter(
        (_, i) => i !== dIdx,
      ) ?? [];

    updated[fIdx].pFeaturesDescriptionWithTitle = filtered.length
      ? filtered
      : [{ pDescriptionTitle: "", pDescriptionPoints: "" }];

    update(updated);
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* Add Feature */}
      <div className="flex justify-end">
        <motion.button
          type="button"
          whileTap={{ scale: 1.1 }}
          onClick={addFeature}
          className="rounded-3xl px-3 py-1 bg-gray-400/30 dark:bg-slate-700 font-semibold italic"
        >
          <div className="flex gap-2 items-center">
            <Plus size={18} /> Add Feature
          </div>
        </motion.button>
      </div>

      {/* Features */}
      {features.map((feature, fIdx) => (
        <div key={fIdx} className="border rounded-md p-4 space-y-4 bg-muted/30">
          <FormLabel className="italic font-semibold">
            Project Feature {fIdx + 1}
          </FormLabel>

          {/* Feature title */}
          <div className="flex gap-2 justify-start items-center">
            <div className="lg:w-24 w-16 italic">
              <h2>Title {`${fIdx + 1}`} :</h2>
            </div>
            <Input
              placeholder={`Input feature title ${fIdx + 1}`}
              value={feature.pFeatureTitle ?? ""}
              onChange={(e) => updateFeatureTitle(fIdx, e.target.value)}
            />
          </div>

          {/* Descriptions */}
          <div className="border rounded-md p-3 space-y-4 bg-fuchsia-100 dark:bg-cyan-950">
            <h2 className="text-center italic font-medium">Descriptions</h2>

            {feature.pFeaturesDescriptionWithTitle?.map((desc, dIdx) => (
              <div key={dIdx} className="lg:flex gap-3 items-start">
                {/* Serial */}
                <div className="flex justify-center items-center italic py-1 lg:py-0">
                  <div className="w-6 h-6 flex items-center justify-center rounded-md border border-blue-200 dark:border-amber-900 text-sm font-semibold">
                    {dIdx + 1}
                  </div>
                </div>

                {/* Point → pDescriptionPoints */}
                {/* <div className="py-1 lg:py-0"> */}
                <Input
                  placeholder={`Key Point ${dIdx + 1} (Optional)`}
                  value={desc.pDescriptionPoints ?? ""}
                  onChange={(e) =>
                    updateDescription(
                      fIdx,
                      dIdx,
                      "pDescriptionPoints",
                      e.target.value,
                    )
                  }
                  className="lg:max-w-xs my-2 lg:my-0"
                />
                {/* </div> */}

                {/* Title → pDescriptionTitle */}
                {/* <div className="py-1 lg:py-0"> */}
                <Textarea
                  placeholder={`Inpute feature description ${dIdx + 1}`}
                  value={desc.pDescriptionTitle ?? ""}
                  onChange={(e) =>
                    updateDescription(
                      fIdx,
                      dIdx,
                      "pDescriptionTitle",
                      e.target.value,
                    )
                  }
                  className="my-2 lg:my-0"
                />
                {/* </div> */}

                {dIdx > 0 && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 1.2 }}
                    onClick={() => removeDescription(fIdx, dIdx)}
                    className="border rounded-full dark:border-white"
                  >
                    <Minus size={18} />
                  </motion.button>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => addDescription(fIdx)}
                className="text-xs border rounded-2xl px-2 py-1"
              >
                + Add description
              </button>
            </div>
          </div>

          {fIdx > 0 && (
            <button
              type="button"
              onClick={() => removeFeature(fIdx)}
              className="text-xs border rounded-2xl px-2 py-1"
            >
              Remove Feature
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
