
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '../group/ui/card';
import { Badge } from '../group/ui/badge';
import { Button } from '../group/ui/button';
import { 
  Clock, Users, UserPlus, Calendar
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../group/ui/dialog';
import { Textarea } from '../group/ui/textarea';

type ProjectPost = {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  teamSize: number;
  currentMembers: number;
  postedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  postedDate: string;
  estimatedDuration: string;
};

// Mock data
const MOCK_PROJECT_POSTS: ProjectPost[] = [
  {
    id: '1',
    title: 'AI-Powered E-commerce Recommendation Engine',
    description: 'Building a smart product recommendation system using machine learning algorithms to increase conversion rates for e-commerce websites.',
    requiredSkills: ['Python', 'TensorFlow', 'React', 'Node.js'],
    teamSize: 4,
    currentMembers: 1,
    postedBy: {
      id: '101',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/100?img=1'
    },
    postedDate: '2023-10-15T14:30:00Z',
    estimatedDuration: '8 weeks',
  },
  {
    id: '2',
    title: 'Cross-Platform Mobile Fitness Tracker',
    description: 'Developing a comprehensive fitness tracking application with social features and integration with wearable devices.',
    requiredSkills: ['Flutter', 'Firebase', 'UI/UX Design', 'GraphQL'],
    teamSize: 3,
    currentMembers: 1,
    postedBy: {
      id: '102',
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/100?img=2'
    },
    postedDate: '2023-10-12T09:45:00Z',
    estimatedDuration: '12 weeks',
  },
  {
    id: '3',
    title: 'Blockchain-Based Voting System',
    description: 'Creating a secure and transparent voting system using blockchain technology to ensure integrity and prevent tampering.',
    requiredSkills: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    teamSize: 5,
    currentMembers: 2,
    postedBy: {
      id: '103',
      name: 'Emma Watson',
      avatar: 'https://i.pravatar.cc/100?img=3'
    },
    postedDate: '2023-10-18T11:20:00Z',
    estimatedDuration: '16 weeks',
  },
];

const ProjectPostList = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<ProjectPost | null>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleRequestToJoin = (project: ProjectPost) => {
    setSelectedProject(project);
    setIsRequestDialogOpen(true);
    setRequestMessage(`Hi ${project.postedBy.name}, I'm interested in joining your ${project.title} project. I have experience with ${project.requiredSkills.slice(0, 2).join(' and ')}.`);
  };

  const handleSubmitRequest = () => {
    toast({
      title: "Request Sent",
      description: selectedProject ? `Your request to join ${selectedProject.title} has been sent.` : "Request sent successfully.",
    });
    setIsRequestDialogOpen(false);
    setRequestMessage('');
  };

  return (
    <div className="space-y-6">
      {MOCK_PROJECT_POSTS.map((project) => (
        <Card key={project.id} className="overflow-hidden hover-card-effect">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-1">
                  Posted by {project.postedBy.name} on {formatDate(project.postedDate)}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.estimatedDuration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  <Users className="h-3.5 w-3.5" />
                  {project.currentMembers}/{project.teamSize} members
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {project.description}
            </p>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={project.postedBy.avatar} 
                alt={project.postedBy.name} 
                className="w-8 h-8 rounded-full border-2 border-background"
              />
              <span className="text-sm">{project.postedBy.name}</span>
            </div>
            <Button 
              size="sm" 
              onClick={() => handleRequestToJoin(project)}
              className="flex items-center gap-1.5"
            >
              <UserPlus className="h-4 w-4" />
              Request to Join
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request to Join Project</DialogTitle>
            <DialogDescription>
              Send a message to the project creator explaining why you'd like to join and what skills you bring.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedProject.postedBy.avatar} 
                  alt={selectedProject.postedBy.name} 
                  className="w-10 h-10 rounded-full border-2 border-background"
                />
                <div>
                  <h4 className="font-medium">{selectedProject.postedBy.name}</h4>
                  <p className="text-sm text-muted-foreground">Project: {selectedProject.title}</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="request-message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="request-message"
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={6}
                  className="mt-1.5"
                  placeholder="Introduce yourself and explain why you're interested in this project..."
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectPostList;
