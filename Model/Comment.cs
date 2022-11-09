namespace LFG.Model
{
    public class Comment
    {
        public int id { get; set; }
        public string commentContent { get; set; }
        public string date { get; set; }
        public ulong profileId { get; set; }

        public int postId { get; set; }
    }
}
