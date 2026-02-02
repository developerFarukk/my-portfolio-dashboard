"use client";

import ActionTultipButton from "@/components/shared/ActionTultipButton";
import ActionButton from "@/components/ui/ActionButton";
import { Eye } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Variants, TargetAndTransition } from "framer-motion";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";

interface ProjectDataProps {
  projectData: string | undefined;
}

interface CustomVariants extends Variants {
  visible: (i?: number) => TargetAndTransition;
}

const fadeInUp: CustomVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const ProjectDetailsModal: React.FC<ProjectDataProps> = ({
  projectData: projectId,
}) => {
  console.log(projectId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Trigger Button */}
      <ActionTultipButton
        iconButton={
          <ActionButton
            onClick={() => setIsOpen(true)}
            variant="outline"
            size="sm"
            iconLeft={<Eye />}
          />
        }
        tole="See project details"
      />

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Order Details"
        size="xl"
      >
        <div>
          amar suner bangla
          {/* Footer */}
          <motion.div
            className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              variant="secondary"
            >
              Close
            </Button>
          </motion.div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetailsModal;
