namespace LFG.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public string? GameName { get; set; }
        public string? NicknameIngame { get; set; }
        public float? HoursPlayed { get; set; }
        public string? Rank { get; set; }
        public string? Server { get; set; }
        public string? Comments { get; set; }

        public Game()
        {

        }
    }
}
