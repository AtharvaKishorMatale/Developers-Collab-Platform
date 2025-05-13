import ProjectList from "./ProjectList";
import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Plus, UserPlus, Users } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import ProjectPostList from "../group/ProjectPostList";
import TeamRequestsList from "../group/TeamRequestsList";
import MyTeamsList from "../group/MyTeamsList";
import PostProjectDialog from "../group/PostProjectDialog";

const Collaboration = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  const handlePostProject = () => {
    setIsDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Collaboration</h1>
            <p className="text-muted-foreground mt-1">
              Find projects to join or post your own to find teammates
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePostProject}
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Post Project
            </button>
          </div>
        </div>

        {/* Simplified Tab Buttons */}
        <div className="flex gap-4 border-b pb-2">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-1 px-4 py-2 rounded-md ${
              activeTab === "projects" ? "bg-primary text-white" : "text-muted"
            }`}
          >
            <Plus className="h-4 w-4" />
            Open Projects
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-1 px-4 py-2 rounded-md ${
              activeTab === "requests" ? "bg-primary text-white" : "text-muted"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            My Requests
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`flex items-center gap-1 px-4 py-2 rounded-md ${
              activeTab === "teams" ? "bg-primary text-white" : "text-muted"
            }`}
          >
            <Users className="h-4 w-4" />
            My Teams
          </button>
        </div>

        {/* Render content based on activeTab */}
        <div className="mt-6">
          {activeTab === "projects" && <ProjectList />}
          {activeTab === "requests" && <TeamRequestsList />}
          {activeTab === "teams" && <MyTeamsList />}
        </div>
      </div>

      <PostProjectDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </MainLayout>
  );
};

export default Collaboration;
