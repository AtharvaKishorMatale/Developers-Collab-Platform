
import React from 'react';
import { Card, CardContent, CardFooter } from '../group/ui/card';
import { Badge } from '../group/ui/badge';
import { Button } from '../group/ui/button';
import { Progress } from '../group/ui/progress';
import { cn } from '../lib/utils';

interface LearningPathCardProps {
  path: {
    id: string;
    title: string;
    description: string;
    image: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
    projectCount: number;
    estimatedTime: string;
    participants: number;
  };
  progress?: number;
  featured?: boolean;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ 
  path, 
  progress = 0, 
  featured = false 
}) => {
  return (
    <Card className={cn(
      "overflow-hidden hover-card-effect border h-full flex flex-col",
      featured ? "md:col-span-2" : ""
    )}>
      <div className="relative">
        <img 
          src={path.image} 
          alt={path.title} 
          className="w-full h-48 object-cover"
        />
        
        <div className="absolute bottom-0 left-0 w-full">
          <Progress value={progress} className="h-1.5 rounded-none" />
        </div>
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={cn(
            path.level === 'beginner' ? "bg-green-500/90 hover:bg-green-500/90" :
            path.level === 'intermediate' ? "bg-amber-500/90 hover:bg-amber-500/90" :
            "bg-red-500/90 hover:bg-red-500/90",
            "text-white border-0"
          )}>
            {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5 flex-1">
        <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {path.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {path.topics.map((topic, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs">
              {topic}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-2">
          <div>
            <span className="font-medium">{path.projectCount}</span> Projects
          </div>
          <div>
            <span className="font-medium">{path.estimatedTime}</span>
          </div>
          <div>
            <span className="font-medium">{path.participants.toLocaleString()}</span> Learners
          </div>
          <div>
            {progress > 0 && (
              <span className="font-medium">{progress}%</span>
            )}
            {progress === 0 && (
              <span>New</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 bg-muted/40 border-t">
        <Button className="w-full">
          {progress > 0 ? "Continue Learning" : "Start Learning"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LearningPathCard;
