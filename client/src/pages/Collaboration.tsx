import ProjectList from "./ProjectList"
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '../group/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../group/ui/tabs';
import { 
  Plus, UserPlus, Users, MessageSquare
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import ProjectPostList from '../group/ProjectPostList';
import TeamRequestsList from '../group/TeamRequestsList';
import MyTeamsList from '../group/MyTeamsList';
import PostProjectDialog from '../group/PostProjectDialog';

const Collaboration = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

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
            {/* Replacing custom Button with a simpler HTML button */}
            <button onClick={handlePostProject} className="btn">
              <Plus className="h-4 w-4 mr-2" />
              Post Project
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="projects" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Open Projects</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                <span>My Requests</span>
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>My Teams</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="projects" className="mt-6">
            {/* <ProjectPostList /> */}
            <ProjectList/>
          </TabsContent>
          
          <TabsContent value="requests" className="mt-6">
            <TeamRequestsList />
          </TabsContent>
          
          <TabsContent value="teams" className="mt-6">
            <MyTeamsList />
          </TabsContent>
        </Tabs>
      </div>

      <PostProjectDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </MainLayout>
  );
};

export default Collaboration;
