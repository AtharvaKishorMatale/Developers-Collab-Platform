
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';

interface DuplicateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
}

const DuplicateProjectDialog = ({ open, onOpenChange, projectTitle }: DuplicateProjectDialogProps) => {
  const { toast } = useToast();

  const handleDuplicate = () => {
    // This would typically call an API to duplicate the project
    // For now, we'll just show a success toast
    
    toast({
      title: "Project Duplicated",
      description: `You've successfully duplicated "${projectTitle}". Find it in your projects.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Duplicate Project</DialogTitle>
          <DialogDescription>
            Create your own copy of this project to learn from it and make modifications.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm">
            You're about to duplicate <span className="font-semibold">{projectTitle}</span>. 
            This will create a new project in your account that you can modify and experiment with.
          </p>
          
          <div className="mt-4 bg-muted p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">What you'll get:</h4>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>A complete copy of the project's code and assets</li>
              <li>Your own workspace to make changes</li>
              <li>Freedom to experiment and learn without affecting the original</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDuplicate}>
            Duplicate Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateProjectDialog;
