"use client";

interface UpdateSkillProps {
  skillData: string;
}

const SkillUpdateClient = ({ skillData }: UpdateSkillProps) => {

    // console.log("client skills data", skillData);
    
  return (
    <div>
      <div> The Component is Start SkillUpdateClient </div>
    </div>
  );
};

export default SkillUpdateClient;
