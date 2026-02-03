import SkillUpdateClient from "@/components/dashboardComponents/skills/update/SkillUpdateClient";
import { getSinglSkills } from "@/service/skillService";

const SkillUpdateServer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const skillData = await getSinglSkills(id);

  const skillsData = skillData?.data;

  return (
    <div>
      <SkillUpdateClient skillData={skillsData} />
    </div>
  );
};

export default SkillUpdateServer;
