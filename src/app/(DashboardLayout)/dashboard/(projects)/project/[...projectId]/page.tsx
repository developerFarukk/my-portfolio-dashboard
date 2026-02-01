import SingleProjectClient from "@/components/dashboardComponents/projects/singleProject/SingleProjectClient";
import { getSinglProject } from "@/service/projectService";

const ProjectDetailsServer = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const projectData = await getSinglProject(projectId);

  const project = projectData?.data

//   console.log("project is ", project);

  return (
    <div>
      <SingleProjectClient project={project} />
    </div>
  );
};

export default ProjectDetailsServer;
