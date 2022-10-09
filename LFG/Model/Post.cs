namespace LFG.Model
{
    public class Post
    {        
        public int PostId { get; set; }
        public string Title { get; set; }
        public string CreateDate { get; set; }
        public string Content { get; set; }
        public int PosterProfile { get; set; }
        public string PhotoFileName { get; set; }
        public int Likepost { get; set; }
        public int Dislikepost { get; set; }
    }
}
