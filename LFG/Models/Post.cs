namespace LFG.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Content { get; set; }
        public int PosterProfile { get; set; }

        public Post()
        {

        }
    }
}
