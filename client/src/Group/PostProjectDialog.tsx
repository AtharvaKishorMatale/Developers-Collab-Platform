
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../group/ui/dialog';
import { Button } from '../group/ui/button';
import { Input } from '../group/ui/input';
import { Textarea } from '../group/ui/textarea';
import { Label } from '../group/ui/label';
import { useToast } from '../hooks/use-toast';
import { X, Plus } from 'lucide-react';
import { Badge } from '../group/ui/badge';

interface PostProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostProjectDialog = ({ open, onOpenChange }: PostProjectDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !duration.trim() || !teamSize.trim() || skills.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Project Posted",
      description: "Your project has been posted successfully. You'll be notified when developers request to join.",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDuration('');
    setTeamSize('');
    setSkills([]);
    setCurrentSkill('');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Post a New Project</DialogTitle>
          <DialogDescription>
            Provide details about your project to attract the right teammates.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="project-title">Project Title</Label>
            <Input 
              id="project-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, descriptive title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea 
              id="project-description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project, its goals, and what you're trying to achieve"
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-duration">Estimated Duration</Label>
              <Input 
                id="project-duration" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 8 weeks, 3 months"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-size">Team Size</Label>
              <Input 
                id="team-size" 
                type="number"
                min="1"
                max="10"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                placeholder="Number of teammates needed"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="required-skills">Required Skills</Label>
            <div className="flex">
              <Input 
                id="required-skills" 
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add skills (e.g., React, Python, UI/UX)"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="secondary" 
                className="ml-2" 
                onClick={handleAddSkill}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1">
                    {skill}
                    <button 
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Post Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostProjectDialog;
