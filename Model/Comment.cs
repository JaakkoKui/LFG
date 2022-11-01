namespace LFG.Model
{
    public class Comment
    {
        public int id { get; set; }
        public string commentContent { get; set; }
        public string date { get; set; }
        public int commentingProfile { get; set; }

        public int postId { get; set; }
    }
}
