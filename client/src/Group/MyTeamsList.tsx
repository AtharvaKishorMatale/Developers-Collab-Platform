
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '../group/ui/card';
import { Badge } from '../group/ui/badge';
import { Button } from '../group/ui/button';
import { Progress } from '../group/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../group/ui/tabs';
import { 
  MessageSquare, Users, Calendar, ArrowRight
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../group/ui/dialog';
import MessageInput from '../group/MessageInput';

type TeamMember = {
  id: string;
  name: string;
  avatar: string;
  role: string;
};

type TeamChat = {
  id: string;
  teamId: string;
  senderId: string;
  senderName: string;
  avatar: string;
  content: string;
  timestamp: string;
};

type Team = {
  id: string;
  projectId: string;
  projectTitle: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string | null;
  status: 'planning' | 'ongoing' | 'completed';
  members: TeamMember[];
  chat: TeamChat[];
};

// Mock data
const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    projectId: '3',
    projectTitle: 'Blockchain-Based Voting System',
    description: 'Creating a secure and transparent voting system using blockchain technology to ensure integrity and prevent tampering.',
    progress: 35,
    startDate: '2023-10-20T00:00:00Z',
    endDate: '2024-02-15T00:00:00Z',
    status: 'ongoing',
    members: [
      { 
        id: '103', 
        name: 'Emma Watson', 
        avatar: 'https://i.pravatar.cc/100?img=3',
        role: 'Project Lead'
      },
      { 
        id: '999', 
        name: 'Me', 
        avatar: 'https://i.pravatar.cc/100?img=5',
        role: 'Blockchain Developer'
      },
      { 
        id: '104', 
        name: 'Alex Johnson', 
        avatar: 'https://i.pravatar.cc/100?img=4',
        role: 'Frontend Developer'
      },
    ],
    chat: [
      {
        id: '1001',
        teamId: '1',
        senderId: '103',
        senderName: 'Emma Watson',
        avatar: 'https://i.pravatar.cc/100?img=3',
        content: "Welcome to the team! I'm excited to have you both on board for the Blockchain Voting System project.",
        timestamp: '2023-10-20T09:30:00Z'
      },
      {
        id: '1002',
        teamId: '1',
        senderId: '999',
        senderName: 'Me',
        avatar: 'https://i.pravatar.cc/100?img=5',
        content: "Thanks for having me! I've been exploring Solidity contracts for the voting mechanism and have some ideas to share.",
        timestamp: '2023-10-20T09:32:00Z'
      },
      {
        id: '1003',
        teamId: '1',
        senderId: '104',
        senderName: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/100?img=4',
        content: "I'm looking forward to working with you all. I'll start wireframing the UI this week.",
        timestamp: '2023-10-20T09:35:00Z'
      },
      {
        id: '1004',
        teamId: '1',
        senderId: '103',
        senderName: 'Emma Watson',
        avatar: 'https://i.pravatar.cc/100?img=3',
        content: "Great! Let's schedule a kickoff meeting tomorrow at 2 PM to discuss the project roadmap and assign initial tasks.",
        timestamp: '2023-10-20T09:40:00Z'
      },
    ]
  }
];

const MyTeamsList = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState(MOCK_TEAMS);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<TeamChat[]>([]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleOpenTeamChat = (team: Team) => {
    setSelectedTeam(team);
    setMessages(team.chat);
    setIsChatOpen(true);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedTeam) return;
    
    const newMessage: TeamChat = {
      id: Date.now().toString(),
      teamId: selectedTeam.id,
      senderId: '999', // Current user
      senderName: 'Me',
      avatar: 'https://i.pravatar.cc/100?img=5',
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Update the team's chat in the teams state
    setTeams(teams.map(team => 
      team.id === selectedTeam.id 
        ? {...team, chat: [...team.chat, newMessage]} 
        : team
    ));
  };
  
  const formatChatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <>
      <div className="space-y-6">
        {teams.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">You haven't joined any teams yet.</p>
            </CardContent>
          </Card>
        ) : (
          teams.map((team) => (
            <Card key={team.id} className="overflow-hidden hover-card-effect">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{team.projectTitle}</CardTitle>
                    <CardDescription className="mt-1">
                      Started: {formatDate(team.startDate)} | Due: {formatDate(team.endDate)}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      team.status === 'planning' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      team.status === 'ongoing' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }
                  >
                    <span className="capitalize">{team.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {team.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>Progress</span>
                      <span className="font-medium">{team.progress}%</span>
                    </div>
                    <Progress value={team.progress} className="h-1.5" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Team Members:</h4>
                    <div className="flex flex-wrap gap-3">
                      {team.members.map((member) => (
                        <div key={member.id} className="flex items-center gap-2 bg-muted/30 rounded-full pr-3">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-8 h-8 rounded-full border-2 border-background"
                          />
                          <div>
                            <span className="text-sm font-medium">{member.name}</span>
                            <span className="text-xs text-muted-foreground block">{member.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{team.members.length} members</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleOpenTeamChat(team)}
                  className="flex items-center gap-1.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  Team Chat
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[550px] h-[80vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>
              {selectedTeam?.projectTitle} - Team Chat
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start gap-3 ${
                  message.senderId === '999' ? 'justify-end' : ''
                }`}
              >
                {message.senderId !== '999' && (
                  <img 
                    src={message.avatar} 
                    alt={message.senderName} 
                    className="w-8 h-8 rounded-full border-2 border-background mt-1"
                  />
                )}
                
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === '999' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-sm">{message.senderName}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatChatDate(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
                
                {message.senderId === '999' && (
                  <img 
                    src={message.avatar} 
                    alt={message.senderName} 
                    className="w-8 h-8 rounded-full border-2 border-background mt-1"
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t mt-auto">
            <MessageInput 
              onSendMessage={handleSendMessage} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyTeamsList;
