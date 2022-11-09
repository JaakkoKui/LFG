namespace LFG.Model
{
    public class PostDto
    {
        public string title { get; set; }
        public string content { get; set; }
        public string photoFileName { get; set; }
        public int likepost { get; set; }
        public int dislikepost { get; set; }
        public int numberOfComments { get; set; }
    }
}
