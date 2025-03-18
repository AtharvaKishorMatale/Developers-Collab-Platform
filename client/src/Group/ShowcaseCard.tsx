
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '../group/ui/card';
import { Badge } from '../group/ui/badge';
import { Button } from '../group/ui/button';
import { Star, ExternalLink, Copy } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';
import DuplicateProjectDialog from './DuplicateProjectDialog';

type TeamMember = {
  id: string;
  name: string;
  avatar: string;
};

interface ShowcaseCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    tech: string[];
    teamSize: number;
    completedDate: string;
    stars: number;
    featured: boolean;
    projectUrl: string;
    teamMembers: TeamMember[];
  };
  featured?: boolean;
}

const ShowcaseCard = ({ project, featured = false }: ShowcaseCardProps) => {
  const { toast } = useToast();
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
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
    <Card className={cn(
      "overflow-hidden hover-card-effect border",
      featured ? "md:col-span-1 lg:col-span-1" : ""
    )}>
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className={cn(
            "w-full h-52 object-cover transition-transform duration-500",
            "group-hover:scale-105"
          )}
        />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-black/70 hover:bg-black/70 text-white border-0">
            {project.category}
          </Badge>
          {project.featured && (
            <Badge className="bg-amber-500/90 hover:bg-amber-500/90 text-white border-0 flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </Badge>
          )}
        </div>
        
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white rounded-full px-2 py-1 text-xs">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span>{project.stars}</span>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((tech, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {project.teamMembers.map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-7 h-7 rounded-full border-2 border-background"
                title={member.name}
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            Completed: {formatDate(project.completedDate)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-2 bg-muted/40 border-t flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs" onClick={handleViewDetails}>
          View Details
        </Button>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={handleDuplicate}
          >
            <Copy className="h-3.5 w-3.5" />
            Duplicate
          </Button>
          <Button size="sm" className="text-xs flex items-center gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            Visit Project
          </Button>
        </div>
      </CardFooter>

      <DuplicateProjectDialog 
        open={isDuplicateDialogOpen} 
        onOpenChange={setIsDuplicateDialogOpen}
        projectTitle={project.title}
      />
    </Card>
  );
};

export default ShowcaseCard;
