
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../group/ui/card';
import { Button } from '../group/ui/button';
import { Progress } from '../group/ui/progress';
import { Badge } from '../group/ui/badge';
import { Clock, Check, Clock2, ArrowRight, Copy } from 'lucide-react';
import { cn } from '../lib/utils';
import DuplicateProjectDialog from './DuplicateProjectDialog';
import { useToast } from '../hooks/use-toast';

type ProjectStatus = 'planning' | 'ongoing' | 'completed';

type TeamMember = {
  id: string;
  name: string;
  avatar: string;
};

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    status: ProjectStatus;
    progress: number;
    tech: string[];
    teamSize: number;
    teamMembers: TeamMember[];
    startDate: string;
    endDate: string | null;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { toast } = useToast();
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const statusIcon = {
    planning: <Clock className="h-4 w-4" />,
    ongoing: <ArrowRight className="h-4 w-4" />,
    completed: <Check className="h-4 w-4" />
  };

  const statusColor = {
    planning: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
    ongoing: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20", 
    completed: "bg-green-500/10 text-green-500 hover:bg-green-500/20"
  };

  const handleViewDetails = () => {
    toast({
      title: "Project Details",
      description: `Viewing details for ${project.title}`,
    });
  };

  const handleDuplicate = () => {
    setIsDuplicateDialogOpen(true);
  };

  return (
    <Card className="overflow-hidden hover-card-effect">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge className={cn("px-2 py-1", statusColor[project.status])}>
            <div className="flex items-center gap-1">
              {statusIcon[project.status]}
              <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
            </div>
          </Badge>
          <div className="text-xs text-muted-foreground">
            {project.progress}% Complete
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <Progress value={project.progress} className="h-2 mb-4" />
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((tech, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        {project.teamMembers.length > 0 ? (
          <div className="flex justify-between items-center mb-2">
            <div className="flex -space-x-2">
              {project.teamMembers.slice(0, 3).map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-7 h-7 rounded-full border-2 border-background"
                  title={member.name}
                />
              ))}
              {project.teamMembers.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                  +{project.teamMembers.length - 3}
                </div>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              Team Size: {project.teamMembers.length}/{project.teamSize}
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground mb-2">
            Looking for team members ({project.teamSize} needed)
          </div>
        )}
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock2 className="h-3.5 w-3.5" />
            <span>Started: {formatDate(project.startDate)}</span>
          </div>
          {project.status === 'completed' ? (
            <div>Completed: {formatDate(project.endDate)}</div>
          ) : (
            <div>Deadline: {formatDate(project.endDate)}</div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs" 
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        {project.status === 'completed' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center gap-1" 
            onClick={handleDuplicate}
          >
            <Copy className="h-3.5 w-3.5" />
            Duplicate & Learn
          </Button>
        )}
      </CardFooter>

      <DuplicateProjectDialog 
        open={isDuplicateDialogOpen} 
        onOpenChange={setIsDuplicateDialogOpen} 
        projectTitle={project.title}
      />
    </Card>
  );
};

export default ProjectCard;
