import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

interface PostCardProps {
  post: {
    id: string;
    content: string;
    hashtags?: string[];
    img?: string;
    username: string;
    profilePhoto?: string;
    channel?: string;
    created_at: string;
    user_id: string;
  };
  showComments?: boolean;
}

export const PostCard = ({ post, showComments = true }: PostCardProps) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchPostStats();
    getCurrentUser();
  }, [post.id]);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchPostStats = async () => {
    // Get likes count and check if current user liked
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: likes } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', post.id);
    
    setLikesCount(likes?.length || 0);
    
    if (user) {
      const userLike = likes?.find(like => like.user_id === user.id);
      setIsLiked(!!userLike);
    }

    // Get comments
    const { data: comments } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    
    setComments(comments || []);
  };

  const handleLike = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (isLiked) {
      // Unlike
      await supabase
        .from('likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', user.id);
      
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      // Like
      await supabase
        .from('likes')
        .insert({
          post_id: post.id,
          user_id: user.id
        });
      
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleComment = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !newComment.trim()) return;

    const { error } = await supabase
      .from('comments')
      .insert({
        post_id: post.id,
        user_id: user.id,
        content: newComment.trim()
      });

    if (!error) {
      setNewComment("");
      fetchPostStats(); // Refresh comments
      toast({
        title: "Comment added!",
        description: "Your comment has been posted."
      });
    }
  };

  return (
    <Card className="cultural-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.profilePhoto} alt={post.username} />
            <AvatarFallback className="bg-primary text-white">
              {post.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.username}</span>
              {post.channel && (
                <Badge variant="secondary" className="text-xs">
                  {post.channel}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">{post.content}</p>
        
        {post.img && (
          <img 
            className="rounded-lg mb-4 w-full max-w-md object-cover" 
            src={post.img} 
            alt="Post content" 
          />
        )}

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.hashtags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {likesCount}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-muted-foreground hover:text-secondary"
              onClick={() => setShowCommentInput(!showCommentInput)}
            >
              <MessageCircle className="h-4 w-4" />
              {comments.length}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        {/* Comment Input */}
        {showCommentInput && currentUser && (
          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleComment}
              disabled={!newComment.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Comments */}
        {showComments && comments.length > 0 && (
          <div className="mt-4 space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2 p-2 bg-muted/50 rounded-lg">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary text-white text-xs">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">User</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};