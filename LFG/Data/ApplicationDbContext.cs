using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using LFG.Models;

namespace LFG.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<LFG.Models.Profile>? Profile { get; set; }
        public DbSet<LFG.Models.Game>? Game { get; set; }
        public DbSet<LFG.Models.Post>? Post { get; set; }
        public DbSet<LFG.Models.Comment>? Comment { get; set; }
    }
}