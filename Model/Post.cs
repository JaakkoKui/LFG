namespace LFG.Model
{
    public class Post
    {        
        public int postId { get; set; }
        public string title { get; set; }
        public string createDate { get; set; }
        public string content { get; set; }
        public int posterProfile { get; set; }
        public string photoFileName { get; set; }
        public int likepost { get; set; }
        public int dislikepost { get; set; }
    }
}
