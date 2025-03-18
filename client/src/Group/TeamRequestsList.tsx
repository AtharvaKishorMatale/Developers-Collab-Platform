import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '../group/ui/card';
import { Badge } from '../group/ui/badge';
import { useSelector, useDispatch } from "react-redux";
import { Button } from '../group/ui/button';
import { MessageSquare } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

type RequestStatus = 'pending' | 'accepted' | 'rejected';

type TeamRequest = {
  _id: string;
  projectId: string;
  projectTitle: string;
  recipientId: string; // Project owner's ID
  senderId: string; // Current user ID
  message: string;
  status: RequestStatus;
  timestamp: string;
};

// Replace with your actual API base URL


const TeamRequestsList = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { toast } = useToast();
  const [requests, setRequests] = useState<TeamRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = currentUser.id;

  useEffect(() => {
    const fetchTeamRequests = async () => {
      try {
        const response = await axios.get(`/api/notifications/sent/${'currentUserId'}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching team requests:', error);
        toast({
          title: "Error",
          description: "Failed to load team requests.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchTeamRequests();
    }
  }, [currentUserId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Rejected</Badge>;
      default:
        return null;
    }
  };

  const handleWithdrawRequest = async (requestId: string) => {
    try {
      await axios.delete(`/notifications/${requestId}`);
      setRequests(requests.filter(req => req._id !== requestId));
      toast({
        title: "Request Withdrawn",
        description: "Your team request has been withdrawn.",
      });
    } catch (error) {
      console.error('Error withdrawing request:', error);
      toast({
        title: "Error",
        description: "Failed to withdraw request.",
        variant: "destructive"
      });
    }
  };

  const handleViewTeam = (projectTitle: string) => {
    toast({
      title: "Team Chat",
      description: `Opening team chat for ${projectTitle}`,
    });
  };

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      {requests.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">You haven't sent any team requests yet.</p>
          </CardContent>
        </Card>
      ) : (
        requests.map((request) => (
          <Card key={request._id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{request.projectTitle}</CardTitle>
                  <CardDescription className="mt-1">
                    Request sent on {formatDate(request.timestamp)}
                  </CardDescription>
                </div>
                {getStatusBadge(request.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-sm">Your message</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(request.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm">{request.message}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 justify-end gap-2">
              {request.status === 'pending' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleWithdrawRequest(request._id)}
                >
                  Withdraw Request
                </Button>
              )}
              {request.status === 'accepted' && (
                <Button 
                  size="sm" 
                  onClick={() => handleViewTeam(request.projectTitle)}
                  className="flex items-center gap-1.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  View Team Chat
                </Button>
              )}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default TeamRequestsList;
