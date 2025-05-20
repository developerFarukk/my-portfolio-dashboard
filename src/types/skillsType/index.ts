

export type TSkillCategory = 'Technical' | 'Soft' | 'Front-end' | 'Backend' | 'UI-Tools';

export type TSkills = {
    _id?: string,
    title: string;
    description?: string;
    image?: string;
    skillCategory: TSkillCategory;
    createdAt: string;
    updatedAt: string;
};