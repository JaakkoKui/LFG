namespace LFG.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentContent { get; set; }
        public DateTime Date { get; set; }
        public string CommentingProfile { get; set; }

        public Comment()
        {
                
        }
    }
}
