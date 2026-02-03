"use client";

import ActionTultipButton from "@/components/shared/ActionTultipButton";
import ActionButton from "@/components/ui/ActionButton";
import Modal from "@/components/ui/modal";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { fadeInUp } from "../../projects/singleProject/ProjectDetailsModal";

interface SkillsDataProps {
  id: string | undefined;
}

const SingleSkillsDetailsModal: React.FC<SkillsDataProps> = ({
  id: skillId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

//   console.log(skillId);
  

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
        tole="See skill details"
      />

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Order Details"
        size="xl"
      >
        <div>
          amar suner bangla skills
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

export default SingleSkillsDetailsModal;
