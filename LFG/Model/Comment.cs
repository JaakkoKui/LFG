namespace LFG.Model
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentContent { get; set; }
        public string Date { get; set; }
        public int CommentingProfile { get; set; }

        public int PostId { get; set; }
    }
}
